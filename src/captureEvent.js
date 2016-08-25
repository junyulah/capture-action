'use strict';

/**
 * capture event
 *
 * opts = {
 *      onlyUserAction: true
 * }
 *
 * !!!use this script at the head of the page, so we can guarentee our event handler will run at the first time.
 */

// TODO bug: proxy iframe events
// proxy all documents?
module.exports = (eventList, callback, opts = {}) => {
    // TODO window close event
    let captureUIAction = (document) => {
        // dom event
        eventList.forEach((item) => {
            document.addEventListener(item, (e) => {
                if (opts.onlyUserAction) {
                    if (e.isTrusted ||
                        // TODO
                        // hack for library like fastclick
                        e.forwardedTouchEvent) {
                        callback && callback(e);
                    }
                } else {
                    callback && callback(e);
                }
            }, true); // capture model
        });
    };

    captureUIAction(window.document);
};
