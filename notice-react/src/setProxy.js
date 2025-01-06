const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/n',{
            target: 'http://localhost:5000/',
            changeOrigin: true
        })
    )
    //톰캣서버와 연동한 프록시 설정
    app.use(
      '/pojo',
      createProxyMiddleware({
        target : 'http://localhost:8000',//톰캣 서버의 주소 및 포트
        changeOrigin : true
      })
    )
}
/*
    Node.js환경에서 사용할 수 있는 http-proxy-middleware 라이브러리를 이용해서 
    프록시 미들웨어를 설정하는 스크립트 이다.
    이를 통해 프론트 엔드 어플리케이션(리액트)에서 특정 api요청을 프록시 서버를 통해 백엔드로 전달할 수  있다.
    
    첫번째 파라미터 api는 프록시를 설정할 경로를 정의한 것이다.
    즉 /api로 시작하는 모든 요청이 프록시를 통해서 전달 된다.
    예) http://localhost:5000/api/hello.do
    예) http://localhost:5000/api*
    프론트 쪽에서는 /api/hello.do요청을 하면 백엔드로 연결이 된다.

    changeOrigin: true
    - 요청의 Origin헤더를 대상 서버의 도메인으로 변경합니다
    - CORS(교차 출처 리소스 공유) 문제를 방지하기 위해 사용됩니다.
*/