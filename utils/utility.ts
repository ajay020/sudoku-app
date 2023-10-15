function isValidMove(grid: number[][], row: number, col: number, num: number) {
  // Check if the number is not already in the row, column, or 3x3 subgrid
  return (
    !grid[row].includes(num) &&
    !grid.map((row) => row[col]).includes(num) &&
    !isNumberInSubgrid(grid, row, col, num)
  );
}

function isNumberInSubgrid(
  grid: number[][],
  row: number,
  col: number,
  num: number
) {
  const subgridRow = Math.floor(row / 3) * 3;
  const subgridCol = Math.floor(col / 3) * 3;

  for (let i = subgridRow; i < subgridRow + 3; i++) {
    for (let j = subgridCol; j < subgridCol + 3; j++) {
      if (grid[i][j] === num) {
        return true;
      }
    }
  }
  return false;
}

function isValidCell(grid: number[][], row: number, col: number) {
  return (
    isRowValid(grid[row]) &&
    isColumnValid(grid, col) &&
    isBoxValid(grid, row, col)
  );
}

function isRowValid(row: number[]): boolean {
  const seen = new Set<number>();
  for (const num of row) {
    if (seen.has(Math.abs(num))) {
      return false;
    }
    if (num !== 0) {
      seen.add(num);
    }
  }
  return true;
}

function isColumnValid(grid: number[][], colIndex: number): boolean {
  const seen = new Set<number>();
  for (let i = 0; i < 9; i++) {
    const num = Math.abs(grid[i][colIndex]);
    if (seen.has(num)) {
      return false;
    }
    if (num !== 0) {
      seen.add(num);
    }
  }
  return true;
}

function isBoxValid(
  grid: number[][],
  rowIndex: number,
  colIndex: number
): boolean {
  let r = rowIndex - (rowIndex % 3);
  let c = colIndex - (colIndex % 3);

  const seen = new Set<number>();
  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      const num = Math.abs(grid[i][j]);
      if (seen.has(num)) {
        return false;
      }
      if (num !== 0) {
        seen.add(num);
      }
    }
  }
  return true;
}

const countEmptyCells = (grid: number[][]) => {
  let count = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        count++;
      }
    }
  }
  return count;
};

/***
 * Format second into M:S form
 *
 */

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

function giveHint(grid: number[][]) {
  console.log({ grid });
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid && grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (grid && isValidMove(grid, row, col, num)) {
            // console.log({ row, col, num });
            return { row, col, num };
          }
        }
      }
    }
  }
  return null;
}

export default {
  isValidMove,
  isValidCell,
  countEmptyCells,
  formatTime,
  giveHint,
};
