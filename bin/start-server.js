//  enable runtime transpilation to use ES6/7 in node
var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);

var Webpack_isomorphic_tools = require('webpack-isomorphic-tools')

 
// this must be equal to your Webpack configuration "context" parameter 
var project_base_path = require('path').resolve(__dirname, '..')
 
// this global variable will be used later in express middleware 
global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(require('../src/webpack/webpack-isomorphic-tools-configuration'))
// initializes a server-side instance of webpack-isomorphic-tools 
// (the first parameter is the base path for your project 
//  and is equal to the "context" parameter of you Webpack configuration) 
// (if you prefer Promises over callbacks  
//  you can omit the callback parameter 
//  and then it will return a Promise instead) 
.server(project_base_path, function()
{
  // webpack-isomorphic-tools is all set now. 
  // here goes all your web application code: 
  // (it must reside in a separate *.js file  
  //  in order for the whole thing to work) 
  require('../src/server')
})
