const HtmlWebpackPlugin = module.require('html-webpack-plugin')
const webpack = module.require('webpack')
const path = module.require('node:path')
require('dotenv').config();

module.exports = {
  mode: 'development',
  entry: './src/scripts/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.GEO_API_URL': JSON.stringify(process.env.GEO_API_URL),
      'process.env.GEO_API_KEY': JSON.stringify(process.env.GEO_API_KEY),
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: [
      '.js', '.ts', '.mjs', '.mts', '.cjs', '.cts', '.jpg', '.svg', '.png', '.jpeg', '.gif', '.css', '.sass', '.scss'
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    static: './src',
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: [['@babel/preset-env'], '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
}
