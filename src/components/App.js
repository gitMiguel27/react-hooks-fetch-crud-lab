import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(resp => resp.json())
      .then(questionsData => {
        setQuestions(questionsData);
      });
  }, []);

  function handleFormSubmit(newQuestion) {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    }, []);

    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  function handleChangeAnswer(newAnswer) {
    const updatedQuestions = questions.map(question => {
      if (question.id === newAnswer.id) {
        return newAnswer;
      } else {
        return question;
      }
    })
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
        <QuestionForm handleFormSubmit={handleFormSubmit}/> 
        : 
        <QuestionList questions={questions} handleDeleteQuestion={handleDeleteQuestion} handleChangeAnswer={handleChangeAnswer}/>
      }
    </main>
  );
}

export default App;
