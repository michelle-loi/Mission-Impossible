import './App.scss';
import Bomb from './components/bomb/Bomb.jsx';
import { useState } from 'react';
import Toggles from './components/toggles/Toggles.jsx';
import Modal from './components/modal/Modal.jsx';
import LightSensor from './components/battery/LightSensor.jsx';

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
      {puzzleNum === 1 && (
        <Modal closeModal={clearPuzzle}>
          <LightSensor />
        </Modal>
      )}

      {puzzleNum === 2 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 3 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 4 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 5 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 6 && <Modal closeModal={clearPuzzle} />}
    </div>
  );
}

export default App;
