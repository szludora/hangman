import React from "react";
import useDataContext from "../contexts/DataContext";

export default function Result() {
  const { end, win, clickCounter } = useDataContext();
  
  return (
    <div className="result">
      {end ? (
        win ? (
          <div className="win">Congratulation, you win in {clickCounter} moves!</div>
        ) : (
          <div className="fail">Sorry, you didn't catch the word.</div>
        )
      ) : (
        <div className="resultMessage"></div>
      )}
    </div>
  );
}
