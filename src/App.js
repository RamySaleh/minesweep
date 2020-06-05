import React, { useState } from "react";
import Game from "./components/Game";
import "./App.css";
import Header from "./components/Header";

function App() {
  const initialGame = {
    id: 0,
    width: 4,
    height: 4,
    bombs: 5,
  };

  const [game, setGame] = useState(initialGame);

  const handleNewGameClick = (preset) => {
    const newGame = {};
    newGame.id = game.id + 1;
    if (preset.type === "1") {
      newGame.width = initialGame.width * preset.level;
      newGame.height = initialGame.height * preset.level;
      newGame.bombs = initialGame.bombs * preset.level;
    } else {
      newGame.width = preset.width;
      newGame.height = preset.height;
      newGame.bombs = preset.bombs;
    }
    setGame(newGame);
  };

  return (
    <div className="App">
      <p>Minesweep game</p>
      <Header onNewGameClick={handleNewGameClick}></Header>
      <Game key={game.id} game={game}></Game>
    </div>
  );
}

export default App;
