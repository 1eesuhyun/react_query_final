import {useNavigate, useParams, Link, useNavigationType} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useEffect, Fragment} from "react";
import boardClient from "../board-commons";

interface BoardDetailProps {
    NO: number;
    NAME: string;
    SUBJECT: string;
    CONTENT: string;
    HIT: string;
    DBDAY: string;
}

function BoardDetail() {
    const {no} = useParams();
    const navigate = useNavigate();
    const type=useNavigationType()
    console.log(type)
    const {isLoading,isError,error,data}=useQuery<{data:BoardDetailProps}>({
        queryKey:['board-detail',no],
        queryFn: async()=>{
            return boardClient.get(`/board/detail_node?no=${no}`)
        }
        // ? 하고 넘어갈 때는 => req.query.no => getParameter
        // /board/detail/1 => req.params => @PathVariable
    })
    if(isLoading){
        return <h1 className={"text-center"}>Loading...</h1>
    }
    if(isError){
        return <h1 className={"text-center"}>{error?.message}</h1>
    }
    const board=data?.data
    if(!board){
        return null
    }

    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>React-Query + TypeScript 상세보기</h2>
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
                    <div className="row">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td width={"20%"} className={"text-center"}>번호</td>
                                <td width={"30%"} className={"text-center"}>{board.NO}</td>
                                <td width={"20%"} className={"text-center"}>작성일</td>
                                <td width={"30%"} className={"text-center"}>{board.DBDAY}</td>
                            </tr>
                            <tr>
                                <td width={"20%"} className={"text-center"}>이름</td>
                                <td width={"30%"} className={"text-center"}>{board.NAME}</td>
                                <td width={"20%"} className={"text-center"}>조회수</td>
                                <td width={"30%"} className={"text-center"}>{board.HIT}</td>
                            </tr>
                            <tr>
                                <td width={"20%"} className={"text-center"}>제목</td>
                                <td colSpan={3}>{board.SUBJECT}</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className={"text-left"} valign={"top"} height={200}>
                                    <pre style={{"whiteSpace": "pre-wrap","backgroundColor":"white","border":"none"}}>{board.CONTENT}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4} className={"text-right"}>
                                    <Link to={"/board/update/"+board.NO} className={"btn btn-outline-warning"}>수정</Link>&nbsp;
                                    <Link to={"/board/delete/"+board.NO} className={"btn btn-outline-danger"}>삭제</Link>&nbsp;
                                    <Link to={"/board/list"} className={"btn btn-outline-primary"}>목록</Link>
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

export default BoardDetail;