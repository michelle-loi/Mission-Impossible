import React, { useState, useMemo, useEffect } from 'react';
import './Maze.scss';
import Quaternion from 'quaternion';

const orientations = [
  ['landscape left', 'landscape right'], // device x axis points up/down
  ['portrait', 'portrait upside down'], // device y axis points up/down
  ['display up', 'display down'], // device z axis points up/down
];

const rad = Math.PI / 180;

export default function MazeGame() {
  const [gameId, setGameId] = useState(1);
  const [status, setStatus] = useState('playing');
  const [cheatMode, setCheatMode] = useState(false);
  const [userPosition, setUserPosition] = useState([0, 0]);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [attempts, setAttempts] = useState(0); // Track number of attempts
  const [selectedCellX, setSelectedCellX] = useState(null); // Track selected cell
  const [selectedCellY, setSelectedCellY] = useState(null); // Track selected cell
  const moveDelay = 200; // Delay in milliseconds

  const [angles, setAngles] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [vec, setVec] = useState([0, 0, 0]);
  const [orientation, setOrientation] = useState('');

  const fixedMaze = [
    [
      [0, 1, 1, 0],
      [0, 1, 0, 1],
      [0, 1, 1, 0],
      [0, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 1],
      [1, 1, 1, 1],
      [0, 1, 0, 1],
      [1, 1, 0, 1],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
    ],
    [
      [0, 1, 1, 0],
      [1, 1, 0, 1],
      [0, 0, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [0, 1, 0, 0],
      [1, 0, 1, 1],
      [0, 1, 1, 0],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [1, 1, 0, 1],
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [0, 0, 1, 1],
    ],
    [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 0, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 1, 1],
      [1, 1, 0, 1],
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 0],
      [1, 1, 0, 1],
      [0, 1, 1, 1],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
    ],
    [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [1, 1, 0, 1],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 1, 0, 0],
      [0, 1, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 0, 1, 1],
    ],
    [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 0, 0],
      [1, 1, 0, 1],
      [0, 0, 1, 1],
    ],
    [
      [1, 1, 1, 0],
      [0, 1, 0, 1],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 1, 0, 1],
      [0, 1, 1, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 0],
      [1, 1, 0, 1],
      [1, 0, 1, 1],
    ],
  ];

  const maze = useMemo(() => fixedMaze, [gameId]);
  const maxColIndex = maze[0].length - 1;

  // Set CSS variables for maze rows and columns
  useEffect(() => {
    const mazeRows = maze.length;
    const mazeCols = maze[0].length;
    document.documentElement.style.setProperty('--maze-rows', mazeRows);
    document.documentElement.style.setProperty('--maze-cols', mazeCols);
  }, [maze]);

  // Define the winning cell
  const winningCell = [4, 5]; // Change this to any valid cell as the winning position

  useEffect(() => {
    const onOrientationChange = (ev) => {
      const q = Quaternion.fromEuler(
        ev.alpha * rad * 1.5,
        ev.beta * rad * 1.5,
        ev.gamma * rad * 1.5,
        'ZXY'
      );

      // Transform an upward-pointing vector to device coordinates
      const vec = q.conjugate().rotateVector([0, 0, 1]);

      // Find the axis with the largest absolute value
      const [value, axis] = vec.reduce(
        (acc, cur, idx) =>
          Math.abs(cur) < Math.abs(acc[0]) ? acc : [cur, idx],
        [0, 0]
      );

      const orientation = orientations[axis][1 * (value < 0)];

      setAngles({ alpha: ev.alpha, beta: ev.beta, gamma: ev.gamma });
      setVec(vec);
      setOrientation(orientation);
    };

    window.addEventListener('deviceorientation', onOrientationChange, true);

    return () => {
      window.removeEventListener(
        'deviceorientation',
        onOrientationChange,
        true
      );
    };
  }, []);

  useEffect(() => {
    const moveBall = () => {
      const newPosition = [...userPosition];

      switch (orientation) {
        case 'landscape left':
          newPosition[1] = Math.max(newPosition[1] - 1, 0); // Move left
          break;
        case 'landscape right':
          newPosition[1] = Math.min(newPosition[1] + 1, maze[0].length - 1); // Move right
          break;
        case 'portrait':
          newPosition[0] = Math.min(newPosition[0] + 1, maze.length - 1); // Move down
          break;
        case 'portrait upside down':
          newPosition[0] = Math.max(newPosition[0] - 1, 0); // Move up
          break;
        default:
          break;
      }

      // Check if the new position is valid (not a wall)
      if (
        newPosition[0] >= 0 &&
        newPosition[0] < maze.length &&
        newPosition[1] >= 0 &&
        newPosition[1] < maze[0].length &&
        maze[newPosition[0]][newPosition[1]] !== 1 // Check if the cell is not a wall
      ) {
        setUserPosition(newPosition);
      }
    };

    const intervalId = setInterval(moveBall, 100); // Move every 100 ms
    return () => clearInterval(intervalId);
  }, [orientation, userPosition, maze]);

  const restartGame = () => {
    setGameId((prevId) => prevId + 1);
    setUserPosition([0, 0]);
    setStatus('playing');
    setAttempts(0); // Reset attempts
    setSelectedCellX(null); // Reset selected cell
    setSelectedCellY(null);
  };

  // Function to handle selecting a cell
  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCellX(rowIndex);
    setSelectedCellY(colIndex);
    if (rowIndex === winningCell[0] && colIndex === winningCell[1]) {
      setStatus('won'); // Winning condition remains the same
    } else {
      setStatus('select');
    }
  };

  const handleConfirm = () => {
    setSelectedCellX(userPosition[0]);
    setSelectedCellY(userPosition[1]);
    if (
      userPosition[0] === winningCell[0] &&
      userPosition[1] === winningCell[1]
    ) {
      console.log("You've won!");
      setStatus('won');
    } else {
      if (attempts < 2) {
        setAttempts((prev) => prev + 1); // Increment attempts
        setStatus('select');
        console.log(`Incorrect! You have ${2 - attempts} attempts left.`);
      } else {
        console.log('Not allowed!');
        setStatus('notAllowed'); // Set a status for "not allowed"
      }
    }
  };

  return (
    <div className="maze-container">
      <div className="maze">
        {maze.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell 
                ${status === 'won' && rowIndex === winningCell[0] && colIndex === winningCell[1] ? 'winning-cell' : ''} 
                ${status === 'select' && rowIndex === selectedCellX && colIndex === selectedCellY ? 'selected' : ''}
              `}
              //onClick={() => handleConfirm()}
            >
              {userPosition[0] === rowIndex && userPosition[1] === colIndex && (
                <div className="player"></div>
              )}
            </div>
          ))
        )}
      </div>

      {status === 'won' && (
        <div className="win-message">
          <h2>You've won!</h2>
          <div className="hint-message">
            The clicked cell was row {selectedCellX} and column {selectedCellY}
          </div>
          <button className="maze-btn" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}

      {status === 'select' && (
        <div className="win-message">
          <h2>You Made a Choice!</h2>
          <div className="hint-message">
            The clicked cell was row {selectedCellX} and column {selectedCellY}
          </div>
          <button className="maze-btn" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}

      {status === 'notAllowed' && (
        <div className="not-allowed-message">
          <h2>Not allowed!</h2>
          <button className="maze-btn" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}

      <button className="maze-btn" onClick={() => setCheatMode(!cheatMode)}>
        {cheatMode ? 'Disable Cheat Mode' : 'Enable Cheat Mode'}
      </button>

      <button className="maze-btn" onClick={handleConfirm}>
        Confirm
      </button>

      {cheatMode && (
        <div className="hint-message">
          Hint: The winning cell is at row {winningCell[0]}, column{' '}
          {winningCell[1]}, and the length of the column is {maxColIndex}
        </div>
      )}

      {status === 'notAllowed' && attempts >= 3 && (
        <div className="attempts-message">
          <h3>You have used all your attempts.</h3>
        </div>
      )}

      <div>
        <div id="angles">
          alpha = {angles.alpha.toFixed(1)}°, beta = {angles.beta.toFixed(1)}°,
          gamma = {angles.gamma.toFixed(1)}°
        </div>
        <div id="vec">
          vec = {vec.map((a) => a.toFixed(3)).join(', ')}, dominant axis ={' '}
          {vec.reduce(
            (acc, cur, idx) => (Math.abs(cur) > Math.abs(acc) ? idx : acc),
            0
          )}
          , value ={' '}
          {vec[
            vec.reduce(
              (acc, cur, idx) => (Math.abs(cur) > Math.abs(acc) ? idx : acc),
              0
            )
          ].toFixed(3)}
        </div>
        <div id="orientation">orientation = {orientation}</div>
      </div>
    </div>
  );
}
