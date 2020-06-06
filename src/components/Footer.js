import React from "react";
import { useSelector } from "react-redux";
import * as constants from "../constants";

const Footer = () => {
  const gameStatus = useSelector((state) => state.gameStatusReducer);
  switch (gameStatus) {
    case constants.GameStatusStart:
      return <text>Click on a box to start</text>;
    case constants.GameStatusPlaying:
      return <text>Playing</text>;
    case constants.GameStatusWon:
      return <text>You Won</text>;
    case constants.GameStatusLost:
      return <text style={{ color: "red" }}>You Lost</text>;
    default:
      return <text>Choose a preset to start a new game</text>;
  }
};

export default Footer;
