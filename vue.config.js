module.exports = {
  devServer: {
    host: 't.test.wsmanage.oa.com',
    port: 81,
    proxy: {
      '/index.php/': {
        // target: 'http://test.wsmanage.oa.com/',http://test.dgj.oa.com
        target: 'http://test.dgj.oa.com/',
        changeOrigin: true
      }
    }
  }
}
