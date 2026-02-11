import { Fragment, useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { JejuItem } from "../../commons/commonsData";
import apiClient from "../../http-commons";
import { AxiosResponse } from "axios";
import MapPrint from "../../commons/MapPrint";

interface CommentData {
    no: number;
    cno: number;
    id: string;
    name: string;
    msg: string;
    dbday: string;
}

interface DetailProps {
    data: {
        dto: JejuItem;
        comments: CommentData[];
    }
}

function JejuAttractionDetail() {
    const { contentid } = useParams();
    const nav = useNavigate();

    const [isInsert, setIsInsert] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [no, setNo] = useState<number>(0);
    const [msg, setMsg] = useState<string>("");
    const msgRef = useRef<HTMLTextAreaElement>(null);

    const [umsg, setUmsg] = useState<string>("");
    const umsgRef = useRef<HTMLTextAreaElement>(null);

    const { isLoading, isError, error, data, refetch: jejuDetail } = useQuery<DetailProps, Error>({
        queryKey: ['detail-jeju', contentid],
        queryFn: async () => {
            return await apiClient.get(`/jeju/detail_react/${contentid}`);
        }
    });

    const { mutate: commentInsert } = useMutation<DetailProps>({
        mutationFn: async () => {
            const res: AxiosResponse<DetailProps, Error> = await apiClient.post(`/comment/insert`, {
                cno: contentid,
                id: sessionStorage.getItem("id"),
                name: sessionStorage.getItem("name"),
                msg: msg
            });
            return res.data;
        },
        onSuccess: () => {
            jejuDetail();
            setMsg("");
            if (msgRef.current) msgRef.current.value = '';
        }
    });

    const { mutate: commentDelete } = useMutation<DetailProps, Error, number>({
        mutationFn: async (no: number) => {
            const res: AxiosResponse<DetailProps, Error> = await apiClient.delete(`/comment/delete/${no}/${contentid}`);
            return res.data;
        },
        onSuccess: () => jejuDetail()
    });

    const { mutate: commentUpdate } = useMutation<DetailProps, Error, { no: number, msg: string }>({
        mutationFn: async (updateData) => {
            const res: AxiosResponse<DetailProps, Error> = await apiClient.put('/comment/update', {
                no: updateData.no,
                msg: updateData.msg
            });
            return res.data;
        },
        onSuccess: () => {
            jejuDetail();
            setIsInsert(true);
            setIsEdit(false);
            setUmsg("");
        }
    });

    if (isLoading) return <h1 className={"text-center"}>Loading ...</h1>;
    if (isError) return <h1 className={"text-center"}>Error발생 : {error?.message}</h1>;

    const jejuData: JejuItem | undefined = data?.data.dto;
    const comment: CommentData[] | undefined = data?.data.comments;

    const insert = () => {
        if (msg === '') {
            msgRef.current?.focus();
            return;
        }
        commentInsert();
    };

    const del = (no: number) => {
        commentDelete(no);
    };

    const update = () => {
        if (umsg === '') {
            umsgRef.current?.focus();
            return;
        }
        commentUpdate({ no: no, msg: umsg });
    };

    const showUpdateForm = (no: number, index: number) => {
        if (comment) {
            setNo(no);
            setUmsg(comment[index].msg);
            setIsInsert(false);
            setIsEdit(true);
        }
    };

    return (
        <Fragment>
            <div className="breadcumb-area" style={{ "backgroundImage": "url(../../img/bg-img/breadcumb.jpg)" }}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>명소 상세보기</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <td className={"text-center"} rowSpan={6} width={"30%"}>
                                    <img src={jejuData?.image1} style={{ "width": "350px", "height": "300px" }} alt="" />
                                </td>
                                <td colSpan={2}><h3>{jejuData?.title}</h3></td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>주소</td>
                                <td width={"55%"}>{jejuData?.address}</td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>휴일</td>
                                <td width={"55%"}>{jejuData?.restdate}</td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>사용시간</td>
                                <td width={"55%"}>{jejuData?.usetime}</td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>주차</td>
                                <td width={"55%"}>{jejuData?.parking}</td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>안내</td>
                                {jejuData?.infocenter && <td width={"55%"} dangerouslySetInnerHTML={{ __html: jejuData?.infocenter }}></td>}
                            </tr>
                            </tbody>
                        </table>
                        <table className={"table"}>
                            <tbody>
                            <tr><td>{jejuData?.msg}</td></tr>
                            </tbody>
                        </table>
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <td className={"text-center"}>
                                    {jejuData && <MapPrint address={jejuData?.address} name={jejuData?.title} />}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <table className={"table"}>
                            <tbody>
                            <tr><td className={"text-center"}>[댓글]</td></tr>
                            <tr>
                                <td>
                                    {comment && comment.map((com, index) => (
                                        <table className={"table"} key={index}>
                                            <tbody>
                                            <tr>
                                                <td className={"text-left"} width={"80%"}>◑{com.name}({com.dbday})</td>
                                                <td className={"text-right"} width={"20%"}>
                                                    {com.id === sessionStorage.getItem("id") && (
                                                        <span>
                                                                    <button className={"btn-warning btn-sm"} onClick={() => showUpdateForm(com.no, index)}>수정</button>
                                                            &nbsp;
                                                            <button className={"btn-warning btn-sm"} onClick={() => del(com.no)}>삭제</button>
                                                                </span>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} valign={"top"}>
                                                    <pre style={{ "whiteSpace": "pre-wrap", "backgroundColor": "white", "border": "none" }}>{com.msg}</pre>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    ))}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        {sessionStorage.getItem("id") && isInsert && (
                            <table className={"table"}>
                                <tbody>
                                <tr>
                                    <td>
                                        <textarea cols={120} rows={5} style={{ "float": "left" }} ref={msgRef} onChange={(e) => setMsg(e.target.value)}></textarea>
                                        <button className={"btn-primary"} style={{ "float": "left", "width": "100px", "height": "122px" }} onClick={insert}>댓글 작성</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        )}

                        {isEdit && (
                            <table className={"table"}>
                                <tbody>
                                <tr>
                                    <td>
                                        <textarea cols={120} rows={5} style={{ "float": "left" }} value={umsg} ref={umsgRef} onChange={(e) => setUmsg(e.target.value)}></textarea>
                                        <button className={"btn-primary"} style={{ "float": "left", "width": "100px", "height": "122px" }} onClick={update}>댓글 수정</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default JejuAttractionDetail;
