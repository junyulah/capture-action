'use strict';

let captureEvent = require('./captureEvent');

let {
    serializeEvent, serializeNode, serializePath
} = require('serialize-front');

let getAttachedUIStates = (node) => {
    return {
        window: {
            pageYOffset: window.pageYOffset,
            pageXOffset: window.pageXOffset
        },

        current: {
            value: node.value,
            scrollTop: node.scrollTop,
            scrollLeft: node.scrollLeft
        }
    };
};

module.exports = (opts = {}) => {
    opts.eventList = opts.eventList || [];

    if (opts.onlyUserAction === undefined) {
        opts.onlyUserAction = true;
    }

    if (opts.textContent === undefined) {
        opts.textContent = true;
    }

    if (opts.style === undefined) {
        opts.style = true;
    }

    let getAction = (event) => {
        let node = event.target;
        event = serializeEvent(event);
        let path = serializePath(node);

        let nodeInfo = serializeNode(node, {
            textContent: opts.textContent,
            style: opts.style
        });

        return {
            event: event,
            time: new Date().getTime(),
            attachedUIStates: getAttachedUIStates(node),
            source: {
                path,
                node: nodeInfo
            },
            extra: {
                url: window.location.href,
                pageTitle: window.document.title
            }
        };
    };

    return {
        capture: (handle) => {
            captureEvent(opts.eventTypeList || [], event => {
                let action = getAction(event);
                handle(action, event);
            }, {
                onlyUserAction: opts.onlyUserAction
            });
        }
    };
};
