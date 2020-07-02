import * as Constants from "../constants";
import * as themeActions from "../actions/themeChangeAction";

import React, { useState } from "react";

import { ColorPicker } from "office-ui-fabric-react/lib/index";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { useConstCallback } from "@uifabric/react-hooks";
import { useDispatch } from "react-redux";

const white = Constants.InitialColor;

const ColorPickerExample = () => {
  const [color, setColor] = useState(white);
  const [alphaType] = useState("none");

  const dispatch = useDispatch();

  const updateColor = useConstCallback((ev, colorObj) => {
    setColor(colorObj);
    dispatch(themeActions.colorChanged("#" + colorObj.hex));
  });

  return (
    <div className={classNames.wrapper} style={{ position: "absolute" }}>
      <ColorPicker
        color={color}
        onChange={updateColor}
        alphaType={alphaType}
        styles={colorPickerStyles}
        // The ColorPicker provides default English strings for visible text.
        // If your app is localized, you MUST provide the `strings` prop with localized strings.
        strings={{
          // By default, the sliders will use the text field labels as their aria labels.
          // If you'd like to provide more detailed instructions, you can use these props.
          alphaAriaLabel:
            "Alpha slider: Use left and right arrow keys to change value, hold shift for a larger jump",
          transparencyAriaLabel:
            "Transparency slider: Use left and right arrow keys to change value, hold shift for a larger jump",
          hueAriaLabel:
            "Hue slider: Use left and right arrow keys to change value, hold shift for a larger jump",
        }}
      />
    </div>
  );
};

const alphaOptions = [
  { key: "alpha", text: "Alpha" },
  { key: "transparency", text: "Transparency" },
  { key: "none", text: "None" },
];

const classNames = mergeStyleSets({
  wrapper: { display: "flex" },
  column2: { marginLeft: 10 },
});

const colorPickerStyles = {
  panel: { padding: 12 },
  root: {
    maxWidth: 300,
    minWidth: 200,
  },
  colorRectangle: { height: 168 },
};

export default ColorPickerExample;
