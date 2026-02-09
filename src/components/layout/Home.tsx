import {Fragment, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {MainData, MainItem, TravelItem} from "../../commons/commonsData";
import apiClient from "../../http-commons"

function Home(){
    const {isLoading, isError, error, data} = useQuery<{data:MainData}, Error>({
        queryKey:["main-data"],
        queryFn: async () => await apiClient.get("/")

    })

    if(isLoading){
        return <h1 className={"text-center"}>Loading...</h1>
    }
    if(isError){
        return <h1 className={"text-center"}>Error...{error?.message}</h1>
    }
    console.log("전체 응답:", data);
    console.log("data?.data.image1:", data?.data);
    console.log("data?.data.main:", data?.data.main);
    console.log("data?.data.main?.image1:", data?.data.main?.image1);
    return (
        <Fragment>
            <section className="categories_area clearfix" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".3s">
                                <img src="../../img/서울 여행.jpg" alt="" style={{"width": "330px", "height": "238px"}}/>
                                <div className="catagory-title">
                                    <a href="#">
                                        <h5>서울여행코스</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".6s">
                                <img src="../../img/부산 여행.jpg" alt="" style={{"width": "330px", "height": "238px"}}/>
                                <div className="catagory-title">
                                    <a href="#">
                                        <h5>부산여행코스</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single_catagory wow fadeInUp" data-wow-delay=".9s">
                                <img src="../../img/제주 여행.jpg" alt="" style={{"width": "330px", "height": "238px"}}/>
                                <div className="catagory-title">
                                    <a href="#">
                                        <h5>제주여행코스</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ****** Blog Area Start ****** */}
            <section className="blog_area section_padding_0_80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8">
                            <div className="row">

                                {/* Single Post */}
                                <div className="col-12">
                                    <div className="single-post wow fadeInUp" data-wow-delay=".2s">
                                        <div className="post-thumb">
                                            <img
                                                src={data?.data.main.image1}
                                                style={{"width": "730px", "height": " 400px"}}/>
                                        </div>
                                        <div className="post-content">
                                            <div className="post-meta d-flex">
                                                {/*<div className="post-author-date-area d-flex">
                                                    <div className="post-author">
                                                        <a href="#">By Marian</a>
                                                    </div>
                                                    <div className="post-date">
                                                        <a href="#">May 19, 2017</a>
                                                    </div>
                                                </div>*/}
                                                {/* Post Comment & Share Area */}
                                                <div className="post-comment-share-area d-flex">
                                                    <div className="post-favourite">
                                                        <a href="#"><i className="fa fa-heart-o"
                                                                       aria-hidden="true"></i> 10</a>
                                                    </div>
                                                    <div className="post-comments">
                                                        <a href="#"><i className="fa fa-comment-o"
                                                                       aria-hidden="true"></i> 12</a>
                                                    </div>
                                                    <div className="post-share">
                                                        <a href="#"><i className="fa fa-share-alt"
                                                                       aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <h2 className="post-headline">{data?.data.main.title}</h2>
                                            </a>
                                            <p></p>
                                            <a href="#" className="read-more">Continue Reading..</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Single Post */}
                                {
                                    data?.data.slist.map((seoul:TravelItem,index) =>
                                        <div className="col-12 col-md-6" key={index}>

                                            <div className="single-post wow fadeInUp" data-wow-delay="1s">
                                                <div className="post-thumb">
                                                    <img src={seoul.image1} alt=""
                                                         style={{"width": "349px", "height": "262px"}}/>
                                                </div>
                                                <div className="post-content">
                                                    <div className="post-meta d-flex">
                                                        <div className="post-author-date-area d-flex">
                                                            <div className="post-author">
                                                                <a href="#">조회수 : {seoul.hit}</a>
                                                            </div>
                                                            <div className="post-date">
                                                                <a href="#"></a>
                                                            </div>
                                                        </div>
                                                        {/* Post Comment & Share Area */}
                                                        <div className="post-comment-share-area d-flex">
                                                            <div className="post-favourite">
                                                                <a href="#"><i className="fa fa-heart-o"
                                                                               aria-hidden="true"></i> 10</a>
                                                            </div>
                                                            <div className="post-comments">
                                                                <a href="#"><i className="fa fa-comment-o"
                                                                               aria-hidden="true"></i> 12</a>
                                                            </div>
                                                            <div className="post-share">
                                                                <a href="#"><i className="fa fa-share-alt"
                                                                               aria-hidden="true"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#">
                                                        <h4 className="post-headline">{seoul.title}</h4>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                {
                                    data?.data.blist.map((busan:TravelItem,index) =>
                                        <div className="col-12">
                                            <div className="list-blog single-post d-sm-flex wow fadeInUpBig"
                                                 data-wow-delay=".8s">
                                                <div className="post-thumb">
                                                    <img src={busan.image1} alt=""
                                                         style={{"width": "349px", "height": "233px"}}/>
                                                </div>
                                                <div className="post-content">
                                                    <div className="post-meta d-flex">
                                                        <div className="post-author-date-area d-flex">
                                                            <div className="post-author">
                                                                <a href="#">조회수 : {busan.hit}</a>
                                                            </div>
                                                            <div className="post-date">
                                                                <a href="#"></a>
                                                            </div>
                                                        </div>
                                                        {/* Post Comment & Share Area */}
                                                        <div className="post-comment-share-area d-flex">
                                                            <div className="post-favourite">
                                                                <a href="#"><i className="fa fa-heart-o"
                                                                               aria-hidden="true"></i> 10</a>
                                                            </div>
                                                            <div className="post-comments">
                                                                <a href="#"><i className="fa fa-comment-o"
                                                                               aria-hidden="true"></i> 12</a>
                                                            </div>
                                                            <div className="post-share">
                                                                <a href="#"><i className="fa fa-share-alt"
                                                                               aria-hidden="true"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <a href="#">
                                                        <h4 className="post-headline"></h4>
                                                    </a>
                                                    <p>{busan.title}</p>
                                                    <p>{busan.address}</p>
                                                    <p>주차 정보 : </p>
                                                    <a href="#" className="read-more">Continue Reading..</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Blog Sidebar */}
                        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                            <div className="blog-sidebar mt-5 mt-lg-0">
                                {/* Single Widget Area  */}
                                <div className="single-widget-area about-me-widget text-center">
                                    <div className="widget-title">
                                        <h6>오늘의 추천</h6>
                                    </div>
                                    <div className="about-me-widget-thumb">
                                        <img src="../../img/about-img/1.jpg" alt=""/>
                                    </div>
                                    <h4 className="font-shadow-into-light">Shopia Bernard</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt</p>
                                </div>

                                {/* Single Widget Area */}
                                <div className="single-widget-area popular-post-widget">
                                    <div className="widget-title text-center">
                                        <h6>서울 인기 맛집</h6>
                                    </div>
                                    {/* Single Popular Post */}
                                    <div className="single-populer-post d-flex">
                                        <img src="" style={{"width": "165px", "height": "125px"}}/>
                                        <div className="post-content">
                                            <a href="#">
                                                <h6></h6>
                                            </a>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Single Widget Area */}
                                <div className="single-widget-area add-widget text-center">
                                    <div className="add-widget-area">
                                        <img src="../../img/sidebar-img/6.jpg" alt=""/>
                                        <div className="add-text">
                                            <div className="yummy-table">
                                                <div className="yummy-table-cell">
                                                    <h2>Cooking Book</h2>
                                                    <p>Buy Book Online Now!</p>
                                                    <a href="#" className="add-btn">Buy Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Single Widget Area */}
                                <div className="single-widget-area newsletter-widget">
                                    <div className="widget-title text-center">
                                        <h6>실시간 인기 검색어</h6>
                                    </div>

                                    <p></p>

                                    <div className="newsletter-form">
                                        <form action="#" method="post">
                                            <input type="email" name="newsletter-email" id="email"
                                                   placeholder="Your email"/>
                                            <button type="submit"><i className="fa fa-paper-plane-o"
                                                                     aria-hidden="true"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Home;