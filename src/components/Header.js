import React, { useState } from "react";

const Header = (props) => {
  const [width, setWidth] = useState();
  const [height, setheight] = useState();
  const [bombs, setBombs] = useState();

  const handleTextChange = (value, handler) => {
    handler(value);
  };

  return (
    <div style={{ margin: 10 }}>
      <button
        onClick={() => props.onNewGameClick({ type: "1", level: 1 })}
        style={{ marginRight: 10 }}
      >
        Beginner
      </button>
      <button
        onClick={() => props.onNewGameClick({ type: "1", level: 2 })}
        style={{ marginRight: 10 }}
      >
        Intermediate
      </button>
      <button
        onClick={() => props.onNewGameClick({ type: "1", level: 3 })}
        style={{ marginRight: 10 }}
      >
        Expert
      </button>
      <button onClick={() => props.onNewGameClick({ type: "1", level: 3 })}>
        Custom
      </button>
      <div style={{ flexDirection: "row", flex: 1 }}>
        <div>
          <text>w</text>
          <input
            style={{ width: 40 }}
            text={width}
            onChange={({ target }) => handleTextChange(target.value, setWidth)}
          ></input>
        </div>
        <div>
          <text>h</text>
          <input
            style={{ width: 40 }}
            text={height}
            onChange={({ target }) => handleTextChange(target.value, setheight)}
          ></input>
        </div>
        <div>
          <text>b</text>
          <input
            style={{ width: 40 }}
            text={bombs}
            onChange={({ target }) => handleTextChange(target.value, setBombs)}
          ></input>
        </div>
        <div>
          <button
            onClick={() =>
              props.onNewGameClick({ type: "2", width, height, bombs })
            }
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
