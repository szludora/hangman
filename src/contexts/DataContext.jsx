import React, {
  useRef,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import images from "../components/Images";
import words from "../assets/words.json";
import ACTIONS from "../components/Actions";

const DataContext = createContext();

const englishWords = words.englishWords;
const hungarianWords = words.words;
const themeClasses = ["green", "red", "lightpink"];
const hungarianKeyboard = "qwertzuiopőúasdfghjkléáűíyxcvbnmöüó".split("");
const englishKeyboard = "qwertyuiopasdfghjklzxcvbnm".split("");

const initialState = {
  end: false,
  win: false,
  mistake: 0,
  answer: "",
  guessed: [],
  correctGuess: [],
  remainingTries: 12,
  streak: 0,
  themeIndex: 0,
  theme: themeClasses[0],
  value: "",
  isEnglish: false,
  currentLangWords: hungarianWords,
  alphabet: hungarianKeyboard,
};

const getRandomWord = (langWords) => {
  return langWords[Math.floor(Math.random() * langWords.length)];
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_LANG: {
      const currentLangWords = state.isEnglish ? hungarianWords : englishWords;
      return {
        ...initialState,
        streak: action.payload ? 0 : state.streak,
        isEnglish: !state.isEnglish,
        currentLangWords: currentLangWords,
        alphabet: !state.isEnglish ? englishKeyboard : hungarianKeyboard,
        answer: getRandomWord(currentLangWords),
      };
    }
    case ACTIONS.CHANGE_THEME: {
      const nextThemeIndex = (state.themeIndex + 1) % themeClasses.length;
      return {
        ...state,
        themeIndex: nextThemeIndex,
        theme: themeClasses[nextThemeIndex],
      };
    }
    case ACTIONS.RESET_GAME:
      return {
        ...initialState,
        answer: getRandomWord(state.currentLangWords),
        isEnglish: state.isEnglish,
        currentLangWords: state.currentLangWords,
        alphabet: state.alphabet,
        streak: action.payload ? 0 : state.streak,
      };
    case ACTIONS.MAKE_GUESS:
      return {
        ...state,
        guessed: [...state.guessed, action.payload],
        correctGuess: action.isCorrect
          ? [...state.correctGuess, action.payload]
          : state.correctGuess,
        mistake: action.isCorrect ? state.mistake : state.mistake + 1,
        remainingTries: action.isCorrect
          ? state.remainingTries
          : state.remainingTries - 1,
      };
    case ACTIONS.SET_ANSWER:
      return { ...state, answer: action.payload };
    case ACTIONS.WINGAME:
      return { ...state, end: true, win: true, streak: state.streak + 1 };
    case ACTIONS.LOSEGAME:
      return { ...state, end: true, win: false };
    default:
      return state;
  }
}

export const DataProvider = ({ children }) => {
  const inputRef = useRef();
  const keyboard = useRef([]);
  const ansLettersKeys = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const answerLetters = state.answer ? state.answer.split("") : [];

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileNow = window.innerWidth <= 768;
      //|| /Mobi|Android/i.test(navigator.userAgent);
      setIsMobile(isMobileNow);
    };

    checkIfMobile();
    focus();

    const resizeListener = () => checkIfMobile();
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      focus();
    }
  }, [isMobile]);

  useEffect(() => {
    if (state.answer === "") {
      const randomWord = getRandomWord(state.currentLangWords);
      dispatch({
        type: ACTIONS.SET_ANSWER,
        payload: randomWord,
      });
    }
  }, []);

  useEffect(() => {
    if (state.end) {
      answerLetters.forEach((letter, i) => {
        if (
          letter !== " " &&
          letter !== "-" &&
          !state.correctGuess.includes(letter)
        ) {
          if (ansLettersKeys.current[i]) {
            ansLettersKeys.current[i].value = letter;
            ansLettersKeys.current[i].classList.add("notGuessed");
          }
        }
      });
    } else if (!state.end && state.mistake == 0) {
      ansLettersKeys.current.forEach((input) => {
        if (input) {
          input.classList.remove("notGuessed");
          input.value = "";
        }
      });
    }
    if (state.mistake === images.length - 1) {
      dispatch({ type: ACTIONS.LOSEGAME });
    }
  }, [
    state.end,
    state.guessed,
    state.isEnglish,
    state.answer,
    state.correctGuess,
    state.ansLettersKeys,
  ]);

  const toggleLang = () => {
    const message = state.isEnglish
      ? "Are you sure you want to switch to Hungarian?"
      : "Biztos vagy benne, hogy angolra akarsz váltani?";
    if (state.streak > 0) {
      if (confirm(message)) {
        dispatch({ type: ACTIONS.TOGGLE_LANG, payload: true });
      }
    } else {
      dispatch({ type: ACTIONS.TOGGLE_LANG });
    }
  };

  function focus() {
    if (!isMobile) {
      inputRef.current.focus();
      inputRef.current.select();
    } else {
      inputRef.current.blur();
    }
  }

  const handleReset = () => {
    if (!state.win && state.mistake < 13 && state.streak > 0) {
      const message = state.isEnglish
        ? "If you don't complete this word, you will lose your streak."
        : "Ha nem teljesíted ezt a szót, elveszíted a streaked.";
      if (confirm(message)) {
        dispatch({ type: ACTIONS.RESET_GAME, payload: true });
      }
    } else {
      dispatch({ type: ACTIONS.RESET_GAME });
    }
  };

  const handleKeyClick = (key) => {
    focus();

    if (state.mistake !== 13 && !state.end && !state.guessed.includes(key)) {
      const isCorrect = state.answer
        .replace(/[\s–]/g, "")
        .split("")
        .includes(key);
      dispatch({ type: ACTIONS.MAKE_GUESS, payload: key, isCorrect });

      if (!isCorrect) {
        dispatch({ type: ACTIONS.INCREASE_MISTAKE });
      }

      const allGuessed = state.answer
        .split("")
        .filter((letter) => letter !== " " && letter !== "–")
        .every((letter) => [...state.correctGuess, key].includes(letter));

      if (allGuessed) {
        dispatch({ type: ACTIONS.WINGAME });
      }
    }
    console.log(state.answer);
  };

  return (
    <DataContext.Provider
      value={{
        state,
        answer: state.answer,
        handleReset,
        handleKeyClick,
        toggleLang,
        focus,
        dispatch,
        inputRef,
        keyboard,
        themeClasses,
        images,
        ansLettersKeys,
        answerLetters,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default function useDataContext() {
  return useContext(DataContext);
}
