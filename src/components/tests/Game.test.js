import Game from "../Game";
import * as gameLogic from "../logic/gameLogic";
import { render } from "@testing-library/react";

describe("Game Component", () => {
  let grid = [];
  beforeEach(() => {
    grid = [
      [
        {
          id: 0,
          row: 0,
          col: 0,
          value: "",
          isEnabled: true,
          isBomb: false,
        },
        {
          id: 1,
          row: 0,
          col: 1,
          value: "",
          isEnabled: true,
          isBomb: false,
        },
      ],
      [
        {
          id: 2,
          row: 1,
          col: 0,
          value: "",
          isEnabled: true,
          isBomb: false,
        },
        {
          id: 3,
          row: 1,
          col: 1,
          value: "",
          isEnabled: true,
          isBomb: false,
        },
      ],
    ];
  });

  it("should build a grid", () => {
    let actualGrid = gameLogic.initBoxes(2, 2);
    expect(actualGrid).toStrictEqual(grid);
  });

  it("should disable a box", () => {
    gameLogic.disableBox(grid, 1, 1);
    expect(grid[1][1].isEnabled).toBeFalsy();
  });
});
