import React, { useState } from "react";

const Box = (props) => {
  const [enabled, setEnabled] = useState(true);

  const handleClick = () => {
    setEnabled(false);
    props.onClick(props.isBomb);
  };
  return (
    <button
      style={{ width: 40, height: 40 }}
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
    </button>
  );
};

export default Box;
