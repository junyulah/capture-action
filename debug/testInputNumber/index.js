let ActionCapture = require('../..');

let {
    capture
} = ActionCapture({
    eventTypeList: ['click']
});

capture((action) => {
    console.log(action.attachedUIStates.current.number);
});

document.getElementById('number').value = 100;
