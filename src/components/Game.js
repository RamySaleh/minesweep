import React from "react";
import Box from "./Box";
import { Container, Grid } from "@material-ui/core";

const Game = () => {
  const width = 3;
  const height = 4;
  const bombs = 5;
  const boxes = Array(width * height);
  const grid = [];

  const initBoxes = () => {
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

  const initBombs = () => {
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

  const setLabels = () => {
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
          grid[h][w].value = value;
        }
      }
    }
  };

  const buildGame = () => {
    initBoxes();
    initBombs();
    setLabels();

    return grid.map((row) => {
      return (
        <div>
          {row.map((box) => {
            return (
              <Box title={box.value} key={box.id} isBomb={box.isBomb}></Box>
            );
          })}
        </div>
      );
    });
  };

  return buildGame();
};

export default Game;
