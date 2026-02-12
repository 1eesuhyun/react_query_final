import {useState, useRef, useEffect, Fragment} from "react";

function ChatBot() {
    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>챗봇</h2>
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
                    <div className="row" style={{"width": "900px", "margin": "0px auto"}}>
                        <div className="chat-container">
                            <div className={"chat-header"}>Google Gemini</div>
                            <div className={"chat-body"}>

                            </div>
                            <div className={"chat-input"}>
                                <input type={"text"} placeholder={"무엇이 궁금하세요?"} className={"input-sm"}/>
                                <button className={"btn-sm btn-outline-primary"}>전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default ChatBot