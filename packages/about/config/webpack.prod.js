/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const Dotenv = require('dotenv-webpack');
const commonConfig = require('./webpack.common');
const path = require('path');

const name = 'about';
const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `/${name}/latest/`,
    path: path.join(process.cwd(), `../../build/${name}/latest`),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: `/${name}/latest/public/images`,
              outputPath: '/public/images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({}),
    new ModuleFederationPlugin({
      name,
      filename: 'remoteEntry.js',
      exposes: {
        './AboutApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
