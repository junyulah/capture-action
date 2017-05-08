'use strict';

let {
    n, mount
} = require('kabanery');
let assert = require('assert');
let capturer = require('../../');

let capture = capturer({
    eventTypeList: ['click', 'keydown', 'keyup'],
    onlyUserAction: false
});

let count = 0;

let {
    start, stop
} = capture(() => {
    count++;
});

let testClick = () => {
    start();
    document.getElementById('click-item').click();

    stop();
    document.getElementById('click-item').click();

    start();
    document.getElementById('click-item').click();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                assert.equal(count, 2);
                resolve();
            } catch (err) {
                reject(err);
            }
        }, 50);
    });
};

mount(n('div', [
    n('div id="click-item"')
]), document.body);

module.exports = testClick();
