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
  const [usedBoxes, setUsedBoxes] = useState(1);
  const [clickedBox, setClickedBox] = useState();

  const dispatch = useDispatch();

  const handleBoxClick = (box) => {
    setClickedBox({ ...box, isEnabled: false });
    if (usedBoxes === 1) {
      dispatch(gameActions.gamePlaying());
    }

    if (box.isBomb) {
      setEnabled(false);
      dispatch(gameActions.gameLost());
    } else {
      setUsedBoxes(usedBoxes + 1);
      if (usedBoxes === game.width * game.height - game.bombs) {
        setEnabled(false);
        dispatch(gameActions.gameWon());
      }
    }
  };

  useEffect(() => {
    if (usedBoxes === 1) {
      // initial game state
      let grid = [];
      initBoxes(grid);
      setGrid(grid);
    } else if (usedBoxes === 2) {
      // generate the game on first click
      let grid = [];
      initBoxes(grid);
      initBombs(grid);
      setLabels(grid);
      flood(grid);
      setGrid(grid);
    } else {
      // propagate the empty boxes
      let newGrid = grid.map((row) => {
        return row.map((box) => {
          return box;
        });
      });

      if (clickedBox.value === "") {
        flood(newGrid);
      } else {
        newGrid[clickedBox.row][clickedBox.col].isEnabled = false;
      }
      setGrid(newGrid);
    }
  }, [usedBoxes, clickedBox]);

  const initBoxes = (grid) => {
    let i = 0;
    for (let h = 0; h < height; h++) {
      const row = [];
      for (let w = 0; w < width; w++) {
        row.push({
          id: i,
          row: h,
          col: w,
          value: "",
          isEnabled: true,
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
      while (
        !randX ||
        grid[randY][randX].isBomb ||
        (randX === clickedBox.col && randY === clickedBox.row)
      ) {
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

  const flood = (grid) => {
    dfs(grid, clickedBox.row, clickedBox.col);
    grid[clickedBox.row][clickedBox.col].isEnabled = false;
  };

  const dfs = (grid, r, c) => {
    if (
      r >= grid.length ||
      r < 0 ||
      c < 0 ||
      c >= grid[0].length ||
      !grid[r][c].isEnabled
    ) {
      return;
    }

    if (grid[r][c].value !== "") {
      grid[r][c].isEnabled = false;
      return;
    }

    grid[r][c].isEnabled = false;
    dfs(grid, r, c - 1);
    dfs(grid, r, c + 1);
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
  };

  const renderGame = () => {
    return grid.map((row) => {
      return (
        <div>
          {row.map((box) => {
            return (
              <Box
                value={box.value}
                key={box.id}
                row={box.row}
                col={box.col}
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
