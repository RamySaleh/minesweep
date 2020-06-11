import Header from "../Header";
import React from "react";
import { render } from "@testing-library/react";

describe("Header Component", () => {
  it("shouldn't show the custom panel by default", () => {
    const tree = render(<Header />);
    const component = tree.queryByTestId("custom-panel");
    expect(component).toBeFalsy();
  });
});
