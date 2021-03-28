const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin');
const stylelint = require('stylelint');
const webpackPwaManifest = require('webpack-pwa-manifest')
const faviconsWebpackPlugin = require('favicons-webpack-plugin')
const manifest = require('./manifest.json.js')


module.exports = env => {
  return {
    entry: {
	    main: './src/scripts/index.js',
		},

    output: {
	    filename: '[name].bundle.js',
	    path: path.resolve(__dirname, 'dist'),
	  },

    plugins: [
      new StylelintPlugin({
        files: '**/*.(s(c|a)ss)', // SCSS or Sass
        fix: true,
      }),

      new CleanWebpackPlugin(),

      new webpack.DefinePlugin({
        '__ENV__': JSON.stringify(setEnvVariables(env))
      }),

      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),

      new webpackPwaManifest(manifest),

      new faviconsWebpackPlugin({
        logo: './src/icons/icon_maskable512.png',
        cache: true,
        outputPath: 'icons',
        prefix: 'icons/',
        favicons: {
          appName: 'Breathe App',
          icons: {
            android: false,
            firefox: false,
            appleStartup: false,
            windows: false,
            appleIcon: false,
            coast: false,
            yandex: false
          }
        }
      }),
    ],

    module: {
      rules: [

        //fonts
        {
          test: /\.ttf$/,
          use: [
            'file-loader'
          ],
        },

        // html files
        {
          test: /\.html$/,
          use: [
            'html-loader'
          ],
        },

      ],
    },
  }
}

function setEnvVariables(env) {
  let baseUrl, isDev
  if(env){
    switch (env.mode) {
      case 'dev':
        baseUrl = 'http://localhost:4200/'
        isDev = true
      break;
      case 'localProd':
        baseUrl = 'http://localhost:5320/'
        isDev = false
      break;
      default:
        baseUrl = 'https://h-shams.github.io/breathe/'
        isDev = false
    }
  }else{
    baseUrl = 'https://h-shams.github.io/breathe/'
    isDev = false
  }

  return{
    baseUrl: baseUrl,
    isDevMode: isDev
  }
}
