const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');

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
            title: 'growTECH',
            template: 'src/index.ejs'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
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
