import React from "react";
import useDataContext from "../contexts/DataContext";

const LanguageButton = () => {
  const { state, toggleLang } = useDataContext();

  return (
    <div className="flags" onClick={toggleLang}>
      <div className={`hungarian ${state.isEnglish ? "hideHu" : "showHu"}`} />
      <div className={`english ${state.isEnglish ? "showEn" : "hideEn"}`} />
    </div>
  );
};

export default LanguageButton;
