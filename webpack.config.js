const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
const fileLoaderOptions = output => {
  const params = {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]'
    }
  }

  if (output) {
    params.options.outputPath = output
  }

  return params
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  mode: 'development',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'assets/img', to: path.resolve(__dirname, 'dist', 'assets', 'img')}
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|woff2|eot|woff)$/,
        use: [
          fileLoaderOptions('assets/fonts')
        ]
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [
          fileLoaderOptions('assets/img')
        ]
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: 'url-loader'
      }
    ]
  }
}