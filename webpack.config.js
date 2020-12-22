const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

var mode = process.env.NODE_ENV || 'development';

module.exports = {
	entry: {
		app: "./src/app/index.tsx"
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: 'templates/index.html',
			title: 'Baba Is Bookmark',
			favicon: 'templates/favicon.ico'
		})
	],
	devServer: mode === "development" ? {
		contentBase: './dist/server/public',
		compress: true,
		port: 9000
	} : false,
	output: {
		path: __dirname + '/dist/server/public',
		filename: 'static/[name].[contenthash].js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		plugins: [
			new TsconfigPathsPlugin({
				configFile: 'tsconfig.webpack.json'
			})
		],
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
					{
						loader: 'style-loader',
					},				
					{
						loader: 'css-loader',
					}
				],
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [										
					{
						loader: 'file-loader',
						options: {
							name: "[name].[contenthash].[ext]",
							outputPath: "static/img/",
						}
					}
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[contenthash].[ext]",
							outputPath: "static/fonts/",
						},
					},
				],
			},
		]
	}
}