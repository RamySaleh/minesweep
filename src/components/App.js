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
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
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
  const [showColorPicker, setShowColorPicker] = useState(false);

  const theme = useSelector((state) => state.themeChangeReducer);

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

  function _onChange(ev, checked) {
    setShowColorPicker(checked);
  }

  return (
    <div className="App">
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.fontColor,
          height: 50,
          backgroundColor: theme.color,
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
      <div
        style={{
          position: "absolute",
          top: 35,
          left: 60,
          color: theme.fontColor,
        }}
      >
        <Toggle
          label=""
          defaultChecked={false}
          onText=""
          offText=""
          inlineLabel
          onChange={_onChange}
        />
      </div>
      <Header onNewGameClick={handleNewGameClick}></Header>
      {showColorPicker && <ColorPickerExample color={theme.color} />}
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
