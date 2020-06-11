import React, { useState, useEffect } from "react";
import Box from "./Box";
import HeightIcon from "@material-ui/icons/Height";
import { useDispatch } from "react-redux";
import * as gameActions from "../actions/gameStatusActions";
import * as gameLogic from "./logic/gameLogic";

const Game = ({ game }) => {
  const width = game.width;
  const height = game.height;
  const bombs = game.bombs;

  const [enabled, setEnabled] = useState(true);
  const [grid, setGrid] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [clickedBox, setClickedBox] = useState();

  const dispatch = useDispatch();

  const handleBoxClick = (box) => {
    setClickedBox(box);
    setClicks(clicks + 1);

    if (clicks === 1) {
      dispatch(gameActions.gamePlaying());
    }

    if (box.isBomb) {
      setEnabled(false);
      dispatch(gameActions.gameLost());
    }
  };

  useEffect(() => {
    if (clicks === 0) {
      // Initial game state
      let grid = gameLogic.initBoxes(width, height);
      setGrid(grid);
    } else if (clicks === 1) {
      // First click
      generateGame();
    } else {
      // Subsequent clicks
      floodOnClick();
    }
  }, [clicks, clickedBox]);

  const generateGame = () => {
    let grid = gameLogic.initBoxes(width, height);
    gameLogic.initBombs(grid, width, height, bombs, clickedBox);
    gameLogic.setLabels(grid, width, height);
    gameLogic.floodBoxes(grid, clickedBox);
    setGrid(grid);
  };

  const floodOnClick = () => {
    let newGrid = gameLogic.cloneGrid(grid);

    if (clickedBox.value === "") {
      gameLogic.floodBoxes(newGrid, clickedBox);
    } else {
      gameLogic.disableBox(newGrid, clickedBox.row, clickedBox.col);
    }

    setGrid(newGrid);

    if (enabled) {
      if (gameLogic.checkIfGameWon(grid, game)) {
        setEnabled(false);
        dispatch(gameActions.gameWon());
      }
    }
  };

  const renderGame = () => {
    let rowCounter = 0;
    return grid.map((row) => {
      return (
        <div key={rowCounter++}>
          {row.map((box) => {
            return (
              <Box
                value={box.value}
                key={box.id}
                row={box.row}
                col={box.col}
                boxSize={game.boxSize}
                isBomb={box.isBomb}
                isEnabled={box.isEnabled}
                onClick={handleBoxClick}
              ></Box>
            );
          })}
        </div>
      );
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", margin: 10 }}>
        <HeightIcon></HeightIcon>
        <text style={{ marginLeft: 5 }}>{game.height}</text>
        <HeightIcon
          style={{ transform: "rotate(90deg)", marginLeft: 20 }}
        ></HeightIcon>
        <text style={{ marginLeft: 5 }}>{game.width}</text>
        <img
          src={require("../mine.png")}
          alt="bomb"
          style={{ width: 20, height: 20, marginLeft: 20 }}
        ></img>
        <text style={{ marginLeft: 5 }}>{game.bombs}</text>
      </div>
      <div style={enabled ? {} : { pointerEvents: "none", opacity: "0.6" }}>
        {renderGame()}
      </div>
    </>
  );
};

export default Game;
