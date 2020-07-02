import Button from "@material-ui/core/Button";
import { PrimaryButton } from "@fluentui/react";
import React from "react";
import { useSelector } from "react-redux";

const Box = ({ value, isBomb, col, row, onClick, isEnabled, boxSize }) => {
  const handleClick = () => {
    onClick({ isBomb, row, col, value });
  };
  const theme = useSelector((state) => state.themeChangeReducer);

  return (
    <PrimaryButton
      style={{
        width: boxSize,
        height: boxSize,
        minWidth: boxSize,
        minHeight: boxSize,
        verticalAlign: "top",
        borderColor: "#ffffff",
        color: theme.fontColor ? theme.fontColor : "#0E547B",
        //color: theme.color ? theme.color : "#0E547B",
        //backgroundColor: isEnabled ? "#8FCEEF" : "#6FC2EE",
        backgroundColor: isEnabled
          ? theme.color
            ? theme.color
            : "#8FCEEF"
          : theme.disabledColor
          ? theme.disabledColor
          : "#6FC2EE",
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
    </PrimaryButton>
  );
};

export default Box;
