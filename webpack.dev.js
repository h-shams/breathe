const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = env => {

  return merge(common(env), {
    mode: 'development',

    devtool: 'inline-cheap-module-source-map',

    devServer: {
      contentBase: './dist',
      compress: true,
      port: 4200,
      writeToDisk: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        excludeChunks: ['sw'],
      }),

      new InjectManifest({
        swSrc: './src/scripts/sw/sw.js',
        compileSrc: true,
        swDest: 'sw.bundle.js',
        excludeChunks: ['sw']
      }),
    ],

    module: {
      rules: [
        // js files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        },

        // sass files
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },

        // svg files
        {
          test: /\.svg$/,
          use: [
            'file-loader'
          ],
        },

      ],
    },
  })

}
