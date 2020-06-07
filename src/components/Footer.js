import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as constants from "../constants";

const Footer = () => {
  const gameStatus = useSelector((state) => state.gameStatusReducer);

  const getText = () => {
    switch (gameStatus) {
      case constants.GameStatusStart:
        return "Click on a box to start";
      case constants.GameStatusPlaying:
        return "Playing";
      case constants.GameStatusWon:
        return "You Won";
      case constants.GameStatusLost:
        return "You Lost";
      default:
        return "Choose a preset to start a new game";
    }
  };

  return (
    <div>
      <text>{getText()}</text>
      <text></text>
    </div>
  );
};

export default Footer;
