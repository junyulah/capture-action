let ActionCapture = require('../..');

let captuer = ActionCapture({
    eventTypeList: ['click']
});

let {
    start
} = captuer((action) => {
    console.log(action.attachedUIStates.current.number);
});

start();

document.getElementById('number').value = 100;
