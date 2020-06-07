import React, { useState, useEffect } from "react";
import Box from "./Box";
import HeightIcon from "@material-ui/icons/Height";
import { useDispatch } from "react-redux";
import * as gameActions from "../actions/gameStatusActions";

const Game = ({ game }) => {
  const width = game.width;
  const height = game.height;
  const bombs = game.bombs;

  const [enabled, setEnabled] = useState(true);
  const [grid, setGrid] = useState([]);
  const [clickedBoxes, setClickedBoxes] = useState(1);

  const dispatch = useDispatch();

  const handleBoxClick = (isBomb) => {
    dispatch(gameActions.gamePlaying());
    if (isBomb) {
      setEnabled(false);
      dispatch(gameActions.gameLost());
    } else {
      setClickedBoxes(clickedBoxes + 1);
      if (clickedBoxes === game.width * game.height - game.bombs) {
        setEnabled(false);
        dispatch(gameActions.gameWon());
      }
    }
  };

  useEffect(() => {
    let grid = [];
    initBoxes(grid);
    initBombs(grid);
    setLabels(grid);
    setGrid(grid);
  }, []);

  const initBoxes = (grid) => {
    let i = 0;
    for (let h = 0; h < height; h++) {
      const row = [];
      for (let w = 0; w < width; w++) {
        row.push({
          id: i,
          value: "",
          isBomb: false,
        });
        i++;
      }
      grid.push(row);
    }
  };

  const initBombs = (grid) => {
    for (let i = 0; i < bombs; i++) {
      let randX = undefined;
      let randY = undefined;
      while (!randX || grid[randY][randX].isBomb) {
        randX = Math.floor(Math.random() * width);
        randY = Math.floor(Math.random() * height);
      }
      grid[randY][randX].isBomb = true;
    }
  };

  const setLabels = (grid) => {
    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let value = 0;
        if (!grid[h][w].isBomb) {
          // up
          if (h > 0 && grid[h - 1][w].isBomb) {
            value++;
          }
          // up left
          if (h > 0 && w > 0 && grid[h - 1][w - 1].isBomb) {
            value++;
          }
          // up right
          if (h > 0 && w < width - 1 && grid[h - 1][w + 1].isBomb) {
            value++;
          }
          // right
          if (w < width - 1 && grid[h][w + 1].isBomb) {
            value++;
          }
          // right down
          if (h < height - 1 && w < width - 1 && grid[h + 1][w + 1].isBomb) {
            value++;
          }
          // down
          if (h < height - 1 && grid[h + 1][w].isBomb) {
            value++;
          }
          // left down
          if (h < height - 1 && w > 0 && grid[h + 1][w - 1].isBomb) {
            value++;
          }
          // left
          if (w > 0 && grid[h][w - 1].isBomb) {
            value++;
          }
          grid[h][w].value = value > 0 ? value : "";
        }
      }
    }
  };

  const renderGame = () => {
    return grid.map((row) => {
      return (
        <div>
          {row.map((box) => {
            return (
              <Box
                title={box.value}
                key={box.id}
                isBomb={box.isBomb}
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
