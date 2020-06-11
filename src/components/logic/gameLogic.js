export const initBoxes = (width, height) => {
  let grid = [];
  let i = 0;
  for (let h = 0; h < height; h++) {
    const row = [];
    for (let w = 0; w < width; w++) {
      row.push({
        id: i,
        row: h,
        col: w,
        value: "",
        isEnabled: true,
        isBomb: false,
      });
      i++;
    }
    grid.push(row);
  }
  return grid;
};

export const initBombs = (grid, width, height, bombs, clickedBox) => {
  for (let i = 0; i < bombs; i++) {
    let randX = undefined;
    let randY = undefined;
    while (
      !randX ||
      grid[randY][randX].isBomb ||
      (randX === clickedBox.col && randY === clickedBox.row)
    ) {
      randX = Math.floor(Math.random() * width);
      randY = Math.floor(Math.random() * height);
    }
    grid[randY][randX].isBomb = true;
  }
};

export const setLabels = (grid, width, height) => {
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      let value = 0;
      if (!grid[h][w].isBomb) {
        // up
        if (h > 0 && grid[h - 1][w].isBomb) {
          value++;
        }
        // up left
        if (h > 0 && w > 0 && grid[h - 1][w - 1].isBomb) {
          value++;
        }
        // up right
        if (h > 0 && w < width - 1 && grid[h - 1][w + 1].isBomb) {
          value++;
        }
        // right
        if (w < width - 1 && grid[h][w + 1].isBomb) {
          value++;
        }
        // right down
        if (h < height - 1 && w < width - 1 && grid[h + 1][w + 1].isBomb) {
          value++;
        }
        // down
        if (h < height - 1 && grid[h + 1][w].isBomb) {
          value++;
        }
        // left down
        if (h < height - 1 && w > 0 && grid[h + 1][w - 1].isBomb) {
          value++;
        }
        // left
        if (w > 0 && grid[h][w - 1].isBomb) {
          value++;
        }
        grid[h][w].value = value > 0 ? value : "";
      }
    }
  }
};

export const floodBoxes = (grid, clickedBox) => {
  dfs(grid, clickedBox.row, clickedBox.col);
  disableBox(grid, clickedBox.row, clickedBox.col);
};

const dfs = (grid, r, c) => {
  if (
    r >= grid.length ||
    r < 0 ||
    c < 0 ||
    c >= grid[0].length ||
    !grid[r][c].isEnabled
  ) {
    return;
  }

  if (grid[r][c].value !== "") {
    disableBox(grid, r, c);
    return;
  }

  disableBox(grid, r, c);
  dfs(grid, r, c - 1);
  dfs(grid, r, c + 1);
  dfs(grid, r + 1, c);
  dfs(grid, r - 1, c);
};

export const cloneGrid = (grid) => {
  let clone = grid.map((row) => {
    return row.map((box) => {
      return box;
    });
  });
  return clone;
};

export const disableBox = (grid, row, col) => {
  grid[row][col].isEnabled = false;
};

export const checkIfGameWon = (grid, game) => {
  let revealedBoxes = 0;
  grid.forEach((row) => {
    row.forEach((box) => {
      if (!box.isEnabled) {
        revealedBoxes++;
      }
    });
  });

  if (revealedBoxes === game.width * game.height - game.bombs) {
    return true;
  }

  return false;
};
