import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Intro from "./components/Intro/Intro";
import Home from "./components/Home/Home";
import Review from "./components/Review/Review";
import Header from "./components/Header/Header";

const AppContent = () => {
  const [isTestButtonClicked, setIsTestButtonClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const location = useLocation(); // useLocation 훅 사용

  return (
    <>
      <Header isTestButtonClicked={isTestButtonClicked} location={location} />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route
          path="/home"
          element={
            <Home
              setIsTestButtonClicked={setIsTestButtonClicked}
              isTestButtonClicked={isTestButtonClicked}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          }
        />
        <Route path="/review" element={<Review />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
