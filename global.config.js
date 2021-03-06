/* global module */

const basePath = '.';
const baseDir = '/src/main/webapp';
const distDir = '/dist';
const resourceDir = '/resources/static';
const testDir = '/resources/test';

const sourceDir = basePath+ baseDir + resourceDir + '/js/';
const vendors = {
    entry: {
        vendors: [sourceDir + 'vendors.js', 'jquery']
    },
    providePlugin: {
        $: 'jquery',
        jQuery: 'jquery'
    }
};

module.exports = {
    basePath: basePath,
    baseDir: baseDir,
    distDir: distDir,
    resourceDir: resourceDir,
    testDir: testDir,
    vendors: vendors
};