import React, { useEffect } from "react";
import Result from "../components/Result";
import AnswerLetters from "../components/AnswerLetters";
import HangMan from "../components/HangMan";
import ResetButton from "../components/ResetButton";
import ThemeButton from "../components/ThemeButton";
import useDataContext from "../contexts/DataContext";
import Keyboard from "./Keyboard";
import { Container } from "react-bootstrap";
import KeyboardListener from "./KeyboardListener";
import LanguageButton from "./LanguageButton";

export default function Game() {
  const { state } = useDataContext();
  
  return (
    <Container fluid className={`gameContainer ${state.theme}`}>
      <div className="game">
        <LanguageButton />
        <Result />
        <HangMan />
        <AnswerLetters />
        <Keyboard />
        <KeyboardListener />
        <div className="buttonWrapper">
          <ResetButton />
          <ThemeButton />
        </div>
      </div>
    </Container>
  );
}
