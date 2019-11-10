const path = require('path');

module.exports = {
	entry: './src/index.ts',
	devtool: 'source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public/dist'),
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