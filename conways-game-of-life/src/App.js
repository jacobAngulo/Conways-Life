import React, { useState, useEffect, useCallback } from "react";
import {
  getTopLeftIndex,
  getTopMiddleIndex,
  getTopRightIndex,
  getMiddleLeftIndex,
  getMiddleRightIndex,
  getBottomLeftIndex,
  getBottomMiddleIndex,
  getBottomRightIndex
} from "./algorithms";
import "./index.css";

const App = () => {
  const [size, setSize] = useState(50);
  const [population, setPopulation] = useState(0);
  const [running, setRunning] = useState(false);
  const [grid, setGrid] = useState([]);
  const [generation, setGeneration] = useState(0);
  const [emptyGrid, setEmptyGrid] = useState([]);

  useEffect(() => {
    generateEmptyGrid();
  }, []);

  useEffect(() => {
    if (running) {
      requestAnimationFrame(renderNextGeneration);
    }
  }, [generation, running]);

  useEffect(() => {
    generateEmptyGrid();
  }, [size]);

  const generateRandomGrid = () => {
    let newGrid = [];
    let newPopulation = 0;
    for (let i = 0; i < size * size; i++) {
      let newNode = Math.round(Math.random());
      if (newNode) {
        newPopulation++;
      }
      newGrid[i] = newNode;
    }
    setGrid(newGrid);
    setPopulation(newPopulation);
    setGeneration(0);
  };

  const generateEmptyGrid = () => {
    let newGrid = [];
    for (let i = 0; i < size * size; i++) {
      newGrid[i] = 0;
    }
    setRunning(false);
    setGrid(newGrid);
    setEmptyGrid(newGrid);
    setPopulation(0);
    setGeneration(0);
  };

  const toggleNode = i => {
    let updatedGrid = [...grid];
    if (updatedGrid[i]) {
      updatedGrid[i] = 0;
      setPopulation(population - 1);
    } else {
      setPopulation(population + 1);
      updatedGrid[i] = 1;
    }
    setGrid(updatedGrid);
  };

  const toggleRunning = () => {
    setRunning(!running);
  };

  const renderNextGeneration = () => {
    let assessment = [...emptyGrid];
    let nextIteration = [...emptyGrid];
    let nextPopulation = 0;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i]) {
        assessment[getTopLeftIndex(i, size)]++;
        assessment[getTopMiddleIndex(i, size)]++;
        assessment[getTopRightIndex(i, size)]++;
        assessment[getMiddleLeftIndex(i, size)]++;
        assessment[getMiddleRightIndex(i, size)]++;
        assessment[getBottomLeftIndex(i, size)]++;
        assessment[getBottomMiddleIndex(i, size)]++;
        assessment[getBottomRightIndex(i, size)]++;
      }
    }
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] && (assessment[i] === 2 || assessment[i] === 3)) {
        nextIteration[i] = 1;
        nextPopulation++;
      } else if (!grid[i] && assessment[i] === 3) {
        nextIteration[i] = 1;
        nextPopulation++;
      }
    }
    if (nextPopulation === 0 || assessment.toString() === grid.toString()) {
      setRunning(false);
    }
    setGrid(nextIteration);
    setGeneration(generation + 1);
    setPopulation(nextPopulation);
  };

  const changeSize = num => {
    setSize(num);
  };

  return (
    <div className="app">
      <div className="game-panel">
        <div>
          <p className="bold">generation: {generation}</p>
        </div>
        <div className="grid">
          {grid.map((node, i) => {
            if ((i + 1) % size === 0) {
              return (
                <canvas
                  style={{
                    height: `${500 / size}px`,
                    width: `${500 / size}px`
                  }}
                  key={i}
                  onClick={() => toggleNode(i)}
                  className={node ? "alive" : "dead"}
                >
                  {"\n"}
                </canvas>
              );
            } else {
              return (
                <canvas
                  style={{
                    height: `${500 / size}px`,
                    width: `${500 / size}px`
                  }}
                  key={i}
                  onClick={() => toggleNode(i)}
                  className={node ? "alive" : "dead"}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="description-panel">
        <div className="description">
          <h1>Conway's Game of Life (Cellular Automata)</h1>
          <p className="bold">{"\n\n"}RULES:</p>
          <p>
            <span className="bold">#1:</span> Any cell with fewer than 2 living
            neighbors die via underpopulation or exposure
          </p>
          <p>
            <span className="bold">#2:</span> Any cell with more than 3
            neighbors dies via overpopulation or crowding
          </p>
          <p>
            <span className="bold">#3:</span> Any live cell with 2 or 3 living
            neighbors survives to the next generation
          </p>
          <p>
            <span className="bold">#3:</span> Any dead cell with exactly 3
            living neighbors will come to life
          </p>
        </div>
        <div className="control-panel">
          <div className="grid-control-panel">
            <button
              className={`button ${running ? "disabled" : ""}`}
              disabled={running}
              onClick={generateRandomGrid}
            >
              randomize
            </button>
            <button
              className={`button ${population === 0 ? "disabled" : ""}`}
              disabled={population ? false : true}
              onClick={toggleRunning}
            >
              {running ? "stop" : "start"}
            </button>
            <button
              className={`button ${
                running || population === 0 ? "disabled" : ""
              }`}
              disabled={running || population === 0}
              onClick={renderNextGeneration}
            >
              next step
            </button>
            <button
              className={`button ${
                running || population === 0 ? "disabled" : ""
              }`}
              disabled={running || population === 0}
              onClick={generateEmptyGrid}
            >
              clear grid
            </button>
          </div>
          <div className="sizes-control-panel">
            <button
              className={`button ${
                size === 20
                  ? running
                    ? "disabled-active"
                    : "active"
                  : running
                  ? "disabled"
                  : ""
              }`}
              disabled={running}
              onClick={() => changeSize(20)}
            >
              20 x 20
            </button>
            <button
              className={`button ${
                size === 30
                  ? running
                    ? "disabled-active"
                    : "active"
                  : running
                  ? "disabled"
                  : ""
              }`}
              disabled={running}
              onClick={() => changeSize(30)}
            >
              30 x 30
            </button>
            <button
              className={`button ${
                size === 40
                  ? running
                    ? "disabled-active"
                    : "active"
                  : running
                  ? "disabled"
                  : ""
              }`}
              disabled={running}
              onClick={() => changeSize(40)}
            >
              40 x 40
            </button>
            <button
              className={`button ${
                size === 50
                  ? running
                    ? "disabled-active"
                    : "active"
                  : running
                  ? "disabled"
                  : ""
              }`}
              disabled={running}
              onClick={() => changeSize(50)}
            >
              50 x 50
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
