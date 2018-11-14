const path = require('path');

module.exports = {
  entry: './src/rua.js',
  output: {
    filename: 'rua.js',
    path: path.resolve(__dirname, 'dist/js')
  }
};
