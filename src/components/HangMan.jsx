import React from "react";
import useDataContext from "../contexts/DataContext";

export default function HangMan() {
  const { images, mistake } = useDataContext();

  return (
    <div className="hangman">
      <img src={images[mistake-1]} alt={`Hangman stage ${mistake}`} />
    </div>
  );
}
