import React from "react";
import Button from "react-bootstrap/Button";
import useDataContext from "../contexts/DataContext";

export default function ThemeButton() {

    const {changeTheme} =useDataContext();


  return (
    <Button variant="primary" className="themeButton" onClick={changeTheme}>
      Theme
    </Button>
  );
}
