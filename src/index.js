'use strict';

let captureEvent = require('./captureEvent');

let {
    serializeEvent, serializeNode, serializePath
} = require('serialize-front');

let NodeUnique = require('./nodeUnique');

let nodeUnique = NodeUnique();

module.exports = (opts = {}) => {
    opts.eventTypeList = opts.eventTypeList || [];

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
        let path = serializePath(node);

        let nodeInfo = serializeNode(node, {
            textContent: opts.textContent,
            style: opts.style,
            styleOption: opts.styleOption
        });

        return {
            event: serializeEvent(event),
            time: new Date().getTime(),
            attachedUIStates: getAttachedUIStates(event),
            source: {
                node: nodeInfo,
                domNodeId: nodeUnique(node),
                path
            },
            extra: {
                url: window.location.href,
                pageTitle: window.document.title
            }
        };
    };

    let getAttachedUIStates = (event) => {
        let node = event.target;

        let number = {};

        if (event.type === 'click') {
            if (event.target.type === 'number') {
                if (lastMouseDownValue === event.target.value) {
                    // TODO what if min or max?
                    number.direction = 'nochange';
                } else if (lastMouseDownValue > event.target.value) {
                    number.direction = 'down';
                } else {
                    number.direction = 'up';
                }
            }
        }

        return {
            window: {
                pageYOffset: window.pageYOffset,
                pageXOffset: window.pageXOffset
            },

            current: {
                value: node.value,
                scrollTop: node.scrollTop,
                scrollLeft: node.scrollLeft,
                number
            }
        };
    };

    let lastMouseDownValue = null;

    return {
        capture: (handle) => {
            captureEvent(['mousedown'], (event) => {
                lastMouseDownValue = event.target.value;
            });

            captureEvent(opts.eventTypeList, (event) => {
                let action = getAction(event);
                handle(action, event);
            }, {
                onlyUserAction: opts.onlyUserAction
            });
        }
    };
};
