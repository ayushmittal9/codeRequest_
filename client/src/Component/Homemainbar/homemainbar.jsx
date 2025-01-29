import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";

const Homemainbar = () => {
  const location = useLocation();
  const user = useSelector((state)=>state.currentuserreducer)
  const navigate = useNavigate();
  const questionlist = useSelector((state)=>state.questionreducer)
  
  

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button  className="ask-btn" onClick={checkAuth}>
          Ask Question
        </button>
      </div>
      <div>
        {questionlist.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionlist.data.length}questions</p>
            <QuestionList questionlist={questionlist.data}/>
          </>
        )}
      </div>
    </div>
  );
};

export default Homemainbar;