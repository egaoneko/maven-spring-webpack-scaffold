const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require('fs');

const extractCss = new ExtractTextPlugin({
    filename: "css/[name].css",
});

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
    // disable: process.env.NODE_ENV === "development"
});

const basePath = '.';
const baseDir = '/src/main/webapp';
const distDir = '/dist';
const resourceDir = '/resources/static';
const sourceDir = basePath+ baseDir + resourceDir;
const outputDir = baseDir + resourceDir + distDir;

const devPort = 9090;
const devOutputDir = resourceDir + distDir;

const fileDir = sourceDir + '/js';
const read = (dir) =>
    fs.readdirSync(dir)
        .reduce((files, file) => {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                return files.concat(read(path.join(dir, file)));
            }

            if (file !== 'entry.js') {
                return files;
            }

            return files.concat('./' + path.join(dir, file));
        }, []);
const getEntry = (files) => {
    const entry = {};
    files.forEach(file => {
        const key = file.replace(fileDir + '/', '').replace('.js', '');
        entry[key] = file;
    });
    return entry;
};
const entry = getEntry(read(fileDir));

const config = {
    entry: Object.assign({
        vendors: ['jquery']
    }, entry),
    output: {
        path: __dirname + outputDir,
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        libraryTarget: "umd", // export itself to a global var
        library: "sc" // name of the global var: "sc"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    devtool: 'source-map',
    cache: true,
    plugins: [
        extractCss,
        extractSass,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery"
        })
    ],
    devServer: {
        port: devPort,
        publicPath: 'http://localhost:' + devPort + '/'
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            use: extractCss.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    }
};

const env = process.env.NODE_ENV;

if (env === 'development') {
    config.output.publicPath = 'http://localhost:' + devPort + devOutputDir;
}

if (env === 'production') {
    config.devtool = '#source-map';
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

module.exports = config;