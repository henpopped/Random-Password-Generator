// App.js

import React from "react";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PasswordGenerator />
      </header>
    </div>
  );
}

export default App;
