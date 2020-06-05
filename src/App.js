import React, { useState } from "react";
import Game from "./components/Game";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [gameId, setGameId] = useState(0);

  const handleNewGameClick = () => {
    setGameId(gameId + 1);
  };

  return (
    <div className="App">
      <p>Minesweep game</p>
      <Header onNewGameClick={handleNewGameClick}></Header>
      <Game key={gameId}></Game>
    </div>
  );
}

export default App;
