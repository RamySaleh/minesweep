import React, { useState } from "react";

const Header = (props) => {
  return (
    <div style={{ margin: 10 }}>
      <button onClick={props.onNewGameClick}>New Game</button>
    </div>
  );
};

export default Header;
