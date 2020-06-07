import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const Box = (props) => {
  const [enabled, setEnabled] = useState(true);

  const handleClick = () => {
    setEnabled(false);
    props.onClick(props.isBomb);
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
        backgroundColor: enabled ? "#8FCEEF" : "#6FC2EE",
      }}
      onClick={handleClick}
      disabled={!enabled}
    >
      {!enabled && props.title}
      {props.isBomb && !enabled && (
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
