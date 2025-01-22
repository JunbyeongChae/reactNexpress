const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/n',{
            target: 'http://localhost:5000/',
            changeOrigin: true
        })
    )
    //톰캣 서버와 연동한 프록시 설정
    //리액트 화면에서 백엔드쪽에 요청을 할 때 8000번 포트로 요청하기
    //리액트 화면에서라는 건 3000번을 사용하고 있는데 글목록버튼을 누르면 
    //톰캣 서버측에 URL로 요청을 하게 된다.
    //이 때 출처가 3000번에서 8000번으로 바뀐다. - 문제삼기 - CORS이슈
    //백엔드 요청시 pojo가 들어간 요청에 대해서는 CORS이슈를 문제삼지 않을게
    app.use(
        '/pojo',
        createProxyMiddleware({
            target: 'http://localhost:8000/', //톰캣 서버의 주소 및 포트 번화
            changeOrigin: true
        })
    )
}
/*
    화면에 대한 요청은 3000번으로 들어온다.
    목록조회(select-GET), 글등록(insert-POST), 글수정(update-PUT),글삭제(delete-DELETE)
    : 모든 요청에 대해 하나의 클래스에서 요청을 받고 업무를 구분해서 각각의 컨트롤 클래스로 연결시킨다. 
    쿼리문 작성으로 파리미터와 리턴 타입에 대한 결정이 가능하다.
    select * from notice
    insert into notce(n_title, n_writer, n_content) values(?,?,?)
    update notice set n_title=?, n_writer=?, n_content=?
    where n_no=?
    delete from notice where n_no=?
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