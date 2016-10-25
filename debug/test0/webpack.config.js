var path = require('path');

module.exports = {
    entry: {
        app: ['./index.js']
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: '[name].js'
    },
    module: {},
    plugins: []
};
