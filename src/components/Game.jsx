import React, { useEffect } from "react";
import Result from "../components/Result";
import AnswerLetters from "../components/answerLetters";
import HangMan from "../components/HangMan";
import ResetButton from "../components/ResetButton";
import useDataContext from "../contexts/DataContext";
import Keyboard from "./Keyboard";

export default function Game() {
    const { mistake, setAnswer, guessed,
      remainingTries, end, setEnd, setWin,
      value, images, words, inputRef,
      } = useDataContext();
    
      useEffect(() => {
        const randomWord =
          words.words[Math.floor(Math.random() * words.words.length)];
        setAnswer(randomWord);
        console.log(randomWord);
      }, []);
    
      useEffect(() => {
        if (mistake == images.length) {
          setEnd(true);
          setWin(false);
        }
        if (!end && inputRef.current) {
          inputRef.current.focus();
        }
    console.log(mistake);

      }, [remainingTries, guessed, value, end]);
    

  return (
    <div className="game">
      <Result />
      <HangMan />
      <AnswerLetters />
      <Keyboard/>
      <ResetButton />
    </div>
  );
}
