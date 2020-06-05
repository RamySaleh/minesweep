import React from "react";
import Box from "./Box";
import { Container, Grid } from "@material-ui/core";

const Game = () => {
  const width = 3;
  const height = 4;
  const bombs = 5;
  //const boxes = [];
  const boxes = Array(width * height);

  const initBoxes = () => {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i] = {
        id: i,
        value: "",
      };
    }
  };
  const initBombs = () => {
    for (let i = 0; i < bombs; i++) {
      let random = undefined;
      while (!random || boxes[random].value === "b") {
        random = Math.floor(Math.random() * boxes.length);
      }
      boxes[random].value = "b";
    }
  };

  const initUIGrid = () => {
    const items = [];
    let row = [];
    let i = 0;
    while (i < boxes.length) {
      if ((i % width == 0) & (i != 0)) {
        items.push(row);
        row = [];
      }
      row.push(boxes[i]);
      i++;
    }
    items.push(row);
    return items;
  };

  const buildGame = () => {
    initBoxes();
    initBombs();
    const items = initUIGrid();

    return (
      <Container style={{ display: "block" }}>
        <Grid container direction="row" spacing={0} justify="flex-start">
          {boxes.map((item) => {
            return (
              <Grid item xs="3">
                <Box title={item.value} key={item.id}></Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  };

  return buildGame();
};

export default Game;
