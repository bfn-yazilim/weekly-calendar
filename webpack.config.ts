import path from 'path';
import * as webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
const CopyPlugin = require('copy-webpack-plugin');
import ChunksWebpackPlugin from 'chunks-webpack-plugin';

const HtmlwebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATHS = {
  app: path.join(__dirname, 'src'),
  images:path.join(__dirname,'src/assets/img'),
  dist: path.join(__dirname, 'dist'),
  vendor: path.join(__dirname, 'src/assets/vendor'),
};

const options = {
  host:'localhost',
  port:'1234'
};

const config: webpack.Configuration = {
  mode: 'production',
  entry: ['./src/assets/ts/main.ts', './src/assets/scss/main.scss'],
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {from: PATHS.images, to: 'assets/img' }, 
        {from: PATHS.vendor, to: 'assets/vendor'},
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/main-[chunkhash].css',
      chunkFilename: 'assets/css/[id].css',
      linkType: 'text/css',
    }),  
    new HtmlwebpackPlugin({
      template: './src/index.html',
      inject: true
    }), 
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        generator: {
          filename: 'assets/css/main.css',
        },
        use: [
          MiniCssExtractPlugin.loader,
          //'style-loader',
          'css-loader',
          {
            loader: "sass-loader",
            options: {      
              sourceMap: true,
              sassOptions: {
                outputStyle: "uncompressed",
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [ process.env.NODE_ENV !== "production"
          ? "style-loader"
          : MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, PATHS.dist),
    filename: 'assets/js/[name]-[chunkhash].js',
  },
  devServer: {
    watchFiles: ["src/*.html"],
    hot:true,
    open:'/',
    static: path.join(__dirname, PATHS.dist),
    compress: true,
    liveReload: true,
    port: 4001,
  },
};

export default config;
