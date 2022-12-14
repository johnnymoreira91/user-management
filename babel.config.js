module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@infra': './src/infra',
        '@entities': './src/entities',
        '@repositories': './src/repositories',
        '@providers': './src/providers',
        '@useCases': './src/useCases',
        '@utils': './src/utils',
        '@modelInfra': './src/infra/modelInfra',
        '@database': './src/infra/database',
        '@config': './src/infra/config',
        '@shared': './src/shared'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
