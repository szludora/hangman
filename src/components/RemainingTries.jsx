import React from "react";

import useDataContext from "../contexts/DataContext";

export default function RemainingTries() {
  const { state } = useDataContext();


  return <div className="remainingtries">{state.remainingTries}</div>;
}
