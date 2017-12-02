const path = require('path');

module.exports = [{
  entry: './ko/src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'ko/js'),
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ],
  },
}];