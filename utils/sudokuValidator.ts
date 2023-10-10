function isSudokuValid(grid: number[][]): boolean {
  // Check rows
  for (let i = 0; i < 9; i++) {
    if (!isRowValid(grid[i])) {
      return false;
    }
  }

  // Check columns
  for (let i = 0; i < 9; i++) {
    if (!isColumnValid(grid, i)) {
      return false;
    }
  }

  // Check 3x3 boxes
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      if (!isBoxValid(grid, i, j)) {
        return false;
      }
    }
  }

  return true;
}

function isRowValid(row: number[]): boolean {
  const seen = new Set<number>();
  for (const num of row) {
    if (num === 0 || seen.has(num)) {
      return false;
    }
    seen.add(num);
  }
  return true;
}

function isColumnValid(grid: number[][], colIndex: number): boolean {
  const seen = new Set<number>();
  for (let i = 0; i < 9; i++) {
    const num = grid[i][colIndex];
    if (num === 0 || seen.has(num)) {
      return false;
    }
    seen.add(num);
  }
  return true;
}

function isBoxValid(
  grid: number[][],
  rowIndex: number,
  colIndex: number
): boolean {
  const seen = new Set<number>();
  for (let i = rowIndex; i < rowIndex + 3; i++) {
    for (let j = colIndex; j < colIndex + 3; j++) {
      const num = grid[i][j];
      if (num === 0 || seen.has(num)) {
        return false;
      }
      seen.add(num);
    }
  }
  return true;
}

function isGameComplete(grid: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return false; // Found an empty cell, game is not complete
      }
    }
  }
  return true; // All cells are filled
}
