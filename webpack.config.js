module.exports = {
	entry: './src/App/index.js',
	output: {
		path: __dirname + '/public/app',
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			}
		]
	}
};
