import React from "react";
import Button from "@material-ui/core/Button";

const Box = ({ value, isBomb, col, row, onClick, isEnabled }) => {
  const handleClick = () => {
    onClick({ isBomb, row, col, value });
  };
  return (
    <Button
      variant="outlined"
      disableElevation
      style={{
        width: 40,
        height: 40,
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
          style={{ width: 25, height: 25 }}
        ></img>
      )}
    </Button>
  );
};

export default Box;
