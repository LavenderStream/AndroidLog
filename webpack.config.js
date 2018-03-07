var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/App.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel']},
      {test: /\.json/, loader: 'json-loader'}
    ],
    plugins: []
  }
}
