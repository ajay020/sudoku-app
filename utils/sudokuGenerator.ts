type SudokuGrid = number[][];

export function generateSudokuPuzzle(level: "1" | "2" | "3") {
  const completeGrid = generateCompleteSudokuGrid();
  // Determine the number of cells to remove based on difficulty
  let cellsToRemove: number = getNumberToBeRemovedByLevel(level);
  removeNumbers(completeGrid, cellsToRemove);

  return completeGrid;
}

function getNumberToBeRemovedByLevel(level: string) {
  let cellsToRemove: number;
  switch (level) {
    case "1":
      return (cellsToRemove = 10);
    case "2":
      return (cellsToRemove = 12);
    case "3":
      return (cellsToRemove = 15);
    default:
      return 35;
  }
}

/**
 *
 * @returns
 * Generate a grid with numbers
 */

function generateCompleteSudokuGrid() {
  const grid: SudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Fill diagonal subgrids with random numbers
  fillDiagonalSubgrids(grid);

  // Use backtracking to fill the rest of the grid
  fillRemaining(grid);

  return grid;
}

function fillDiagonalSubgrids(grid: SudokuGrid) {
  const nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(nums);

  for (let i = 0; i < 9; i += 3) {
    fillSubgrid(grid, i, i, nums);
  }
}

function fillSubgrid(
  grid: SudokuGrid,
  row: number,
  col: number,
  nums: number[]
) {
  let numIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[row + i][col + j] = nums[numIndex];
      numIndex++;
    }
  }
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function fillRemaining(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(nums);

        for (const num of nums) {
          if (isValidMove(grid, row, col, num)) {
            grid[row][col] = num;

            if (fillRemaining(grid)) {
              return true;
            }

            grid[row][col] = 0;
          }
        }

        return false;
      }
    }
  }
  return true;
}

function isValidMove(
  grid: SudokuGrid,
  row: number,
  col: number,
  num: number
): boolean {
  // Check if the number is not already in the row, column, or 3x3 subgrid
  return (
    !grid[row].includes(num) &&
    !grid.map((row) => row[col]).includes(num) &&
    !isNumberInSubgrid(grid, row, col, num)
  );
}

function isNumberInSubgrid(
  grid: SudokuGrid,
  row: number,
  col: number,
  num: number
): boolean {
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

function removeNumbers(grid: SudokuGrid, count: number) {
  const cells: number[][] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cells.push([row, col]);
    }
  }

  shuffleArray(cells);

  for (let i = 0; i < count; i++) {
    const [row, col] = cells[i];
    const temp = grid[row][col];
    grid[row][col] = 0;
  }
}
