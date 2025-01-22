const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express()
//express에서 json형식 받아오기
app.use(express.json())
//8000번 포트 서버 오픈
const port = 8000;
app.use(cors())
app.use(express.static("build"))

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname+"/build", "index.html"))
})

app.listen(port, () => {
    console.log(path.join(__dirname + "/build", "index.html"))
})

//단위 테스트 할 때 node app.js