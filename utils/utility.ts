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

export default { isValidMove };
