/* eslint-disable @typescript-eslint/no-var-requires */
const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [new MonacoEditorWebpackPlugin()],
  },
};
