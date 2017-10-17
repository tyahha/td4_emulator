const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: './src/js/app.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public/js'),
    },
  },
  {
    entry: {
        style: './src/css/style.scss'
    },
    output: {
        path: path.join(__dirname, 'public/css'),
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
    devtool: 'source-map',
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
  }
];