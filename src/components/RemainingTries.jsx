import React from "react";

import useDataContext from "../contexts/DataContext";

export default function RemainingTries() {
  const { remainingTries } = useDataContext();


  return <div className="remainingtries">{remainingTries}</div>;
}
