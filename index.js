'use strict';

/**
 * @readme-quick-run
 *
 * ## test tar=js r_c=capturer env=browser
 * let capture = capturer({
 *  eventListType: ['click', 'keydown'],
 *  onlyUserAction: false // set true will ignore none-user action
 * });
 *
 * let {start, stop} = capture((action, event) => {
 *     // handle action and event here!
 * });
 *
 * start(); // start to capture user action
 *
 * stop(); // stop to capture user action
 *
 * start(); // resume
 */
module.exports = require('./src');
