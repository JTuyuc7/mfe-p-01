const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/'
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './public/index.html'
    // }),
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${process.env.PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`,
        auth: `auth@${process.env.PRODUCTION_DOMAIN}/auth/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies
    })
  ]
}

module.exports = merge(commonConfig, prodConfig);