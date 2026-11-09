/*
 * WebGL2 runner for Framer-exported shaders (shaders/GradientWave.js, used
 * unchanged). It compiles the file's `fragment` source, declares a float
 * uniform `u_<name>` for each numeric property control, and drives u_time.
 * React only mounts it (see GradientBackground.jsx).
 */
import waveShader from './shaders/GradientWave.js'

const VERTEX = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

/*
 * Framer injects these declarations around a shader's `fragment` source;
 * we prepend the equivalent so the file's GLSL compiles under plain WebGL2.
 */
const FRAGMENT_HEADER = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_colors[4];
uniform int u_colors_length;
`

// Default prop values, read from the shader's own Framer property controls.
function controlDefaults(shader) {
  return Object.fromEntries(
    Object.entries(shader.propertyControls ?? {}).map(([key, control]) => [key, control.defaultValue]),
  )
}

function hexToRgba(hex) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1]
}

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(log)
  }
  return shader
}

/**
 * Mounts the shader on `canvas`. Returns a destroy() function, or null when
 * WebGL2 isn't available (callers fall back to a CSS gradient).
 *
 * options: overrides for any of the shader's property controls
 *   (colors, seed, waveSpeed, ...), plus
 *   animate      false renders a single still frame (reduced motion)
 *   resolution   render scale relative to CSS pixels (the gradient is soft,
 *                so rendering below 1 is visually identical and much cheaper)
 */
export function createWaveGradient(canvas, options = {}) {
  const props = controlDefaults(waveShader)
  const opts = { ...props, animate: true, resolution: 0.5, ...options }
  const numericKeys = Object.keys(props).filter((k) => typeof props[k] === 'number')
  const fragment =
    FRAGMENT_HEADER +
    numericKeys.map((k) => `uniform float u_${k};`).join('\n') +
    '\n' +
    waveShader.fragment
  const gl = canvas.getContext('webgl2', {
    antialias: false,
    premultipliedAlpha: false,
    powerPreference: 'low-power',
  })
  if (!gl) return null

  let program
  try {
    program = gl.createProgram()
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program))
    }
  } catch (err) {
    console.warn('[waveGradient] shader failed to build', err)
    return null
  }
  gl.useProgram(program)

  // Full-screen triangle pair
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  )
  const aPos = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const u = (name) => gl.getUniformLocation(program, name)
  const colors = opts.colors.slice(0, 4)
  gl.uniform4fv(u('u_colors'), new Float32Array(colors.flatMap(hexToRgba).concat(Array((4 - colors.length) * 4).fill(0))))
  gl.uniform1i(u('u_colors_length'), colors.length)
  for (const k of numericKeys) gl.uniform1f(u(`u_${k}`), opts[k])
  const uRes = u('u_resolution')
  const uTime = u('u_time')

  let frame = 0
  let running = false
  const start = performance.now()

  const draw = (now) => {
    gl.uniform1f(uTime, (now - start) / 1000)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    canvas.width = Math.max(1, Math.round(w * opts.resolution))
    canvas.height = Math.max(1, Math.round(h * opts.resolution))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uRes, canvas.width, canvas.height)
    if (!running) draw(start)
  }

  const loop = (now) => {
    draw(now)
    frame = requestAnimationFrame(loop)
  }
  const play = () => {
    if (running || !opts.animate) return
    running = true
    frame = requestAnimationFrame(loop)
  }
  const pause = () => {
    running = false
    cancelAnimationFrame(frame)
  }
  const onVisibility = () => (document.hidden ? pause() : play())

  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  resize()
  play()
  document.addEventListener('visibilitychange', onVisibility)

  return function destroy() {
    pause()
    observer.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
  }
}
