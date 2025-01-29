import React from "react";
import useDataContext from "../contexts/DataContext";
import Form from "react-bootstrap/Form";

export default function AnswerLetters() {
  const { answerLetters } = useDataContext();

  return (
    <div className="ansLetters">
      {answerLetters.map((letter, i) =>
        letter === " " ? (
          <div className="space" key={`space-${i}`}>
            {" "}
          </div>
        ) : letter === "-" ? (
          <Form.Control
            index={i}
            value={"-"}
            className="dash"
            key={`dash-${i}`}
            disabled
            type="text"
          />
        ) : (
          <Form.Control
            index={i}
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
