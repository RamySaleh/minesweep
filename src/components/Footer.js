import React from "react";
import { useSelector } from "react-redux";
import * as constants from "../constants";

const Footer = () => {
  const gameStatus = useSelector((state) => state.gameStatusReducer);

  if (gameStatus === constants.GameStatusWon) {
    return <text>You Won</text>;
  } else if (gameStatus === constants.GameStatusLost) {
    return <text>You Lost</text>;
  } else {
    return <text>Choose a preset to start</text>;
  }
};

export default Footer;
