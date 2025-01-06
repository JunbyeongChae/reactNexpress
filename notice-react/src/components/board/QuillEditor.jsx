import ImageResize from 'quill-image-resize-module-react'
import React, { useCallback, useMemo } from 'react'
import { uploadImageDB } from '../../service/dbLogic';
import ReactQuill, {Quill} from 'react-quill-new';
Quill.register('modules/ImageResize', ImageResize);

const QuillEditor = ({ value, handleContent, quillRef }) => {
    const imageHandler = useCallback(() => {
        /* 이미지를 선택하고 열기를 눌렀을 때 생성되는 DOM입니다 */
        const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기
        const input = document.createElement("input"); // input 태그를 동적으로 생성하기
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*"); // 이미지 파일만 선택가능하도록 제한
        input.setAttribute("name", "image");
        input.click();
        /* 선택한 파일의 type이 file이다. */
        // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
        input.onchange = async () => {
            try{
                const file = input.files[0];
                if (!file) {
                    alert("파일이 선택되지 않았습니다.");
                    return;
                }
                const fileType = file.name.split('.').pop().toUpperCase();
                console.log(fileType);
                // 파일 확장자 검증
                if (!['JPG', 'PNG', 'JPEG'].includes(fileType)) {
                    alert("jpg, png, jpeg 형식만 지원합니다.");
                    return;
                }
                formData.append("file", file); // 위에서 만든 폼데이터에 이미지 추가
                for (let pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }
                // 폼데이터를 서버(5000)에 넘겨 이미지 URL 받아오기
                const res = await uploadImageDB(formData);
                //5000번 서버가 응답으로 보내는 URL은 uploads/파일명.사용자가선택한이미지의 확장자온다.
                //http://localhost:5000/+res.data
                console.log(res.data);
                if (!res.data) {
                    alert("이미지 업로드에 실패하였습니다.");
                    return;
                }
                // 이미지 URL 생성
                const url = `${process.env.REACT_APP_EXPRESS_IP}${res.data}`;
                console.log(`Uploaded Image URL: ${url}`);
                const quill = quillRef.current.getEditor();
                /* ReactQuill 노드에 대한 Ref가 있어야 메서드들을 호출할 수 있으므로
                useRef()로 ReactQuill에 ref를 걸어주자.
                getEditor() : 편집기를 지원하는 Quill 인스턴스를 반환함
                여기서 만든 인스턴스로 getText()와 같은 메서드를 사용할 수 있다.*/
                const range = quill.getSelection().index;
                //getSelection()은 현재 선택된 범위를 리턴한다. 에디터가 포커싱되지 않았다면 null을 반환한다.
                if (typeof range !== "number") {
                    alert("에디터에 포커스가 필요합니다.");
                    return;
                }
                /*range는 0이 될 수도 있으므로 null만 생각하고 !range로 체크하면 잘못 작동할 수 있다.
                따라서 타입이 숫자이지 않을 경우를 체크해 리턴해주었다.*/
                quill.setSelection(range, 1);
                /* 사용자 선택을 지정된 범위로 설정하여 에디터에 포커싱할 수 있다.
                위치 인덱스와 길이를 넣어주면 된다.*/
                quill.clipboard.dangerouslyPasteHTML(
                    range,
                    `<img src=${url} style="width: 100%; height: auto;" alt="image" />`);
                //handleFiles(res.data, `${Math.floor(file.size/(1024*1024)*10)/10}MB`);
            } catch (error) {
                console.error("이미지 업로드 중 오류 발생:", error);
                alert("이미지 업로드 중 오류가 발생하였습니다.");
            }
        }   //주어진 인덱스에 HTML로 작성된 내용물을 에디터에 삽입한다.
    }, [quillRef]);
    const modules = useMemo(
        () => ({
        toolbar: { // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { color: [] }, { 'align': [] }, { 'background': [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ['clean'],
                ['link', "image"],
            ],
            handlers: { // 위에서 만든 이미지 핸들러 사용하도록 설정
                image: imageHandler,
            },
        },
        ImageResize: {
            modules: ['Resize']
        }
    }), [imageHandler])
    const formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',
    ]
    return (
        <div style={{height: "550px", display: "flex", justifyContent: "center", padding:"0px"}}>
            <ReactQuill
                ref={quillRef}
                style={{height: "470px", width: "100%"}}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={(content, delta, source, editor) => {handleContent(editor.getHTML());}} />
        </div>
    )
}

export default QuillEditor