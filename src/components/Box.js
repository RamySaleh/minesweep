import React from "react";
import Button from "@material-ui/core/Button";

const Box = ({ value, isBomb, col, row, onClick, isEnabled, boxSize }) => {
  const handleClick = () => {
    onClick({ isBomb, row, col, value });
  };
  return (
    <Button
      variant="outlined"
      disableElevation
      style={{
        width: boxSize,
        height: boxSize,
        minWidth: boxSize,
        minHeight: boxSize,
        verticalAlign: "top",
        color: "#0E547B",
        backgroundColor: isEnabled ? "#8FCEEF" : "#6FC2EE",
      }}
      onClick={handleClick}
      disabled={!isEnabled}
    >
      {!isEnabled && value}
      {isBomb && !isEnabled && (
        <img
          src={require("../mine.png")}
          alt="bomb"
          style={{
            maxWidth: 30,
            maxHeight: 30,
            width: boxSize * 0.5,
            height: boxSize * 0.5,
          }}
        ></img>
      )}
    </Button>
  );
};

export default Box;
