const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function (env, { mode }) {
  return {
    mode: mode || 'development',
    devtool: 'source-map',
    entry: './src/index.tsx',
    devServer: {
      port: 8080,
      historyApiFallback: true,
      client: {
        overlay: false,
      },
      // proxy: {
      //   '/api/**': {
      //     target: 'http://84.252.137.43:8000',
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // }
    },
    output: {
      publicPath: '/',
      filename: path.join(`bundle.js`),
      // chunkFilename: path.join('js', 'chunks', '[name].[contenthash].js'),
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
        {
          test: /\.less$/i,
          use: [
            {
              loader: mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                  modifyVars: {
                    'border-radius-base': '8px',
                    'primary-color': '#06f',
                    'link-color': '#06f',
                  },
                },
              }
            }
          ],
        },
        {
          test: /\.css$/i,
          exclude: /\.module\.css$/i,
          use: ["style-loader", 'css-loader'],
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: mode === "production" ? "[local]-[hash:base64:5]" : "[path]__[local]--[hash:base64:5]",
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ESLintPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "icons",
            to: "icons",
          }
        ],
      }),
      new HtmlWebpackPlugin({
        publicPath: '/',
        template: './public/index.html',
        favicon: './public/favicon.png',
        minify: mode === 'production' && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ].concat(mode !== 'production' ? [] : [
      new MiniCssExtractPlugin({
        filename: path.join(`bundle.css`),
        // chunkFilename: path.join("css", "chunks", "[name].[contenthash].css"),
      }),
    ]),
  };
};
