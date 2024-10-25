import './App.scss';
import Bomb from './components/bomb/Bomb.jsx';
import { useState } from 'react';
import Toggles from './components/toggles/Toggles.jsx';
import Modal from './components/modal/Modal.jsx';
import LightSensor from './components/battery/LightSensor.jsx';
import CompassWires from './components/compass/CompassWires.jsx';
import MazeGame from './components/maze/Maze.jsx';

function App() {
  const [side, setSide] = useState('front');
  const [puzzleNum, setPuzzleNum] = useState(-1);
  const clearPuzzle = () => {
    setPuzzleNum(-1);
  };

  return (
    <div className="app-container">
      <Bomb side={side} setPuzzleNum={setPuzzleNum} />
      <Toggles side={side} setSide={setSide} />

      {/* Puzzles */}
      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 1}>
        <LightSensor />
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 2}>
        <CompassWires />
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 3}>
        <MazeGame />
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 4}>
        <div>Puzzle 4</div>
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 5}>
        <div>Puzzle 5</div>
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 6}>
        <div>Puzzle 6</div>
      </Modal>
    </div>
  );
}

export default App;
