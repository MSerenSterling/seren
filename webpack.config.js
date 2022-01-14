/**
 * Webpack configuration.
 */

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: {
        frontend: "./src/js/frontend/front-index.js",
        admin: "./src/js/admin/admin-index.js",
        css: "./src/css/index.scss"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
    },
    module: {
        rules: [
            {
                // Look for any .js files.
                test: /\.js$/,
                // Exclude the node_modules folder.
                exclude: /node_modules/,
                // Use babel loader to transpile the JS files.
                loader: "babel-loader",
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                    limit: 8192
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        // Uncomment and add local address to proxy in order to run BrowserSync
        // new BrowserSyncPlugin({
        //     files: "**/*.php",
        //     proxy: ""
        // }),
        new MiniCssExtractPlugin({
            filename: './css/main.min.css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    }
}

module.exports = config;