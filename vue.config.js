module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '^/api.*': {
        target: 'http://192.168.64.184:5000',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
      args[0].title = 'F3K Dashboard';
      return args;
    });
  }  
};
