import {Link} from "react-router-dom";
import {Fragment} from "react";

function Header() {
    return (
        <Fragment>
            <div className="top_header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-5 col-sm-6">
                            <div className="top_social_bar">
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div className="col-7 col-sm-6">
                            <div className="signup-search-area d-flex align-items-center justify-content-end">
                                <div className="login_register_area d-flex">
                                    <div className="login">
                                        <a href="register.html">Sing in</a>
                                    </div>
                                    <div className="register">
                                        <a href="register.html">Sing up</a>
                                    </div>
                                </div>
                                <div className="search_button">
                                    <a className="searchBtn" href="#"><i className="fa fa-search"
                                                                         aria-hidden="true"></i></a>
                                </div>
                                <div className="search-hidden-form">
                                    <form action="#" method="get">
                                        <input type="search" name="search" id="search-anything"
                                               placeholder="Search Anything..."/>
                                        <input type="submit" value="" className="d-none"/>
                                        <span className="searchBtn"><i className="fa fa-times"
                                                                       aria-hidden="true"></i></span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className="header_area">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <div className="logo_area text-center">
                                <a href="index.html" className="yummy-logo">Yummy Blog</a>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#yummyfood-nav" aria-controls="yummyfood-nav" aria-expanded="false"
                                        aria-label="Toggle navigation"><i className="fa fa-bars"
                                                                          aria-hidden="true"></i> Menu
                                </button>
                                <div className="collapse navbar-collapse justify-content-center" id="yummyfood-nav">
                                    <ul className="navbar-nav" id="yummy-nav">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="index.html">Home <span
                                                className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">서울</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <a className="dropdown-item" href="index.html">명소</a>
                                                <a className="dropdown-item" href="archive.html">쇼핑</a>
                                                <a className="dropdown-item" href="single.html">음식</a>
                                                <a className="dropdown-item" href="static.html">축제</a>
                                                <a className="dropdown-item" href="contact.html">숙박</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">부산</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <a className="dropdown-item" href="index.html">명소</a>
                                                <a className="dropdown-item" href="archive.html">쇼핑</a>
                                                <a className="dropdown-item" href="single.html">음식</a>
                                                <a className="dropdown-item" href="static.html">축제</a>
                                                <a className="dropdown-item" href="contact.html">숙박</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">제주</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <a className="dropdown-item" href="index.html">명소</a>
                                                <a className="dropdown-item" href="archive.html">쇼핑</a>
                                                <a className="dropdown-item" href="single.html">음식</a>
                                                <a className="dropdown-item" href="static.html">축제</a>
                                                <a className="dropdown-item" href="contact.html">숙박</a>
                                            </div>
                                        </li>
                                        <li className={"nav-item"}>
                                            <a className={"nav-link"} href="#">Yummy AI</a>
                                        </li>
                                        <li className={"nav-item"}>
                                            <a className={"nav-link"} href="archive.html">동영상</a>
                                        </li>
                                        <li className={"nav-item"}>
                                            <a className={"nav-link"} href="#">커뮤니티</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header;