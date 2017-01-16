var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')
 
var webpack_isomorphic_tools_plugin = 
  // webpack-isomorphic-tools settings reside in a separate .js file  
  // (because they will be used in the web server code too). 
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration 
  // (see below for explanation) 
  .development()
 
// usual Webpack configuration 
module.exports =
{
  context: process.cwd(),
  entry: { main:'./src/client/index.js' },
  output: { 
    path: './static/dist', // 出力先のパス
    publicPath: '/dist/',
    filename: 'bundle.js' // 出力先のファイル名
  },
 
  module:
  {
    loaders:
    [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: webpack_isomorphic_tools_plugin.regular_expression('images'),
        loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead 
      }
    ]
  },
 
  plugins:
  [
    webpack_isomorphic_tools_plugin
  ]
 
}
