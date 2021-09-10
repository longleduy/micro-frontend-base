/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');
const path = require('path');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const authDomain = process.env.AUTH_PRODUCTION_DOMAIN;
const name = 'auth';
const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `${authDomain}/${name}/latest/`,
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
              publicPath: `${authDomain}/${name}/latest/public/images`,
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
        './AuthApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
