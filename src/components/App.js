import "./css/App.css";

import * as Constants from "../constants";
import * as gameActions from "../actions/gameStatusActions";

import React, { useState } from "react";

import Collapse from "@material-ui/core/Collapse";
import ColorPickerExample from "./ColorPicker";
import Footer from "./Footer";
import Game from "./Game";
import Header from "./Header";
import IconButton from "@material-ui/core/IconButton";
import Pause from "@material-ui/icons/Pause";
import PlayArrow from "@material-ui/icons/PlayArrow";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const initialGame = {
    id: 0,
    width: 4,
    height: 6,
    bombs: 3,
    boxSize: 80,
  };

  const [game, setGame] = useState(initialGame);
  const [playMusic, setPlayMusic] = useState(false);
  const color = useSelector((state) => state.colorChangeReducer);

  const handleMusicClick = (play) => {
    setPlayMusic(play);
  };

  const dispatch = useDispatch();

  const handleNewGameClick = (preset) => {
    const newGame = {};
    newGame.id = game.id + 1;
    newGame.boxSize = game.boxSize;
    if (preset.type === Constants.GamePresetRegular) {
      newGame.width = initialGame.width * preset.level;
      newGame.height = initialGame.height * preset.level;
      newGame.bombs = initialGame.bombs * preset.level;
      newGame.boxSize = initialGame.boxSize / preset.level;
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
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#0E547B",
          height: 50,
          backgroundColor: color ? color : Constants.InitialColor,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        <img
          src={require("../mine.png")}
          alt="bomb"
          style={{ width: 20, height: 20, marginRight: 10 }}
        ></img>
        MINESWEEPER
      </p>
      <Header onNewGameClick={handleNewGameClick}></Header>
      <ColorPickerExample />
      <Collapse in={game.id > 0}>
        <Game key={game.id} game={game}></Game>
      </Collapse>
      <Footer />
      <ReactPlayer
        url="https://soundcloud.com/relaxdaily/relaxing-music-calm-studying-yoga"
        width={100}
        height={100}
        playing={playMusic}
        style={{ position: "absolute", bottom: 0, opacity: 0 }}
      />

      <IconButton
        color="primary"
        component="span"
        style={{ position: "absolute", top: 20, left: 0 }}
        onClick={() => {
          handleMusicClick(!playMusic);
        }}
      >
        {playMusic ? <Pause /> : <PlayArrow />}
      </IconButton>
    </div>
  );
}

export default App;
