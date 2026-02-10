import {Fragment, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {Link} from "react-router-dom";
import {AxiosResponse} from "axios";
import {JejuItem, JejuData} from "../../commons/commonsData";
import PagePrint from "../../commons/PagePrint";

function JejuAttractionList() {
    const [curpage, setCurpage] = useState<number>(1);
    const {isLoading, isError, error, data} = useQuery<AxiosResponse<JejuData, Error>>({
        queryKey: ['jeju-attr' + curpage],
        queryFn: async () => {
            return await apiClient.get(`/jeju/attraction_react/${curpage}`)
        }
    })
    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>;
    }
    if (isError) {
        return <h1 className={"text-center"}>Error...:{error?.message}</h1>;
    }
    console.log(data?.data)
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>제주 명소</h2>
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
                                <ol className="breadcrumb">
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        {
                            data?.data.list && data?.data.list.map((jeju: JejuItem, index) =>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="single-post wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="post-thumb">
                                            <Link to={"/jeju/detail/" + jeju.contentid}>
                                                <img src={jeju.image1} style={{"width": "360px", "height": "250px"}}/>
                                            </Link>
                                        </div>
                                        <div className="post-content">
                                            <div className="post-meta d-flex">
                                                <div className="post-author-date-area d-flex">
                                                    <div className="post-author">
                                                        <a href="#">{jeju.address}</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <h4 className="post-headline">{jeju.title}</h4>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="col-12">
                            <div className="pagination-area d-sm-flex mt-15">
                                <nav aria-label="#">
                                    {
                                        data?.data &&
                                        <PagePrint data={data.data} setCurpage={setCurpage}></PagePrint>
                                    }
                                    <div className="page-status">
                                        <p>Page {curpage} of {data?.data.totalpage} results</p>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default JejuAttractionList;