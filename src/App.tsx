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
import BoardUpdate from "./board/BoardUpdate";
import BoardDelete from "./board/BoardDelete";
import YoutubeFind from "./components/youtube/YoutubeFind";
import ChatBot from "./chat/ChatBot";
import News from "./components/news/News";

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
                <Route path="/board/update/:no" element={<BoardUpdate/>}/>
                <Route path="/board/delete/:no" element={<BoardDelete/>}/>
                <Route path="/youtube" element={<YoutubeFind/>}/>
                <Route path="/chat/chatbot" element={<ChatBot/>}/>
                <Route path="/news" element={<News/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
