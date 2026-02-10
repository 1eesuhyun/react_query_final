import {useState, Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from 'react-router-dom'
import {JejuData, JejuItem} from "../../commons/commonsData";
import apiClient from "../../http-commons";
import {AxiosResponse, AxiosError} from "axios";

interface DetailProps {
    data: {
        dto: JejuItem;
    }
}

function JejuAttractionDetail() {
    const {contentid} = useParams()
    const nav = useNavigate();
    const {isLoading, isError, error, data} = useQuery<JejuItem, Error, DetailProps>({
        queryKey: ['detail-jeju', contentid],
        queryFn: async () => {
            return await apiClient.get(`/jeju/detail_react/${contentid}`);
        }
    })
    if (isLoading) {
        return <h1 className="text-center">Loading...</h1>
    }
    if (isError) {
        return <h1 className="text-center">Error: {error?.message}</h1>
    }
    const jejuData: JejuItem | undefined = data?.data.dto;
    console.log(jejuData)

    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../../img/bg-img/breadcumb.jpg)"}}>
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
                                <td className={"text-center"} rowSpan={6} width={"30%"}>
                                    <img src={jejuData?.image1} style={{"width": "400px", "height": "350px"}}/>
                                </td>
                                <td colSpan={2}><h4>{jejuData?.title}</h4></td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>주소</td>
                                <td width={"55%"}>{jejuData?.address}</td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>휴일</td>
                                {
                                    jejuData?.infocenter &&
                                    <td width={"55%"} dangerouslySetInnerHTML={{__html: jejuData?.restdate ?? ""}}></td>
                                }
                                <td width={"55%"}></td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>이용시간</td>
                                {
                                    jejuData?.infocenter &&
                                    <td width={"55%"} dangerouslySetInnerHTML={{__html: jejuData?.usetime ?? ""}}></td>
                                }
                                <td width={"55%"}></td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>주차</td>
                                {
                                    jejuData?.infocenter &&
                                    <td width={"55%"} dangerouslySetInnerHTML={{__html: jejuData?.parking ?? ""}}></td>
                                }
                                <td width={"55%"}></td>
                            </tr>
                            <tr>
                                <td className={"text-center"} width={"15%"}>안내</td>
                                {
                                    jejuData?.infocenter &&
                                    <td width={"55%"}
                                        dangerouslySetInnerHTML={{__html: jejuData?.infocenter ?? ""}}></td>
                                }
                            </tr>
                            </tbody>
                        </table>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>{jejuData?.msg}</td>
                            </tr>
                            </tbody>
                        </table>
                        {/*지도*/}
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className={"text-center"}></td>
                            </tr>
                            </tbody>
                        </table>
                        {/*댓글*/}
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className={"text-center"}></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default JejuAttractionDetail;