var express = require("express");
var router = express.Router();
var db = require("../db");
//파일IO관련 모듈 추가
const fs = require("fs");
//물리적인 서버가 바라보는 위치 설정
const path = require("path");
//파일 업로드 처리에 필요한 모듈
const formidable = require("formidable");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//리액트 프로젝트 QuillEditor에서 이미지를 선택했을 때 5000번 서버에 업로드 하기
// 업로드 디렉토리 설정
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  //fs활용하여 uploads폴더가 없으면
  fs.mkdirSync(uploadDir); //현재 디렉토리(__dirname) 아래 uploads폴더 생성해
}

// 이미지 업로드 라우트
router.post("/board/imageUpload", (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir, // 업로드 디렉토리 설정
    keepExtensions: true, // 파일 확장자 유지
    maxFileSize: 10 * 1024 * 1024, // 파일 크기 제한 (10MB)
  });

  // 폼 처리
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("폼 파싱 중 오류 발생:", err);
      return res.status(500).send("폼 파싱 실패");
    }

    // 업로드된 파일 정보 가져오기
    const file = files.file;
    //console.log(file);
    if (!file) {
      return res.status(400).send("업로드된 파일이 없습니다.");
    }

    // 파일이 배열인지, 단일 객체인지 확인 후 newFilename 읽어오기
    let newFilename;
    if (Array.isArray(file)) {
      // 배열인 경우
      console.log("파일 배열 내용:", file);
      newFilename = file[0].newFilename;
    } else {
      // 단일 객체인 경우
      console.log("파일 객체 내용:", file);
      newFilename = file.newFilename;
    }

    console.log("newFilename:", newFilename);
    res.send(`uploads/${newFilename}`); //upload된 url반환
  });
});

//http://localhost:5000/users/board/list
router.get("/board/list", async (req, res) => {
  const { gubun, keyword } = req.query;
  console.log(`${gubun}, ${keyword}`);
  let sql =
    "select b_no, b_title, b_writer, b_content, b_date, b_hit from react_board";
  //조건 검색을 위해 사용자로 부터 받아오는 값에 따라 쿼리문을 변경 할것.
  let params = [];
  if (gubun && keyword) {
    //사용자로 부터 둘 다 받아왔을 때 조건 쿼리문 추가
    if (gubun === "b_title") {
      //select콤보에서 제목을 클릭했을 때
      sql += " WHERE b_title LIKE ?";
    } else if (gubun === "b_writer") {
      //작성자를 클릭했을 때
      sql += " WHERE b_writer LIKE ?";
    } else if (gubun === "b_content") {
      //내용을 클릭했을 때
      sql += " WHERE b_content LIKE ?";
    }
    params.push(`%${keyword}%`);
  } //end of 사용자로 부터 조건값을 받았을 때
  //내림차순으로 정렬 추가
  sql += " ORDER BY b_no asc";
  try {
    //데이터베이스 쿼리 실행 하기.
    const [rows] = await db.get().execute(sql, params);
    //성공시 응답하기
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
  } //end of try..catch
});

router.get("/board/detail/:b_no", async (req, res) => {
  const b_no = req.params.b_no; //사용자가 선택한 글번호
  //한 건을 조회하기 위해서 where절 사용함. - pk조건절 사용함
  let sql =
    "select b_no, b_title, b_writer, b_content from react_board where b_no=?";
  try {
    //데이터베이스 쿼리 실행 하기.
    const [rows] = await db.get().execute(sql, [b_no]);
    //조회결과가 없는 경우 처리
    if (rows.length === 0) {
      return res.status(404).send({ message: "해당 글을 찾을 수 없습니다." });
    }
    //성공시 응답하기
    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .send({ message: "글 상세보기 처리 중 오류가 발생 했습니다." });
  } //end of try..catch
}); //end of 상세보기

router.post("/board/insert", async (req, res) => {
  //사용자가 화면에서 입력한 값 담기
  const { b_title, b_writer, b_content } = req.body;
  const sql =
    "insert into react_board(b_title, b_writer, b_content) values(?,?,?)";

  try {
    //데이터베이스 쿼리 실행 하기.
    const [result] = await db
      .get()
      .execute(sql, [b_title, b_writer, b_content]);
    console.log(result); //1이면 입력 성공, 0이면 입력 실패
    //성공시 응답하기
    res.json({ success: true, result: result });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .send({ message: "글 쓰기 처리 중 오류가 발생 했습니다." });
  } //end of try..catch
}); //end of 글쓰기

//http://localhost:5000/users/notice/list
router.get("/notice/list", async (req, res) => {
  const { gubun, keyword } = req.query;
  let sql = "select n_no, n_title, n_writer, n_content from notice";
  //조건 검색을 위해 사용자로 부터 받아오는 값에 따라 쿼리문을 변경 할것.
  let params = [];
  if (gubun && keyword) {
    //사용자로 부터 둘 다 받아왔을 때 조건 쿼리문 추가
    if (gubun === "n_title") {
      //select콤보에서 제목을 클릭했을 때
      sql += " WHERE n_title LIKE ?";
    } else if (gubun === "n_writer") {
      //작성자를 클릭했을 때
      sql += " WHERE n_writer LIKE ?";
    } else if (gubun === "n_content") {
      //내용을 클릭했을 때
      sql += " WHERE n_content LIKE ?";
    }
    params.push(`%${keyword}%`);
  } //end of 사용자로 부터 조건값을 받았을 때
  //내림차순으로 정렬 추가
  sql += " ORDER BY n_no desc";
  try {
    //데이터베이스 쿼리 실행 하기.
    const [rows] = await db.get().execute(sql, params);
    //성공시 응답하기
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
  } //end of try..catch
});

//공지사항 상세보기
router.get("/notice/detail/:n_no", async (req, res) => {
  const n_no = req.params.n_no; //사용자가 선택한 글번호
  //한 건을 조회하기 위해서 where절 사용함. - pk조건절 사용함
  let sql =
    "select n_no, n_title, n_writer, n_content from notice where n_no=?";
  try {
    //데이터베이스 쿼리 실행 하기.
    const [rows] = await db.get().execute(sql, [n_no]);
    //조회결과가 없는 경우 처리
    if (rows.length === 0) {
      return res.status(404).send({ message: "해당 글을 찾을 수 없습니다." });
    }
    //성공시 응답하기
    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .send({ message: "글 상세보기 처리 중 오류가 발생 했습니다." });
  } //end of try..catch
}); //end of 상세보기

//-> POST - http://localhost:5000/users/notice/insert
//공지글 쓰기
router.post("/notice/insert", async (req, res) => {
  //사용자가 화면에서 입력한 값 담기
  const { n_title, n_writer, n_content } = req.body;
  const sql =
    "insert into notice(n_no,n_title, n_writer, n_content) values(?,?,?)";

  try {
    //데이터베이스 쿼리 실행 하기.
    const [result] = await db
      .get()
      .execute(sql, [n_title, n_writer, n_content]);
    console.log(result); //1이면 입력 성공, 0이면 입력 실패
    //성공시 응답하기
    res.json({ success: true, result: result });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .send({ message: "글 쓰기 처리 중 오류가 발생 했습니다." });
  } //end of try..catch
}); //end of 글쓰기

//공지글 수정
router.put("/notice/update/:n_no", async (req, res) => {
  //사용자가 화면에서 수정한 값 담기
  const n_no = req.params.n_no;
  const { n_title, n_writer, n_content } = req.body;
  //필수 필드 확인
  if (!n_title || !n_writer || !n_content) {
    console.error("Missing fields : ", req.body);
    return res.status(400).send("요청한 데이터가 틀렸을 때.");
  }
  const sql =
    "update notice set n_title=?, n_writer=?, n_content=? where n_no=?";

  try {
    //데이터베이스 쿼리 실행 하기.
    //query요청시에 ?순서와 변수의 순서가 일치해야 합니다.
    const [result] = await db
      .get()
      .execute(sql, [n_title, n_writer, n_content, n_no]);
    console.log(result); //1이면 입력 성공, 0이면 입력 실패
    //성공시 응답하기
    res.json({ result: result });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .send({ message: "글 수정 처리 중 오류가 발생 했습니다." });
  } //end of try..catch
});
//공지글 삭제 - delete from notice where n_no=21
router.delete("/notice/delete/:n_no", async (req, res) => {
  //사용자가 화면에서 수정한 값 담기
  const n_no = req.params.n_no;
  const sql = "delete from notice where n_no=?";

  try {
    //데이터베이스 쿼리 실행 하기.
    const [result] = await db.get().execute(sql, [n_no]);
    //성공시 응답하기
    res.json({ result: result });
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .send({ message: "글 상세보기 처리 중 오류가 발생 했습니다." });
  } //end of try..catch
}); //end of 공지글 삭제하기
module.exports = router;
