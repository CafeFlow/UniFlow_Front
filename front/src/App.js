import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";

import Home from "./components/Home/Home";
import Review from "./components/Review/Review";
import Header from "./components/Header/Header";

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/review" element={<Review />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
