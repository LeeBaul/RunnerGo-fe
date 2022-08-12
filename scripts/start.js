const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config');

const devConfig = {
    entry: path.resolve(__dirname, '../src/pages/index.jsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]-[contenthash:8].js',
        publicPath: '/',
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        historyApiFallback: false,
        hot: true,
        proxy: {
            '/': {
                bypass(req, res, proxyOptions) {
                    if (req.headers.accept?.indexOf('html') !== -1) {
                        return '/index.html';
                    }
                },
            }
        }
    },
    devtool: 'eval-source-map',
    plugins: [
        new HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, '../public'), to: '../dist' }],
        }),
        new HtmlWebpackPlugin({
            title: '鲲鹏-接口压力测试工具',
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: path.resolve(__dirname, '../src/index.html')
        })
    ],
};

module.exports = merge(common, devConfig);