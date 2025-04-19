import React from "react";
import Family from "./prop_drilling/Family";
import "./App.css";
import { FamilyContext } from "./prop_drilling/FamilyContext";

function App() {
  const familyMessage = {
    familyName: "Shen",
  };

  return (
    <>
      <FamilyContext.Provider value={familyMessage}>
        <Family />;
      </FamilyContext.Provider>
    </>
  );
}

export default App;
