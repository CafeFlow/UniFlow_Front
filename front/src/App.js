import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";
import { createBrowserHistory } from "@remix-run/router";

import Home from "./components/Home/Home";
import Review from "./components/Review/Review";
import Header from "./components/Header/Header";

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용

const history = createBrowserHistory();
history.listen((response) => {
  console.log(response.location.pathname);
  ReactGA.set({ page: response.location.pathname });
  ReactGA.pageview(response.location.pathname);
});

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
