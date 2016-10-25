let ActionCapture = require('../..');

let {
    capture
} = ActionCapture({
    eventTypeList: ['click']
});

capture((action, event) => {
    console.log(action, event);
});
