import {useState,Fragment,useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import boardClient from "../../board-commons";
import {YoutubeItem} from "../../commons/commonsData";
import {AxiosResponse} from "axios";
/*
"lastBuildDate":"Thu, 12 Feb 2026 14:31:01 +0900",
	"total":5353803,
	"start":1,
	"display":10,
	"items":[
		{
			"title":"강원FC 아시아 무대 16강 경쟁 끝까지 간다",
			"originallink":"https:\/\/www.kado.net\/news\/articleView.html?idxno=2033937",
			"link":"https:\/\/m.sports.naver.com\/kfootball\/article\/654\/0000166498",
			"description":"강원FC는 11일 춘천송암스포츠타운주경기장에서 열린 상하이 하이강과 2025-2026 AFC(아시아<b>축구<\/b>연맹) 챔피언스리그 엘리트(ACLE) 리그 스테이지 동아시아 7차전에서 0-0으로 비겼다. 이날 무승부로 강원FC는 2승 2무 3패... ",
			"pubDate":"Thu, 12 Feb 2026 14:30:00 +0900"
 */
interface NewsItem {
    title: string;
    originallink: string;
    link: string;
    description: string;
    pubDate: string;
}
interface NewsResponse {
    lastBuildDate: string;
    total:number;
    start:number;
    display:number;
    items:NewsItem[];
}
interface NewsProps {
    data:NewsResponse;
}
function News(){
    const [fd,setFd,] = useState<string>("여행");
    const fdRef=useRef<HTMLInputElement>(null);
    // 서버 연결
    const {isLoading,isError,error,data,refetch:newsFind}=useQuery<AxiosResponse,Error>({
        queryKey:['news'],
        queryFn: async()=>await boardClient.get(`/news?query=${fd}`)
    })
    const find=()=>{
        if(!fd.trim()){
            return fdRef.current?.focus();
        }
        if(fdRef.current){
            setFd(fdRef.current?.value);
        }
        newsFind()
    }

    if(isLoading){
        return <h1 className={"text-center"}>Loading...</h1>;
    }
    if(isError){
        return <h1 className={"text-center"}>Error...{error?.message}</h1>;
    }
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>실시간 news</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                                <input type={"text"} size={20} className={"input-sm"} ref={fdRef} value={fd} onChange={(e)=>setFd(e.currentTarget.value)}/>
                                <button className={"btn-sm btn-outline-primary"} style={{"marginTop":"20px"}} onClick={find}>검색</button>
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
                                <td>
                                    {
                                        data?.data.items &&
                                        data?.data.items.map((item:NewsItem)=>
                                            <table className="table">
                                                <tbody>
                                                <tr>
                                                    <td><a href={item.link} target="_blank"><h4 style={{"color":"orange"}} dangerouslySetInnerHTML={{__html:item.title}}></h4></a></td>
                                                </tr>
                                                <tr>
                                                    <td dangerouslySetInnerHTML={{__html:item.description}}></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        )
                                    }
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

export default News;