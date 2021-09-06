/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const path = require('path');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const domain = process.env.PRODUCTION_DOMAIN;
const name = 'container';
const outPath = path.join(process.cwd(), `../../build/${name}/latest`);
const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `/${name}/latest/`,
    path: outPath,
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
      remotes: {
        about: `about@${domain}/about/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
