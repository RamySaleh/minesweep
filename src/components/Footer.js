import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as constants from "../constants";

const Footer = () => {
  const gameStatus = useSelector((state) => state.gameStatusReducer);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameStatus === constants.GameStatusStart) {
      setTimer(0);
    } else if (gameStatus === constants.GameStatusPlaying) {
      setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
    }
  }, [timer, gameStatus]);

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

  const showTimer = () => {
    return [
      constants.GameStatusPlaying,
      constants.GameStatusLost,
      constants.GameStatusWon,
    ].includes(gameStatus);
  };

  const formatTime = (seconds) => {
    return [parseInt((seconds / 60) % 60), parseInt(seconds % 60)]
      .join(":")
      .replace(/\b(\d)\b/g, "0$1");
  };

  const textColor = () => {
    switch (gameStatus) {
      case constants.GameStatusWon:
        return "Green";
      case constants.GameStatusLost:
        return "Red";
      default:
        return "Black";
    }
  };

  return (
    <div>
      <text style={{ color: textColor() }}>{getText()}</text>
      {showTimer() && (
        <text style={{ marginLeft: 20 }}>{formatTime(timer)}</text>
      )}
    </div>
  );
};

export default Footer;
