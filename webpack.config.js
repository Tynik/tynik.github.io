const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': path.resolve('./src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.LOCAL_ENV': JSON.stringify(process.env.LOCAL_ENV),
      'process.env.NETLIFY_SERVER': JSON.stringify(process.env.NETLIFY_SERVER),
      'process.env.MY_PROFILE_CONTRACT_ADDRESS': JSON.stringify(
        process.env.MY_PROFILE_CONTRACT_ADDRESS
      ),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      templateParameters: {
        LOCAL_ENV: process.env.LOCAL_ENV || false,
      },
    }),
  ],
  devServer: {
    hot: true,
    port: 9212,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
};
