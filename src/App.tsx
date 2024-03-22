/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import Logo from "./Logo";
import "./App.css";

function App() {
  console.log("in pop up");
  alert("in pop up");
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" id="App-logo" title="React logo" />
        <p>!!!</p>

      </header>
    </div>
  );
}

export default App;
