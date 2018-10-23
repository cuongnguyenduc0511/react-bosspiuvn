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
                test: /\.jsx?$/,
                // exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
