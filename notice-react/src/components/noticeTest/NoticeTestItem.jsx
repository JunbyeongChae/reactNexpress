import React from 'react'
import { Link } from 'react-router'

const NoticeTestItem = (props) => {
  const { n_no, n_title, n_writer, n_content } = props.notice
  console.log(n_no+", "+n_title+", "+n_writer+", "+n_content)
  return (
    <>
      <tr>
        <td>{n_no}</td>
        <td>
          <Link to={`/noticeTD?n_no=${n_no}&n_title=${n_title}&n_writer=${n_writer}&n_content=${n_content}`} className='btn btn-primary'>{n_title}</Link>
        </td>
        <td>{n_writer}</td>
      </tr>
    </>
  )
}

export default NoticeTestItem