import React from "react";
import * as Constants from "../constants";

const Footer = ({ gameStatus }) => {
  if (gameStatus === Constants.GameStatusInitial) {
    return <text>Choose a preset to start</text>;
  } else if (gameStatus === Constants.GameStatusWon) {
    return <text>You Won</text>;
  } else if (gameStatus === Constants.GameStatusLost) {
    return <text>You Lost</text>;
  }
};

export default Footer;
