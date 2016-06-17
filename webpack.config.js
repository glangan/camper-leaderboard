var path = require('path');
var webpack = require('webpack');

var dir_js = path.resolve(__dirname, 'js');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
  entry: path.resolve(dir_js, 'main.js'),
  output: {
    path: dir_build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: dir_js,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
