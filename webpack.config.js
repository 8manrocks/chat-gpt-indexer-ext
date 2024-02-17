const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    background: './background.js',
    contentScript: './contentScript.js',
    popup: './popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    // CopyPlugin configuration
    new CopyPlugin({
      patterns: [
        { from: '*.html', to: '[name][ext]' }, // Copies all HTML files
        { from: 'manifest.json', to: '[name][ext]' }, // Copies the manifest.json
        { from: 'images', to: 'images' }, // Copies everything in the images folder
        // Add more patterns as needed
      ],
    }),
    // Add other plugins here as necessary
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
