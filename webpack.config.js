/* eslint-disable @typescript-eslint/no-var-requires */
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');

let mode = process.env.NODE_ENV;

module.exports = {
  mode: mode,
  target: 'browserslist',
  devtool: mode === 'production' ? false : 'inline-source-map',
  entry: {
    ui: './app/ts/ui/ui.ts',
    code: './app/ts/code/code.ts',
  },
  module: {
    rules: [
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules\/(?!(@create-figma-plugin)\/).*/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
          { loader: 'ts-loader' },
          { loader: 'webpack-glob-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: 'ui.html',
      inject: 'body',
      chunks: ['ui'],
      cache: false,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, ['.js$']),
  ],
};
