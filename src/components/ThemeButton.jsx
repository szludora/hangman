import React from "react";
import Button from "react-bootstrap/Button";
import useDataContext from "../contexts/DataContext";
import ACTIONS from "./Actions";

export default function ThemeButton() {
  const { dispatch } = useDataContext();

  function toggleTheme() {
    dispatch({ type: ACTIONS.CHANGE_THEME });
  }

  return (
    <Button variant="primary" className="themeButton" onClick={toggleTheme}>
      Theme
    </Button>
  );
}
