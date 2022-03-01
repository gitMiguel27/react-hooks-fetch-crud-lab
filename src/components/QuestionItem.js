import React from "react";
import QuestionList from "./QuestionList";

function QuestionItem({ question, onDeleteQuestion, onChangeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then(resp => resp.json())
      .then(() => onDeleteQuestion(question));
  }

  function changeAnswer(event) {
    const newAnswer = event.target.value;
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'correctIndex': parseInt(newAnswer)
      }),
    })

    question.correctIndex = parseInt(newAnswer);
    onChangeAnswer(question);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={deleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
