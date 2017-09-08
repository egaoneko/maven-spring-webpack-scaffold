/* global module, require */

const path = require('path');
const webpackConfig = require('./webpack.config.js');
const gc = require('./global.config.js');

// dir path
const sourceDir = gc.baseDir + gc.resourceDir;
const sourcePattern = gc.basePath + gc.baseDir + gc.resourceDir + '/js/**/*.js';
const testPattern = gc.basePath + gc.baseDir + gc.testDir + '/**/*.spec.js';

const preprocessor = {};
preprocessor[sourcePattern] = ['webpack', 'coverage'];
preprocessor[testPattern] = ['webpack'];

// add webpack test config
const rules = [{
    test: /sinon.*\.js$/,
    loader: "imports-loader?define=>false,require=>false"
}, {
    enforce: 'post',
    test: /\.js/,
    exclude: /(node_modules|bower_components)/,
    include: path.join(sourceDir),  // instrument only testing sources with Istanbul, after ts-loader runs
    loader: 'istanbul-instrumenter-loader'
}];
webpackConfig.module.rules = webpackConfig.module.rules.concat(rules);
webpackConfig.module['noParse'] = [/sinon/];
webpackConfig.resolve['alias'] = {sinon: 'sinon/pkg/sinon'};

module.exports = function (config) {
    config.set({
        frameworks: [
            'mocha',
            'chai',
            'sinon'
        ],

        files: [
            {pattern: sourcePattern, watched: false},
            {pattern: testPattern, watched: false}
        ],

        browsers: ['Chrome', 'Firefox'],

        preprocessors: preprocessor,

        // report
        reporters: ['mocha', 'coverage'],
        coverageReporter: {
            dir: path.join(__dirname, 'coverage'),
            reporters: [
                {
                    type: 'html',
                    subdir: 'report-html'
                },
                {
                    type: 'lcov',
                    subdir: 'report-lcov'
                },
                {
                    type: 'cobertura',
                    subdir: '.',
                    file: 'cobertura.txt'
                },
                {
                    type: 'text',
                    subdir: '.',
                    file: 'report-text.txt'
                },
                {
                    type: 'text-summary'
                }
            ],
            fixWebpackSourcePaths: true
        },

        // client
        client: {
            mocha: {
                // change Karma's debug.html to the mocha web reporter
                reporter: 'html',

                // require specific files after Mocha is initialized
                require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],

                // custom ui, defined in required file above
                ui: 'bdd-lazy-var/global',
            }
        },

        // webpack
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
    });
};