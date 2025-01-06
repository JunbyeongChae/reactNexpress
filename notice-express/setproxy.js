const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};

/*
Node.js환경에서 사용할 수 있는 http-proxy-middleware 라이브러리를 이용해서
프록시 미들웨어 설정하는 스크립트이다.
이를통해 프론트엔드 어플리케이션(리액트)에서 특정 api요청을 프록시 서버를 통해 백엔드로 전달 할 수 있다.

첫번째 파라미터 api는 프록시를 설정할 경로를 정의한 것이다.
즉 /api로 시작하는 모든 요청이 프록시를 통해서 전달 된다.
예) http://localhost:3000/api/hello.do
예2) http://localhost:3000/api*
프론트쪽에서는 /api/hello.de 요청을 하면 백엔드로 연결이 된다
*/