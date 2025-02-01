import React, { useState, useEffect } from "react";
import useDataContext from "../contexts/DataContext";
import Form from "react-bootstrap/Form";

export default function AnswerLetters() {
  const { state } = useDataContext();
  const answerLetters = state.answer ? state.answer.split("") : [];

  const displayLetter = (letter) => {
    return state.correctGuess.includes(letter) ? letter : "";
  };
  console.log(state);

  return (
    <div className="ansLetters">
      {answerLetters.map((letter, i) =>
        letter === " " ? (
          <div className="space" key={`space-${i}`}/>
        ) : letter === "-" ? (
          <Form.Control
            index={i}
            value={"–"}
            className="dash"
            key={`dash-${i}`}
            disabled
            type="text"
          />
        ) : (
          <Form.Control
            index={i}
            value={displayLetter(letter)}
            key={`letter-${i}`}
            disabled
            type="text"
            className="ansLetter"
          />
        )
      )}
    </div>
  );
}
