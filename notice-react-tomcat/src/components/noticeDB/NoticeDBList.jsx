import React, { useEffect, useState } from "react";
import { noticeListDB } from "../../service/dbLogic";

const NoticeDBList = () => {
  const [notices, setNotices] = useState([]);
  //const [notices, setNotices] = useState({})
  useEffect(() => {
    const notice = {
      n_no: 0,
      n_title: "",
      n_writer: "",
      n_content: "",
    };
    const asynDB = async () => {
      const res = await noticeListDB(notice);
      console.log(res.data);
      setNotices(res.data);
    };
    asynDB();
    console.log(notices);
  }, []);
  return (
    <div>
      <ul>
        {notices.map((notice, index) => (
          <li key={index}>
            {`${notice.n_title}, ${notice.n_writer}, ${notice.n_content}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeDBList;
