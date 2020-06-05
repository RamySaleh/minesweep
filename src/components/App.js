import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Game from "./Game";
import "../App.css";
import * as Constants from "../constants";

function App() {
  const initialGame = {
    id: 0,
    width: 4,
    height: 4,
    bombs: 5,
  };

  const [game, setGame] = useState(initialGame);
  const [gameStatus, setGameStatus] = useState(Constants.GameStatusInitial);

  const handleNewGameClick = (preset) => {
    const newGame = {};
    newGame.id = game.id + 1;
    if (preset.type === Constants.GamePresetRegular) {
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

  const handleEndGame = (isGameWon) => {
    if (isGameWon) {
      setGameStatus(Constants.GameStatusWon);
    } else {
      setGameStatus(Constants.GameStatusLost);
    }
  };

  return (
    <div className="App">
      <p>Minesweep game</p>
      <Header onNewGameClick={handleNewGameClick}></Header>
      <Game key={game.id} game={game} onGameEnd={handleEndGame}></Game>
      <Footer gameStatus={gameStatus}></Footer>
    </div>
  );
}

export default App;
