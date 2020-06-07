import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import * as constants from "../constants";

const Footer = () => {
  const gameStatus = useSelector((state) => state.gameStatusReducer);
  const [timer, setTimer] = useState(0);
  const [open, setOpen] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (gameStatus === constants.GameStatusStart) {
      setTimer(0);
      setOpen(false);
    } else if (gameStatus === constants.GameStatusPlaying) {
      setOpen(false);
      setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
    } else if (
      gameStatus === constants.GameStatusLost ||
      gameStatus === constants.GameStatusWon
    ) {
      setOpen(true);
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

  const isGameWon = () => {
    return gameStatus === constants.GameStatusWon;
  };

  return (
    <div>
      <text style={{ color: textColor() }}>{getText()}</text>
      {showTimer() && (
        <text style={{ marginLeft: 20 }}>{formatTime(timer)}</text>
      )}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isGameWon() ? "success" : "error"}
        >
          {getText()}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Footer;
