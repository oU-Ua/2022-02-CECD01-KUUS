const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //백포트로 프록시
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};

// https://velog.io/@dovnaldisn/React-Router-Dom-Flow-Axios-CORS%EC%9D%B4%EC%8A%88-Proxy-%EC%84%A4%EC%A0%95-Concurrently-Redux-%EA%B8%B0%EC%B4%88-2026