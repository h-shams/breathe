const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = env => {

	return merge(common(env), {
		mode: 'production',

		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html',
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

				// sass files
				{
					test: /\.s[ac]ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
	            options: { importLoaders: 2},
						},
						'postcss-loader',
						'group-css-media-queries-loader',
						'sass-loader',
					],
				},

				// svg files
				{
					test: /\.svg$/,
					type: 'asset/resource',
				},

			],
		},
	})
}
