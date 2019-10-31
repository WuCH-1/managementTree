const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8080; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
         * You will need to set publicPath if you plan to deploy your site under a sub path,
         * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
         * then publicPath should be set to "/bar/".
         * In most cases please use '/' !!!
         * Detail: https://cli.vuejs.org/config/#publicpath
         */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/': {
        target: 'http://192.168.16.198:8087',
        changeOrigin: true,
        ws: false,
      },
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'vue-demo',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
};
