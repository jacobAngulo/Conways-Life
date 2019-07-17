import React, { useState, useEffect } from "react";
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
      if (Math.round(Math.random())) {
        newPopulation++;
        newGrid[i] = { alive: true, livingNeighbors: 0 };
      } else {
        newGrid[i] = { alive: false, livingNeighbors: 0 };
      }
    }
    setGrid(newGrid);
    setPopulation(newPopulation);
    setGeneration(0);
  };

  const generateEmptyGrid = () => {
    let newGrid = [];
    for (let i = 0; i < size * size; i++) {
      newGrid[i] = { alive: false, livingNeighbors: 0 };
    }
    setRunning(false);
    setGrid(newGrid);
    setEmptyGrid(newGrid);
    setPopulation(0);
    setGeneration(0);
  };

  const toggleNode = i => {
    let updatedGrid = JSON.parse(JSON.stringify(grid));
    if (updatedGrid[i].alive === true) {
      updatedGrid[i].alive = false;
      setPopulation(population - 1);
    } else {
      setPopulation(population + 1);
      updatedGrid[i].alive = true;
    }
    setGrid(updatedGrid);
  };

  const toggleRunning = () => {
    setRunning(!running);
  };

  const renderNextGeneration = () => {
    let nextIteration = JSON.parse(JSON.stringify(emptyGrid));
    let nextPopulation = 0;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].alive) {
        nextIteration[getTopLeftIndex(i, size)].livingNeighbors++;
        nextIteration[getTopMiddleIndex(i, size)].livingNeighbors++;
        nextIteration[getTopRightIndex(i, size)].livingNeighbors++;
        nextIteration[getMiddleLeftIndex(i, size)].livingNeighbors++;
        nextIteration[getMiddleRightIndex(i, size)].livingNeighbors++;
        nextIteration[getBottomLeftIndex(i, size)].livingNeighbors++;
        nextIteration[getBottomMiddleIndex(i, size)].livingNeighbors++;
        nextIteration[getBottomRightIndex(i, size)].livingNeighbors++;
      }
    }
    for (let i = 0; i < grid.length; i++) {
      if (
        grid[i].alive &&
        (nextIteration[i].livingNeighbors === 2 ||
          nextIteration[i].livingNeighbors === 3)
      ) {
        nextIteration[i].alive = true;
        nextIteration[i].livingNeighbors = 0;
        nextPopulation++;
      } else if (!grid[i].alive && nextIteration[i].livingNeighbors === 3) {
        nextIteration[i].alive = true;
        nextIteration[i].livingNeighbors = 0;
        nextPopulation++;
      }
    }
    if (
      nextPopulation === 0 ||
      JSON.stringify(nextIteration) === JSON.stringify(grid)
    ) {
      setRunning(false);
    }
    setGrid(nextIteration);
    setGeneration(generation + 1);
    setPopulation(nextPopulation);
  };

  const changeSize = num => {
    // generateEmptyGrid();
    setSize(num);
  };

  return (
    <div className="app">
      <header>
        <h1>Conway's Game of Life (Cellular Automata)</h1>
      </header>
      <div className="content">
        <div className="game">
          <div className="game-panel">
            <div className="game-panel display">
              <div
                style={{
                  height: `${size * 10}px`,
                  width: `${size * 10}px`
                }}
                className="grid"
              >
                {grid.map((node, i) => {
                  if ((i + 1) % size === 0) {
                    return (
                      <canvas
                        key={i}
                        onClick={() => toggleNode(i)}
                        className={node.alive ? "alive" : "dead"}
                      >
                        {"\n"}
                      </canvas>
                    );
                  } else {
                    return (
                      <canvas
                        key={i}
                        onClick={() => toggleNode(i)}
                        className={node.alive ? "alive" : "dead"}
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div className="control-panel">
              <p>actions:</p>
              <button disabled={running} onClick={generateRandomGrid}>
                populate randomly
              </button>
              <button
                disabled={population ? false : true}
                onClick={toggleRunning}
              >
                {running ? "stop" : "start"}
              </button>
              <button disabled={running} onClick={renderNextGeneration}>
                next step
              </button>
              <button disabled={running} onClick={generateEmptyGrid}>
                clear grid
              </button>
            </div>
          </div>
          <div className="side-bar">
            <div>
              <p>generation: {generation}</p>
              <p>population: {population}</p>
            </div>
            <div className="sizes-control-panel">
              <p>sizes:</p>
              <button disabled={running} onClick={() => changeSize(10)}>
                10 x 10
              </button>
              <button disabled={running} onClick={() => changeSize(20)}>
                20 x 20
              </button>
              <button disabled={running} onClick={() => changeSize(30)}>
                30 x 30
              </button>
              <button disabled={running} onClick={() => changeSize(40)}>
                40 x 40
              </button>
              <button disabled={running} onClick={() => changeSize(50)}>
                50 x 50
              </button>
            </div>
          </div>
        </div>
        <div className="description">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
};

export default App;
