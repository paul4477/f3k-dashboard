module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/scoringdata.*': {
        target: 'http://192.168.64.184',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
};
