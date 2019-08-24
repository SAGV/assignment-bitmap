module.exports = {
  reporter: 'spec',
  timeout: 120000,
  require: ['ts-node/register'],
  spec: './spec/**/*.spec.ts',
  color: true,
  extension: ['ts', 'js']
}