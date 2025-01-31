import React, { useEffect } from "react";
import Result from "../components/Result";
import AnswerLetters from "../components/AnswerLetters";
import HangMan from "../components/HangMan";
import ResetButton from "../components/ResetButton";
import ThemeButton from "../components/ThemeButton";
import useDataContext from "../contexts/DataContext";
import Keyboard from "./Keyboard";
import { Container } from "react-bootstrap";

export default function Game() {
  const {
    mistake,
    answer,
    setAnswer,
    guessed,
    remainingTries,
    end,
    setEnd,
    setWin,
    value,
    images,
    words,
    inputRef,
    themeClasses,
    theme,
    streak,
    setStreak,
  } = useDataContext();

  useEffect(() => {
    const randomWord =
      words.words[Math.floor(Math.random() * words.words.length)];
    setAnswer(randomWord);
  }, []);

  useEffect(() => {
    console.log(answer);

    if (!end && inputRef.current) {
      inputRef.current.focus();
    }
  }, [remainingTries, guessed, value, end, theme, streak]);

  return (
    <Container fluid className={`gameContainer ${themeClasses[theme]}`}>
      <div className="game">
        <Result />
        <HangMan />
        <AnswerLetters />
        <Keyboard />
        <div className="buttonWrapper">
          <ResetButton />
          <ThemeButton />
        </div>
      </div>
    </Container>
  );
}
