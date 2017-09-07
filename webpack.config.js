var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var baseDir = '.';
var sourceDir = baseDir + '/src/main/webapp/resources/static';
var outputDir = baseDir + '/src/main/webapp/resources/static/dist';
var devPort = 9090;

var config = {
    entry: {
        app: [sourceDir + '/js/index'],
        vendors: ['jquery', 'react', 'react-dom']
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.less']
    },
    devtool: 'source-map',
    cache: true,
    debug: true,
    output: {
        path: outputDir,
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new CommonsChunkPlugin("vendors", null, true),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            React: "react",
            ReactDOM: "react-dom"
        })
    ],
    devServer: {
        port: devPort,
        publicPath: 'http://localhost:' + devPort + '/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?!postcss-loader!less-loader')
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=font/[name].[ext]"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url?prefix=font/&limit=5000&name=font/[name].[ext]"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream&&name=font/[name].[ext]"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml&&name=font/[name].[ext]"
            }
        ]
    },
    postcss: function () {
        return [];
    }
};

var env = process.env.NODE_ENV;

if (env === 'development') {
    config.output.publicPath = 'http://localhost:' + devPort + 'resources/static/dist';
}

module.exports = config;