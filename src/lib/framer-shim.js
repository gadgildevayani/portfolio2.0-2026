/*
 * Minimal stand-in for the "framer" module so shader files exported from
 * Framer (e.g. shaders/GradientWave.js) can be imported unchanged.
 * Aliased in vite.config.js — `import ... from "framer"` resolves here.
 *
 * defineShader just hands back the definition; waveGradient.js compiles
 * `fragment` and reads defaults from `propertyControls`.
 */
export const defineShader = (definition) => definition

export const ControlType = {
  Array: 'array',
  Color: 'color',
  Number: 'number',
  Boolean: 'boolean',
  Enum: 'enum',
  String: 'string',
}
