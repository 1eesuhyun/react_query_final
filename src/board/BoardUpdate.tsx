import {useState, useEffect, Fragment, useRef} from "react";
import {useQuery, useMutation, Mutation} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import boardClient from "../board-commons";
import {AxiosError, AxiosResponse} from "axios";

/*
    1. React 개념
       => 이론 / 실습 /
       => state(상태)에 따라서 UI를 선언적으로 표현하는 컴포넌트 기반 라이브러리
          데이터 변경
          1) 컴포넌트 기반 화면 UI
          2) 가상 돔 이동
          3) 데이터변경 시 자동 랜더링
    2. state / props
             => 전송을 받는 경우(다른 컴포넌트에 데이터전송)
             => 데이터 변경이 불가능
                <MapPrint address="" name="">
             => funtcion A(props)
             => props.address
       => 컴포넌트 내부 : useState => HTML에 반영
       => 필요시에 변경이 가능
       => 서버나 외부에서 돌아오는 값을 관리 : 상태 관리
    3. useEffect(() =>{

    }
    4. 가상 돔 : vue / react
           -- 트리 허용


 */
interface BoardItem {
    NO: string;
    NAME: string;
    SUBJECT: string;
    CONTENT: string;
    PWD: string;
}

interface BoardResponse {
    msg: string;
}

function BoardUpdate() {
    const nav = useNavigate();

    const [name, setName] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const nameRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const {no} = useParams();

    // 1. 시작하자마자 데이터 읽기 useQuery
    const {isLoading, isError, error, data} = useQuery<{ data: BoardItem }>({
        queryKey: ['board-update', no],
        queryFn: async () => {
            return boardClient.get<BoardItem>(`/board/update_node?no=${no}`)
        }
    })
    const board = data?.data

    useEffect(() => {
        if (board) {
            setName(board.NAME)
            setSubject(board.SUBJECT)
            setContent(board.CONTENT)
        }
    }, [board]);

    // 2. 수정 => 실제 수정 useMutation
    const {mutate: boardUpdate} = useMutation({
        mutationFn: () => boardClient.put('board/update_ok_node', {
            no: no,
            name: name,
            subject: subject,
            content: content,
            pwd: pwd,
        }),
        onSuccess: (res: AxiosResponse<BoardResponse>) => {
            console.log(res)
            if (res.data.msg === 'yes') {
                window.location.href = `/board/detail/${no}`
            } else {
                alert("비밀번호가 틀립니다")
                setPwd("")
                pwdRef.current?.focus()
            }
        },
        onError: (err: AxiosError) => {
            console.log(err.message)
        }
    })

    const boardUpdateOk = () => {
        if (!name.trim())
            return nameRef.current?.focus()
        if (!subject.trim())
            return subjectRef.current?.focus()
        if (!content.trim())
            return contentRef.current?.focus()
        if (!pwd.trim())
            return pwdRef.current?.focus()

        boardUpdate()
    }

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }
    if (isError) {
        return <h1 className={"text-center"}>Error{error?.message}</h1>
    }
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>React-Query + TypeScript 수정하기</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">

                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row" style={{"width": "600px", "margin": "0px auto"}}>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td width={"15%"}>이름</td>
                                <td width={"85%"}>
                                    <input type={"text"} size={15} className={"input-sm"} ref={nameRef} value={name}
                                           onChange={(e) => setName(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"}>제목</td>
                                <td width={"85%"}>
                                    <input type={"text"} size={55} className={"input-sm"} ref={subjectRef}
                                           value={subject} onChange={(e) => setSubject(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"}>내용</td>
                                <td width={"85%"}>
                                    <textarea rows={10} cols={50} ref={contentRef} value={content}
                                              onChange={(e) => setContent(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"}>비밀번호</td>
                                <td width={"85%"}>
                                    <input type={"password"} size={15} className={"input-sm"} ref={pwdRef} value={pwd}
                                           onChange={(e) => setPwd(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={"text-center"}>
                                    <button className="btn btn-outline-primary" onClick={boardUpdateOk}>수정</button>
                                    &nbsp;
                                    <button className="btn btn-outline-warning" onClick={() => nav(-1)}>취소</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default BoardUpdate;