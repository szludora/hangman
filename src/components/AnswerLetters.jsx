import React from "react";
import useDataContext from "../contexts/DataContext";
import Form from "react-bootstrap/Form";

export default function AnswerLetters() {
  const { state, ansLetterKeys, answerLetters } = useDataContext();

  return (
    <div className="ansLetters">
      {answerLetters.map((letter, i) =>
        letter === " " ? (
          <div className="space" key={i} />
        ) : letter === "-" ? (
          <Form.Control
            value="–"
            className="dash"
            key={i}
            disabled
            type="text"
          />
        ) : (
          <Form.Control
            ref={(el) => (ansLetterKeys.current[i] = el)}
            value={
              state.end || state.correctGuess.includes(letter) ? letter : ""
            }
            key={i}
            disabled
            type="text"
            className="ansLetter"
          />
        )
      )}
    </div>
  );
}
