import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, handleDeleteQuestion, handleChangeAnswer }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => {
          return <QuestionItem key={question.id} question={question} onDeleteQuestion={handleDeleteQuestion} onChangeAnswer={handleChangeAnswer}/>
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
