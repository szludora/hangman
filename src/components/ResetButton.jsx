import React from "react";
import Button from "react-bootstrap/Button";
import useDataContext from "../contexts/DataContext";

export default function ResetButton() {
  const { handleReset, handleStreakReset} = useDataContext();

  return (
    <>
    <Button variant="primary" className="resetButton" onClick={handleStreakReset}>
      Reset streak
    </Button>
    <Button variant="primary" className="resetButton" onClick={handleReset}>
      New word
    </Button>
    </>
  );
}
