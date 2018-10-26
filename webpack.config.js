const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src')

module.exports = {
    entry: SRC_DIR + '/app/main.js',
    output: {
        path: SRC_DIR + '/public',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                // loader: 'babel-loader',
                // query: {
                //     presets: ['es2015', 'react', 'stage-2']
                // }
                use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: true
						}
					}
				]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: SRC_DIR + '/index.html'
        })
    ]
}
