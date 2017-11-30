const path = require('path');

module.exports = [{
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'js'),
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