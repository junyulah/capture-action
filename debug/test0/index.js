let ActionCapture = require('../..');

let capturer = ActionCapture({
    eventTypeList: ['click', 'keydown', 'keyup']
});

let {
    start
} = capturer((action, event) => {
    console.log(action, event);
});

start();
