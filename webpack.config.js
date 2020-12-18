const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: "./src/app/app.tsx",
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: 'templates/index.html',
			title: 'Baba Is Bookmark',
			favicon: 'templates/favicon.ico'
		}),
	],
	devServer: {
		contentBase: './dist/public',
		compress: true,
		port: 9000
	},
	output: {
		path: __dirname + '/dist/public',
		filename: 'static/[name].[contenthash].js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.webpack.json'
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader',
				],
			},
		]
	}
}