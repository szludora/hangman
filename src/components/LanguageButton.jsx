import React from "react";
import useDataContext from "../contexts/DataContext";

export default function LanguageButton() {
  const { toggleLanguage, isEnglish } = useDataContext();

  return (
    <div className="flags" onClick={toggleLanguage}>
      <div className={`hungarian ${isEnglish ? "hideHu" : "showHu"}`} />
      <div className={`english ${isEnglish ? "showEn" : "hideEn"}`} />
    </div>
  );
}
