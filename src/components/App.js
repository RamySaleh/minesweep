import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Game from "./Game";
import Collapse from "@material-ui/core/Collapse";
import { useDispatch } from "react-redux";
import * as gameActions from "../actions/gameStatusActions";
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
  const dispatch = useDispatch();

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
    dispatch(gameActions.gameStart());
  };

  return (
    <div className="App">
      <p>Minesweep game</p>
      <Header onNewGameClick={handleNewGameClick}></Header>
      <Collapse in={game.id > 0}>
        <Game key={game.id} game={game}></Game>
      </Collapse>
      <Footer></Footer>
    </div>
  );
}

export default App;
