const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js'),
  },
  module: {
    rules: [
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {urs: false},
          }
        ]
      },
      {
        test: /\.scss/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader?-url&minimize&sourceMap!sass-loader',
          }
        ]
      },
    ],
  },
};