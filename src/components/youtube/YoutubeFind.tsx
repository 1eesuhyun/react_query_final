import {useState, useEffect, Fragment,useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import {YoutubeApi} from "./YoutubeApi";
import {YoutubeItem} from "../../commons/commonsData";

function YoutubeFind() {
    const [fd, setFd,] = useState<string>("제주여행");
    const fdRef=useRef<HTMLInputElement>(null);
    const {isLoading, isError, error, data,refetch:find} = useQuery({
        queryKey: ['youbute'],
        queryFn: () => YoutubeApi(fd),
        enabled: fd.trim().length > 0
    })
    const findClick=()=>{
        if(!fd.trim()){
            return fdRef.current?.focus();
        }
        if(fdRef.current){
            setFd(fdRef.current?.value);
        }
        find()
    }

    if(isLoading){
        return <h1 className={"text-center"}>Loading...</h1>
    }
    if(error){
        return <h1 className={"text-center"}>{error?.message}</h1>
    }
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>Youtube 검색</h2>
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
                                <input type={"text"} size={20} className={"input-sm"} style={{"marginTop": "20px"}} value={fd} ref={fdRef}
                                onChange={(e)=>setFd(e.target.value)}/>
                                <button className={"btn-sm btn-outline-primary"} onClick={findClick}>검색</button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        {
                            data?.items.map((item:YoutubeItem)=>
                                <div className="col-6" key={item.id.videoId}>
                                    <div className="single-post" style={{"margin": "0px auto"}}>
                                        <div className="post-thumb">
                                            <iframe src={"https://www.youtube.com/embed/"+item.id.videoId} title={item.snippet.title} allowFullScreen={true} width="550px" height="350px"/>
                                        </div>
                                        <div className="post-content">
                                            <h6 className={"post-content"}>
                                                {item.snippet.title}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default YoutubeFind