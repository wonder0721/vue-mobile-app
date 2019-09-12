const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        open: true,
        port: 3000,
        contentBase: 'src',
        hot: true,
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname,'src/index.html'),
            filename:'index.html'
        }),
        new vueLoaderPlugin(),
    ],
    module: {
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(jpg|png|jpeg|gif)$/,
                use:'url-loader?limit=20772'
            },
            {
                test:/\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test:/\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.vue$/,
                use: 'vue-loader',
            }
        ]
    }
}