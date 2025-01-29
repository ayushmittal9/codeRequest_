import React from "react";
import Question from "./Question";
const QuestionList = ({ questionlist }) => {
  console.log(questionlist)
  return (
    <>
      {questionlist.map((question) => (
        <Question question={question} key={question._id} />
      ))}
    </>
  );
};

export default QuestionList;