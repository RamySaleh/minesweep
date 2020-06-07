import React, { useState } from "react";
import HeightIcon from "@material-ui/icons/Height";
import * as Constants from "../constants";

const Header = (props) => {
  const [width, setWidth] = useState();
  const [height, setheight] = useState();
  const [bombs, setBombs] = useState();
  const [isCustom, setIsCustom] = useState();

  const handleTextChange = (value, handler) => {
    handler(value);
  };

  const handleNewGameButtonClick = (preset) => {
    props.onNewGameClick(preset);
    setIsCustom(false);
  };

  return (
    <div
      style={{
        margin: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <button
          onClick={() =>
            handleNewGameButtonClick({
              type: Constants.GamePresetRegular,
              level: 1,
            })
          }
          style={{ marginRight: 10 }}
        >
          Beginner
        </button>
        <button
          onClick={() =>
            handleNewGameButtonClick({
              type: Constants.GamePresetRegular,
              level: 2,
            })
          }
          style={{ marginRight: 10 }}
        >
          Intermediate
        </button>
        <button
          onClick={() =>
            handleNewGameButtonClick({
              type: Constants.GamePresetRegular,
              level: 3,
            })
          }
          style={{ marginRight: 10 }}
        >
          Expert
        </button>
        <button
          onClick={() => {
            setIsCustom(true);
          }}
        >
          Custom
        </button>
      </div>
      {isCustom && (
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            width: 300,
            margin: 10,
          }}
        >
          <HeightIcon></HeightIcon>
          <input
            type="number"
            style={{ width: 40 }}
            text={width}
            onChange={({ target }) => handleTextChange(target.value, setWidth)}
          ></input>

          <HeightIcon style={{ transform: "rotate(90deg)" }}></HeightIcon>
          <input
            type="number"
            style={{ width: 40 }}
            text={height}
            onChange={({ target }) => handleTextChange(target.value, setheight)}
          ></input>

          <img
            src={require("../mine.png")}
            alt="bomb"
            style={{ width: 20, height: 20 }}
          ></img>
          <input
            type="number"
            style={{ width: 40 }}
            text={bombs}
            onChange={({ target }) => handleTextChange(target.value, setBombs)}
          ></input>

          <button
            onClick={() =>
              handleNewGameButtonClick({
                type: Constants.GamePresetCustom,
                width,
                height,
                bombs,
              })
            }
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
