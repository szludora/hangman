import React, { useEffect } from "react";
import useDataContext from "../contexts/DataContext";

export default function Result() {
  const { state } = useDataContext();
  const message = {
    win: state.isEnglish
      ? "Congratulation, you win! Streak: "
      : "Gratulálok, nyertél! Streak: ",
    fail: state.isEnglish
      ? "Sorry, you didn't guess the word. Streak: "
      : "Sajnálom, nem találtad el a szót. Streak: ",
    remainingTries: state.isEnglish
      ? "Number of remaining attempts "
      : "Hátralévő próbálkozások száma: ",
  };

  return (
    <div className="result">
      <div
        className={state.end ? (state.win ? "win" : "fail") : "remainingTries"}
      >
        {state.end
          ? state.win
            ? `${message.win} ${state.streak}`
            : `${message.fail} ${state.streak}`
          : `${message.remainingTries} ${state.remainingTries}`}
      </div>
    </div>
  );
}
