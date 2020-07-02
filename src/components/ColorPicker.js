import * as themeActions from "../actions/themeChangeAction";

import React, { useState } from "react";

import { ColorPicker } from "office-ui-fabric-react/lib/index";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { useConstCallback } from "@uifabric/react-hooks";
import { useDispatch } from "react-redux";

const ColorPickerExample = (props) => {
  const [color, setColor] = useState(props.color);
  const [alphaType] = useState("none");

  const dispatch = useDispatch();

  const updateColor = useConstCallback((ev, colorObj) => {
    setColor(colorObj);
    dispatch(
      themeActions.colorChanged({
        color: "#" + colorObj.hex,
        disabledColor: shadeColor(colorObj.hex, 20),
        fontColor: shadeColor(colorObj.hex, -60),
        bgColor: shadeColor(colorObj.hex, 60),
      })
    );
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

function shadeColor(color, percent) {
  var R = parseInt(color.substring(0, 2), 16);
  var G = parseInt(color.substring(2, 4), 16);
  var B = parseInt(color.substring(4, 6), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

export default ColorPickerExample;
