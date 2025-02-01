import React, {useEffect} from "react";
import useDataContext from "../contexts/DataContext";

export default function Result() {
  const { state, clickCounter} = useDataContext();
  
  return (
    <div className="result">
      {state.end ? (
        state.win ? (
          <div className="win">Congratulation, you win! Streak: {state.streak}</div>
        ) : (
          <div className="fail">Sorry, you didn't catch the word. You lost {state.streak} streak.</div>
        )
      ) : (
        <div className="remainingTries">Hátralévő próbálkozások száma: {state.remainingTries}</div>
      )}
    </div>
  );
}
