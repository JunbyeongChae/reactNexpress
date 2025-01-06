import React, { useCallback, useRef, useState } from 'react'
import QuillEditor from './QuillEditor'

const QuillWrite = () => {
    const quillRef = useRef();
    const [content, setContent] = useState('');
    //useCallback은 함수 메모이제이션에 사용하고 useMemo는 값 메모이제이션에 사용함
    //둘 다 리액트 최적화에 중요한 훅입니다.
    const handleContent = useCallback((value) => {
        console.log(value)
        setContent(value)
    })

    return (
        <>
            <h3>글내용 쓰기</h3>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} />
        </>
    )
}

export default QuillWrite