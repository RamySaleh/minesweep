import * as Constants from "../constants";

import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import HeightIcon from "@material-ui/icons/Height";
import { useSelector } from "react-redux";

const Header = (props) => {
  const [width, setWidth] = useState();
  const [height, setheight] = useState();
  const [bombs, setBombs] = useState();
  const [isCustom, setIsCustom] = useState();

  const theme = useSelector((state) => state.themeChangeReducer);

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
        <Button
          variant="outlined"
          onClick={() =>
            handleNewGameButtonClick({
              type: Constants.GamePresetRegular,
              level: 1,
            })
          }
          style={{
            marginRight: 10,
            backgroundColor: theme.color ? theme.color : "#6FC2EE",
          }}
        >
          Easy
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            handleNewGameButtonClick({
              type: Constants.GamePresetRegular,
              level: 2,
            })
          }
          style={{
            marginRight: 10,
            backgroundColor: theme.color ? theme.color : "#6FC2EE",
          }}
        >
          Medium
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            handleNewGameButtonClick({
              type: Constants.GamePresetRegular,
              level: 3,
            })
          }
          style={{
            marginRight: 10,
            backgroundColor: theme.color ? theme.color : "#6FC2EE",
          }}
        >
          Hard
        </Button>
        <Button
          variant="outlined"
          style={{ backgroundColor: theme.color ? theme.color : "#6FC2EE" }}
          onClick={() => {
            setIsCustom(true);
          }}
        >
          Custom
        </Button>
      </div>
      {isCustom && (
        <div
          data-testid="custom-panel"
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
            min={1}
            onChange={({ target }) => handleTextChange(target.value, setWidth)}
          ></input>

          <HeightIcon style={{ transform: "rotate(90deg)" }}></HeightIcon>
          <input
            type="number"
            style={{ width: 40 }}
            text={height}
            min={1}
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
            min={1}
            max={(width * height) / 2}
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
