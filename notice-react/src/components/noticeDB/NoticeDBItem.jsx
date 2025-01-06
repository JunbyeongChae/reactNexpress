import React from 'react'
import { Link } from 'react-router'

const NoticeDBItem = (props) => {
    const {n_no, n_title, n_writer} = props.notice
    //console.log(n_title)
    return (
        <>
        <tr>
            <td>{n_no}</td>
            <td>
            {/* <Route path="/notice/:n_no" exact={true} element={<NoticeDetail />}/> */}
            <Link to={"/noticeDB/"+n_no} className='btn btn-primary'>{n_title}</Link>
            </td>
            <td>{n_writer}</td>
        </tr>
        </>
    )
}

export default NoticeDBItem