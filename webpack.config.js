const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/App/index.js',
    plugins: [
        new AppCachePlugin({
            cache: [
                '/css/style.css',
                '/css/style-responsive.css'
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: false,
        })
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
};
