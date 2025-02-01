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
        streak: state.streak,
        isEnglish: !state.isEnglish,
        currentLangWords: currentLangWords,
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
        streak: state.streak,
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
  const [isMobile, setIsMobile] = useState(false);

  const alphabet = "qwertzuiopőúasdfghjkléáűíyxcvbnmöüó".split("");

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileNow =
        window.innerWidth <= 768 
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
    focus();
    if (state.mistake === images.length-1) {
      dispatch({ type: ACTIONS.LOSEGAME });
    }
  }, [state.remainingTries, state.end, state.isEnglish]);

  const toggleLang = () => {
    dispatch({ type: ACTIONS.TOGGLE_LANG });
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
        dispatch({
          type: ACTIONS.RESET_GAME,
        });
      }
    } else {
      dispatch({
        type: ACTIONS.RESET_GAME,
      });
    }
  };

  const handleKeyClick = (key) => {
    focus();

    if (state.mistake !== 13 && !state.end && !state.guessed.includes(key) && alphabet.includes(key)) {
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
        alphabet,
        themeClasses,
        images,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default function useDataContext() {
  return useContext(DataContext);
}
