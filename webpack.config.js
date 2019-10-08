const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',

  devtool: "source-map",

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  devServer: {
    contentBase: 'dist',
    historyApiFallback: {
      index: '/'
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader?attrs[]=img:src&attrs[]=link:href'],
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre",
        exclude: [
          path.resolve(__dirname, 'node_modules/xhr2-cookies'),
          path.resolve(__dirname, 'node_modules/https-did-resolver'),
          path.resolve(__dirname, 'node_modules/rlp'),
          path.resolve(__dirname, 'node_modules/graphql-request')
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].css',
            },
          },
          'extract-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]',
            },
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      },
    ]
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json' ]
  },

  output: {
    publicPath: '/',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
};
