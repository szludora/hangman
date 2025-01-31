import React, {
  useRef,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import hm0 from "../assets/imgs/hangman/0.png";
import hm1 from "../assets/imgs/hangman/1.png";
import hm2 from "../assets/imgs/hangman/2.png";
import hm3 from "../assets/imgs/hangman/3.png";
import hm4 from "../assets/imgs/hangman/4.png";
import hm5 from "../assets/imgs/hangman/5.png";
import hm6 from "../assets/imgs/hangman/6.png";
import hm7 from "../assets/imgs/hangman/7.png";
import hm8 from "../assets/imgs/hangman/8.png";
import hm9 from "../assets/imgs/hangman/9.png";
import hm10 from "../assets/imgs/hangman/10.png";
import hm11 from "../assets/imgs/hangman/11.png";
import hm12 from "../assets/imgs/hangman/12.png";
import words from "../assets/words.json";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [mistake, setMistake] = useState(1);
  const [answer, setAnswer] = useState("");
  const [correctGuess, setCorrectGuess] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const inputRef = useRef(null);
  const [remainingTries, setRemainingTries] = useState(12);
  const [streak, setStreak] = useState(0);
  const [theme, setTheme] = useState(0);
  const ansLetterKeys = useRef([]);
  const keyboardKeys = useRef([]);
  const themeClasses = ["green", "red", "lightpink"];
  const [clickCounter, setClickCounter] = useState(0);

  const [end, setEnd] = useState(false);
  const [win, setWin] = useState(false);
  const [value, setValue] = useState("");
  const updatedCorrectGuess = [];
  const alphabet = "qwertzuiopőúasdfghjkléáűíyxcvbnmöüó".split("");

  let answerLetters = answer.split("");
  function changeTheme() {
    if (theme == 2) {
      setTheme(0);
    } else {
      setTheme(theme + 1);
    }
  }

  useEffect(() => {
    console.log(answer);

    if (mistake == images.length) {
      setEnd(true);
      setWin(false);
      setStreak(0);

      for (let i = 0; i < answerLetters.length; i++) {
        if (answerLetters[i] != " " && !ansLetterKeys.current[i].value) {
          ansLetterKeys.current[i].value = answerLetters[i];
          ansLetterKeys.current[i].classList.add("notGuessed");
        }
      }
    }
  }, [end, remainingTries]);

  const images = [
    hm0,
    hm1,
    hm2,
    hm3,
    hm4,
    hm5,
    hm6,
    hm7,
    hm8,
    hm9,
    hm10,
    hm11,
    hm12,
  ];

  function resetGame() {
    setMistake(1);
    setCorrectGuess([]);
    setGuessed([]);
    setRemainingTries(12);
    setEnd(false);
    setWin(false);
    setValue("");
    setClickCounter(0);

    const randomWord =
      words.words[Math.floor(Math.random() * words.words.length)];
    setAnswer(randomWord);
    answerLetters = answer.split("");

    for (let i = 0; i < answerLetters.length; i++) {
      if (answerLetters[i] !== " ") {
        ansLetterKeys.current[i].value = "";
        ansLetterKeys.current[i].classList.remove("notGuessed");
      }
    }
  }

  const handleReset = () => {
    if (!win && mistake < 13 && streak > 0) {
      if (confirm("Ha nem teljesíted ezt a szót, elveszíted a streaked.")) {
        setStreak(0);
        resetGame();
      }
    } else {
      resetGame();
    }
  };

  const increaseMistakeNumber = () => {
    if (mistake != 13) {
      setMistake(mistake + 1);
      setRemainingTries((prev) => prev - 1);
    }
  };

  const handleKeyClick = (key) => {
    if (mistake != 13 && !end && !guessed.includes(key)) {
      setGuessed((prevGuessed) => [...prevGuessed, key]);
      if (answerLetters.includes(key)) {
        for (let i = 0; i < answerLetters.length; i++) {
          if (answerLetters[i] == key) {
            ansLetterKeys.current[i].value = key;
            let prev = correctGuess;
            prev.push(key);
            setCorrectGuess(prev);
          }
        }
        setClickCounter(clickCounter + 1);
      } else {
        increaseMistakeNumber();
        setClickCounter(clickCounter + 1);
      }

      if (
        answerLetters
          .filter((letter) => letter !== " " && letter !== "-")
          .every((letter) => correctGuess.includes(letter))
      ) {
        setEnd(true);
        setWin(true);
        setStreak(streak + 1);
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        mistake,
        setMistake,
        answer,
        setAnswer,
        correctGuess,
        guessed,
        setGuessed,
        remainingTries,
        end,
        setEnd,
        win,
        setWin,
        value,
        setValue,
        images,
        updatedCorrectGuess,
        answerLetters,
        handleReset,
        increaseMistakeNumber,
        words,
        inputRef,
        handleKeyClick,
        alphabet,
        clickCounter,
        themeClasses,
        changeTheme,
        theme,
        streak,
        setStreak,
        ansLetterKeys,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default function useDataContext() {
  return useContext(DataContext);
}
