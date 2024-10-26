import { useState, useMemo, useEffect } from 'react';
import './Maze.scss';

export default function MazeGame({ setPuzzleValue }) {
  const [gameId, setGameId] = useState(1);
  const [userPosition, setUserPosition] = useState([3, 3]);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [selectedCellX, setSelectedCellX] = useState(null); // Track selected cell
  const [selectedCellY, setSelectedCellY] = useState(null); // Track selected cell
  const moveDelay = 10000000000; // Delay in milliseconds
  const [targetLocked, setTargetLocked] = useState(false);

  const fixedMaze = [
    [
      [0, 1, 1, 0],
      [0, 1, 0, 1],
      [0, 1, 1, 0],
      [0, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 1],
      [0, 1, 0, 1],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 1],
      [1, 1, 1, 1],
      [0, 1, 0, 1],
    ],
    [
      [0, 1, 1, 0],
      [1, 1, 0, 1],
      [0, 0, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
      [0, 1, 0, 0],
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
    ],
    [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 0, 1],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 1, 1],
      [1, 1, 0, 1],
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 0],
      [1, 1, 0, 1],
    ],
    [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
    ],
  ];

  const winningCell = [4, 3]; // Bottom-right corner

  const maze = useMemo(() => fixedMaze, [gameId]);
  const maxColIndex = maze[0].length - 1;

  // Set CSS variables for maze rows and columns
  useEffect(() => {
    const mazeRows = maze.length;
    const mazeCols = maze[0].length;
    document.documentElement.style.setProperty('--maze-rows', mazeRows);
    document.documentElement.style.setProperty('--maze-cols', mazeCols);
  }, [maze]);

  // Move player with delay
  const movePlayer = (gamma, beta) => {
    const currentTime = Date.now();
    //
    // // Prevent rapid movement
    // if (currentTime - lastMoveTime < moveDelay) {
    //   return;
    // }

    setLastMoveTime(currentTime);
    let newPosition = [...userPosition];

    // Move right while gamma indicates right movement
    while (gamma > 5) {
      newPosition[1] = Math.min(newPosition[1] + 1, maze[0].length - 1); // Move right
      gamma -= 5; // Decrease gamma to eventually exit the loop
    }

    // Move left while gamma indicates left movement
    while (gamma < -5) {
      newPosition[1] = Math.max(newPosition[1] - 1, 0); // Move left
      gamma += 5; // Increase gamma to eventually exit the loop
    }

    // Move down while beta indicates downward movement
    while (beta > 5) {
      newPosition[0] = Math.min(newPosition[0] + 1, maze.length - 1); // Move down
      beta -= 5; // Decrease beta to eventually exit the loop
    }

    // Move up while beta indicates upward movement
    while (beta < -5) {
      newPosition[0] = Math.max(newPosition[0] - 1, 0); // Move up
      beta += 5; // Increase beta to eventually exit the loop
    }

    // Only update user position if it's within bounds
    if (
      newPosition[0] >= 0 &&
      newPosition[0] < maze.length &&
      newPosition[1] >= 0 &&
      newPosition[1] < maze[0].length &&
      maze[newPosition[0]][newPosition[1]] !== 1 // Check if the cell is not a wall
    ) {
      setUserPosition(newPosition);
      //setSelectedCell(newPosition);
    }
  };

  let permission;

  // Handle device motion
  useEffect(() => {
    const handleDeviceMotion = (event) => {
      console.log(targetLocked);
      if (!targetLocked) {
        const { beta, gamma } = event; // Get beta (x-axis) and gamma (z-axis)
        console.log('moving');
        movePlayer(gamma, beta);
      }
    };

    const requestPermission = async () => {
      if (DeviceOrientationEvent.requestPermission) {
        try {
          permission = await DeviceOrientationEvent.requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceMotion);
          } else {
            console.log('Permission not granted for device orientation.');
          }
        } catch (error) {
          console.error(
            'Error requesting device orientation permission',
            error
          );
        }
      } else {
        window.addEventListener('deviceorientation', handleDeviceMotion);
      }
    };

    requestPermission();
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceMotion);
    };
  }, [permission, targetLocked]);

  const restartGame = () => {
    setGameId((prevId) => prevId + 1);
    setUserPosition([3, 3]);
    setSelectedCellX(null); // Reset selected cell
    setSelectedCellY(null);
  };

  const handleConfirm = () => {
    if (!targetLocked) {
      setTargetLocked(true);

      setSelectedCellX(userPosition[0]);
      setSelectedCellY(userPosition[1]);

      setPuzzleValue({
        x: userPosition[0],
        y: userPosition[1],
      });
    } else {
      setTargetLocked(false);
      setSelectedCellX(null);
      setSelectedCellY(null);
    }
  };

  return (
    <div className="maze-container">
      <div className="maze">
        {maze.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${rowIndex === selectedCellX && colIndex === selectedCellY ? 'selected' : ''}`}
            >
              {userPosition[0] === rowIndex && userPosition[1] === colIndex && (
                <div className="player"></div>
              )}
            </div>
          ))
        )}
      </div>

      <button className="maze-btn" onClick={handleConfirm}>
        {!targetLocked ? 'Set Target' : 'Release Target'}
      </button>
    </div>
  );
}
