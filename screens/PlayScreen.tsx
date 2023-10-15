import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import ControlPanel from "../components/ContorlPanels";
import SudokuGrid from "../components/SudokuGrid";
import { generateSudokuPuzzle } from "../utils/sudokuGenerator";
import utility from "../utils/utility";
import CompleteModal from "../components/CompleteModal";

import { RootStackParamList } from "./HomeScreen";
import InfoHeader from "../components/InfoHeader";
import NumberSelector from "../components/NumberSelector";
import useTimer from "../hooks/useTimer";
import { useTheme } from "../themes/ThemeProvider";

const PlayScreen: React.FC = () => {
  console.log("PlayScreen render....");
  const route = useRoute<RouteProp<RootStackParamList, "Play">>();
  const { level } = route.params;

  const { theme } = useTheme();

  const [grid, setGrid] = useState<number[][]>([]);
  const [initialGrid, setInitialGrid] = useState<number[][]>([]);
  const [showModal, setShowModal] = useState(false);
  const [emptyCellCount, setEmptyCellCount] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [isInitialGridInitialized, setIsInitialGridInitialized] =
    useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [moveStack, setMoveStack] = useState<{ row: number; col: number }[]>(
    []
  );

  const { value, start, pause } = useTimer({
    interval: 1000,
    startValue: 0,
  });

  const handleGeneratePuzzle = () => {
    const generatedPuzzle = generateSudokuPuzzle(level);
    setGrid(generatedPuzzle);
  };

  useEffect(() => {
    setLoading(true);
    handleGeneratePuzzle();
  }, [level]);

  useEffect(() => {
    if (grid && grid?.length > 0 && !isInitialGridInitialized) {
      const newInitialGrid: number[][] = grid.map((row) => [...row]);
      setInitialGrid(newInitialGrid);

      const newEmptyCellCount = utility.countEmptyCells(newInitialGrid);
      setEmptyCellCount(newEmptyCellCount);

      setIsInitialGridInitialized(true);
      setLoading(false);
      // start timer
      start();
      console.log("INITIAL GRID");
    }
  }, [grid]);

  useEffect(() => {
    if (emptyCellCount === 0) {
      setShowModal(true);
      pause();
    }
  }, [emptyCellCount]);

  const handleUndoPress = () => {
    if (moveStack.length > 0) {
      // Pop the last move from the stack
      removeLatestMove();
    }
  };

  const removeLatestMove = () => {
    const lastMove = moveStack[moveStack.length - 1];
    const updatedStack = moveStack.slice(0, -1);

    // Update the grid to the state before the last move
    const updatedGrid = [...grid];
    updatedGrid[lastMove.row][lastMove.col] = 0;

    // Update the grid and the stack
    setGrid(updatedGrid);
    setMoveStack(updatedStack);
  };

  const isInitialNumber = (row: number, col: number) => {
    if (initialGrid) {
      console.log({ initialGrid });
      return initialGrid[row][col] !== 0 ? true : false;
    }
  };

  const handleClearPress = useCallback(() => {
    if (selectedCell && !isInitialNumber(selectedCell.row, selectedCell.col)) {
      const { row, col } = selectedCell;

      const isValidCell = utility.isValidCell(grid, row, col);

      if (!isValidCell) {
        const updatedGrid = [...grid];
        updatedGrid[selectedCell.row][selectedCell.col] = 0;

        setGrid(updatedGrid);
      }
    }
  }, [selectedCell, grid, setGrid]);

  const handleHintPress = useCallback(() => {
    // Implement the hint logic here
  }, []);

  // a function to clear the selected cell
  const clearSelectedCell = () => {
    setSelectedCell(null);
  };

  const updateSelectedCell = (cell: { row: number; col: number }) => {
    setSelectedCell(cell);
  };

  const updateMoveStack = (cell: { row: number; col: number }) => {
    setMoveStack((prev) => [...prev, cell]);
  };

  const decrementEmptyCellCount = () => {
    setEmptyCellCount((prev) => prev - 1);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNumberSelection = useCallback(
    (number: number) => {
      if (
        grid &&
        selectedCell &&
        !isInitialNumber(selectedCell.row, selectedCell.col)
      ) {
        const updatedGrid = [...grid];

        const moveIsValid = utility.isValidMove(
          updatedGrid,
          selectedCell.row,
          selectedCell.col,
          number
        );

        if (!moveIsValid) {
          // If the move is not valid, mark the entered number as red
          // Use a negative number as an indicator
          updatedGrid[selectedCell.row][selectedCell.col] = -number;
        } else {
          updatedGrid[selectedCell.row][selectedCell.col] = number;
          decrementEmptyCellCount();
        }

        updateMoveStack(selectedCell);

        // Update the state with the updated grid
        setGrid(updatedGrid);

        // Deselect the cell
        clearSelectedCell();
      }
    },
    [selectedCell, grid]
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: theme.primaryBackground,
        }}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <>
      <CompleteModal isVisible={showModal} onClose={closeModal} time={value} />
      <View
        style={[styles.container, { backgroundColor: theme.primaryBackground }]}
      >
        <View style={styles.gridWrapper}>
          <InfoHeader level={level} value={value} />
          <SudokuGrid
            grid={grid}
            initialGrid={initialGrid}
            selectedCell={selectedCell}
            updateSelectedCell={updateSelectedCell}
          />
        </View>

        <ControlPanel
          onUndoPress={handleUndoPress}
          onClearPress={handleClearPress}
          onHintPress={handleHintPress}
        />
        <NumberSelector onSelectNumber={handleNumberSelection} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 18,
    // alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "lightgreen",
  },
  gridWrapper: {
    // flex: 1,
    // backgroundColor: "green",
    // paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayScreen;
