import React, {Fragment} from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import JejuAttractionList from "./components/jeju/JejuAttractionList";
import JejuAttractionDetail from "./components/jeju/JejuAttractionDetail";
import BoardList from "./board/BoardList";
import BoardInsert from "./board/BoardInsert";
import BoardDetail from "./board/BoardDetail";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/jeju/attraction" element={<JejuAttractionList/>}/>
                <Route path="/jeju/detail/:contentid" element={<JejuAttractionDetail/>}/>
                <Route path="/board/list" element={<BoardList/>}/>
                <Route path="/board/insert" element={<BoardInsert/>}/>
                <Route path="/board/detail/:no" element={<BoardDetail/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
