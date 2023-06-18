const path = require('path')
//import path from 'path'

module.exports = {
    entry: {
        index: path.resolve(__dirname, './public/js/index.js')
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].bundle.js'
    }
}