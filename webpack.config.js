/* global module, process, require */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

const gc = require('./global.config.js');

// extract style
const extractCss = new ExtractTextPlugin({
    filename: 'css/[name].css',
});

// dir path
const sourceDir = gc.basePath+ gc.baseDir + gc.resourceDir;
const outputDir = gc.baseDir + gc.resourceDir + gc.distDir;

const devPort = 9090;
const devOutputDir = gc.resourceDir + gc.distDir;

// generate entry
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
        entry[key] = ['babel-polyfill', file];
    });
    return entry;
};
const entry = getEntry(read(fileDir));

// webpack config
const config = {
    entry: Object.assign({}, gc.vendors.entry, entry),
    output: {
        path: __dirname + outputDir,
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        libraryTarget: 'umd', // export itself to a global var
        library: 'sc' // name of the global var: 'sc'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    devtool: 'source-map',
    cache: true,
    plugins: [
        extractCss,
        new webpack.ProvidePlugin(gc.vendors.providePlugin)
    ],
    devServer: {
        host: '0.0.0.0',
        publicPath: 'http://localhost:' + devPort + '/',
        port: devPort,
        disableHostCheck: true,
        noInfo: true,
        inline: true,
        proxy: {
            '**': 'http://localhost:8080'
        }
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.(js|jsx)?$/,
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
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    }
};

const env = process.env.NODE_ENV;

// develop phase
if (env === 'development') {
    config.output.publicPath = 'http://localhost:' + devPort + devOutputDir;
}

// production phase
if (env === 'production') {
    config.devtool = '#source-map';
    config.plugins = (config.plugins || []).concat([
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
        }),
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