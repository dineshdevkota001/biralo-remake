const TsConfig = require('./tsconfig.json')
const alias = Object.keys(TsConfig.compilerOptions.paths).reduce((acc, val) => {
  const key = val.replace('/*', '')
  const path = TsConfig.compilerOptions.paths[val][0].replace('/*', '')
  return {
    ...acc,
    [key]: path
  }
}, Object.create(null))

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['.'],
          alias,
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx'
          ]
        }
      ],
      require.resolve('expo-router/babel'),
      'react-native-reanimated/plugin'
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  }
}
