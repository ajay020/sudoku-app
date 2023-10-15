import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import SudokuCell from "./SudokuCell";

interface SudokuGridProps {
  grid: number[][] | null;
  initialGrid: number[][];
  selectedCell: {
    row: number;
    col: number;
  } | null;
  updateSelectedCell: (cell: { row: number; col: number }) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({
  grid,
  initialGrid,
  selectedCell,
  updateSelectedCell,
}) => {
  //   console.log("SudokuGrid");

  const handleCellPress = (row: number, col: number) => {
    // Update the grid state with the user's input
    updateSelectedCell({ row, col });
  };

  const varifyInitial = (row: number, col: number) => {
    if (initialGrid && initialGrid[row]) {
      return initialGrid[row][col] !== 0;
    }
    return false;
  };

  return (
    <View style={styles.grid}>
      {grid?.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            rowIndex < 8 && rowIndex % 3 === 2 ? styles.highlightedRow : null,
          ]}
        >
          {row.map((cell, colIndex) => {
            return (
              <SudokuCell
                key={colIndex}
                value={cell}
                isSelected={
                  selectedCell !== null &&
                  selectedCell.row === rowIndex &&
                  selectedCell.col === colIndex
                }
                onPress={useCallback(
                  () => handleCellPress(rowIndex, colIndex),
                  []
                )}
                highlightColumn={colIndex < 8 && colIndex % 3 === 2}
                isInitial={varifyInitial(rowIndex, colIndex)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    // Styling for the Sudoku grid container
    backgroundColor: "lightblue",
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  row: {
    // Styling for each row
    flexDirection: "row",
    padding: 0,
  },
  highlightedRow: {
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  highlightedColumn: {
    borderRightWidth: 1,
    borderBottomColor: "black",
  },
});

export default SudokuGrid;
