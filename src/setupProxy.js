const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/gnews',
    createProxyMiddleware({
      target: 'https://gnews.io/api/v4',
      changeOrigin: true,
      pathRewrite: { '^/api/gnews': '' },
    })
  );
};
