const path = require('path');

module.exports = [{
  entry: './react/src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'react/js'),
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
            presets: ['react', 'es2015', 'stage-0'],
//            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
    ],
  },
}];