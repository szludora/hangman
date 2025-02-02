import React from "react";
import useDataContext from "../contexts/DataContext";
import Form from "react-bootstrap/Form";

export default function AnswerLetters() {
  const { state, answerLetters, answerLettersKey } = useDataContext();

  return (
    <div className="ansLetters">
      {answerLetters.map((letter, i) => (
        <Form.Control
          key={i}
          ref={answerLettersKey}
          value={
            letter === " " || letter === "-"
              ? letter
              : state.end || state.correctGuess.includes(letter)
              ? letter
              : ""
          }
          className={
            state.end && !state.correctGuess.includes(letter)
              ? "ansLetter notGuessed"
              : "ansLetter"
          }
          disabled
          type="text"
        />
      ))}
    </div>
  );
}
