module.exports = {
	entry: './App/App.js',
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
