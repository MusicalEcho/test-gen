const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  mode: 'development',
  watch: true,
  devtool: 'cheap-module-source-map',
  entry: ['./src/index.ts'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.API_URL': JSON.stringify(env.API_URL) }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: './index.html',
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
});
