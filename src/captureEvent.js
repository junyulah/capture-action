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
    let captureFlag = false;

    // TODO window close event
    let captureUIAction = (document) => {
        // dom event
        eventList.forEach((item) => {
            document.addEventListener(item, (e) => {
                // we can stop capturing
                if (!captureFlag) return;

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

    let start = () => {
        captureFlag = true;
    };

    let stop = () => {
        captureFlag = false;
    };

    return {
        start,
        stop
    };
};
