'use strict';

let browserJsEnv = require('browser-js-env');
let path = require('path');

describe('index', () => {
    ['base', 'stop', 'resume'].map((name) => {
        it(name, () => {
            return browserJsEnv(`module.exports=require("${path.join(__dirname, `../browser/${name}.js`)}")`, {
                testDir: path.join(__dirname, `../browser/fixture/${name}`),
                clean: true
            });
        });
    });
});
