var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    prod: "./index.js"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
        include: path.resolve(__dirname, 'library/fonts'),
        loader: 'file'
      },
      {
        test: /\.(gif)(\?.*$|$)/,
        include: path.resolve(__dirname, 'library/images'),
        loader: 'file'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'library/styles'),
        loader: 'style!css'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'H5P': './h5p.js',
      'Event': './h5p-event-dispatcher.js'
    })
  ],
  devServer: {
    port: 8050
  }
};
