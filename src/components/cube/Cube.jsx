import './Cube.scss';
import { useState } from 'react';
import Modal from '../modal/Modal.jsx';
const Cube = () => {
  const [puzzleNum, setPuzzleNum] = useState(-1);

  const clearPuzzle = () => {
    setPuzzleNum(-1);
  };

  return (
    <>
      <div className="scene">
        <div className="cube">
          <div className="cube__face cube__face--front">
            <button onClick={() => setPuzzleNum(1)}>Puzzle 1</button>
          </div>
          <div className="cube__face cube__face--back">
            <button onClick={() => setPuzzleNum(2)}>Puzzle 2</button>
          </div>
          <div className="cube__face cube__face--right">
            <button onClick={() => setPuzzleNum(3)}>Puzzle 3</button>
          </div>
          <div className="cube__face cube__face--left">
            <button onClick={() => setPuzzleNum(4)}>Puzzle 4</button>
          </div>
          <div className="cube__face cube__face--top">
            <button onClick={() => setPuzzleNum(5)}>Puzzle 5</button>
          </div>
          <div className="cube__face cube__face--bottom">
            <button onClick={() => setPuzzleNum(5)}>Puzzle 6</button>
          </div>
        </div>
      </div>
      {puzzleNum === 1 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 2 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 3 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 4 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 5 && <Modal closeModal={clearPuzzle} />}
      {puzzleNum === 6 && <Modal closeModal={clearPuzzle} />}
    </>
  );
};

export default Cube;
