const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  entry: {
      style: './src/css/style.scss'
  },
  output: {
      path: path.join(__dirname, 'css'),
      filename: '[name].css'
  },
  module: {
      loaders: [
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('css-loader!sass-loader')
          }
      ]
  },
  plugins: [
      new ExtractTextPlugin('[name].css')
  ]
}];