const path = require('path');

module.exports = {
	entry: './src/index.ts',
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/dist'),
		publicPath: "/d2-runemaster/"
	},
	module: {
		rules: [
			{
				test: /\.(ts)$/,
				use: 'ts-loader',
				exclude: /node-modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};