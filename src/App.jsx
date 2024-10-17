import './App.scss';
import Bomb from './components/bomb/Bomb.jsx';
import { useState } from 'react';
import Toggles from './components/toggles/Toggles.jsx';
import Modal from './components/modal/Modal.jsx';
import LightSensor from './components/battery/LightSensor.jsx';
import Battery from './components/battery/Battery.jsx';
import circuitBG from './assets/circuit.png';

function App() {
  const [side, setSide] = useState('front');
  const [puzzleNum, setPuzzleNum] = useState(-1);
  const clearPuzzle = () => {
    setPuzzleNum(-1);
  };

  const batteryModalStyles = {
    background: `url(${circuitBG}) no-repeat center center`,
    backgroundSize: 'cover',
  };

  return (
    <div className="app-container">
      <Bomb side={side} setPuzzleNum={setPuzzleNum} />
      <Toggles side={side} setSide={setSide} />
      {puzzleNum === 1 && (
        <Modal closeModal={clearPuzzle} styles={batteryModalStyles}>
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
