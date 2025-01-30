import React from "react";
import useDataContext from "../contexts/DataContext";

export default function Result() {
  const { end, win, clickCounter, streak, remainingTries } = useDataContext();
  
  return (
    <div className="result">
      {end ? (
        win ? (
          <div className="win">Congratulation, you win in {clickCounter} moves! Streak: {streak}</div>
        ) : (
          <div className="fail">Sorry, you didn't catch the word. Streak: {streak}</div>
        )
      ) : (
        <div className="remainingTries">Hátralévő próbálkozások száma: {remainingTries}</div>
      )}
    </div>
  );
}
