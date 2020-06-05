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
        isBomb: false,
      };
    }
  };
  const initBombs = () => {
    for (let i = 0; i < bombs; i++) {
      let random = undefined;
      while (!random || boxes[random].isBomb) {
        random = Math.floor(Math.random() * boxes.length);
      }
      boxes[random].isBomb = true;
    }
  };

  const buildGame = () => {
    initBoxes();
    initBombs();

    return (
      <Container style={{ width: 300 }}>
        <Grid container direction="row">
          {boxes.map((box) => {
            return (
              <Grid box xs="3">
                <Box title={box.value} key={box.id} isBomb={box.isBomb}></Box>
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
