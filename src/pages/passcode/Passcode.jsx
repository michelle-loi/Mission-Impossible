import Bomb from '../../components/bomb/Bomb.jsx';
import Toggles from '../../components/toggles/Toggles.jsx';
import Modal from '../../components/modal/Modal.jsx';
import LightSensor from '../../components/battery/LightSensor.jsx';
import CompassWires from '../../components/compass/CompassWires.jsx';
import Timer from '../../components/timer/Timer.jsx';
import CutWire from '../../components/cutwire/CutWire.jsx';
import { useState } from 'react';
import './Passcode.scss';
import { useNavigate } from 'react-router-dom';

const Passcode = () => {
  const [side, setSide] = useState('front');
  const [puzzleNum, setPuzzleNum] = useState(null);
  const [dontHoldBomb, setDontHoldBomb] = useState(false);
  const [puzzlesDone, setPuzzlesDone] = useState({
    battery: false,
    cutWire: false
  });
  const [correctPuzzleValues, setCorrectPuzzleValues] = useState({
    battery: false,
    cutWire: false
  });
  const clearPuzzle = () => {
    setPuzzleNum(null);
  };

  const navigate = useNavigate();

  // https://stackoverflow.com/questions/70612769/how-do-i-recognize-swipe-events-in-react
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 100;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = () => {
    // if a modal is open prevent the user from going back to the lockscreen
    if (!touchStart || !touchEnd || puzzleNum) return;
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < -minSwipeDistance;
    if (isSwipeDown) {
      // console.log('swiping');
      navigate('/');
    }
  };

  return (
    <div
      className="passcode_screen"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Bomb 
        side={side}
        setPuzzleNum={setPuzzleNum}
        setDontHoldBomb={setDontHoldBomb}
        puzzlesDone={puzzlesDone} />
      <Toggles isDisabled={dontHoldBomb} side={side} setSide={setSide} />

      {/* Puzzles */}
      <Modal 
        closeModal={() => { 
          clearPuzzle();
          setPuzzlesDone({
            ...puzzlesDone,
            lightSensor: true
          });
        }
      } 
        isVisible={puzzleNum === 1}>
        <LightSensor setPuzzleValue={(value) => {
            setCorrectPuzzleValues({
              ...correctPuzzleValues,
              // TODO: replace condition with actual passcode
              lightSensor: (value.lux1 >= 2000)
            });
          }}/>
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 2}>
        <CompassWires />
      </Modal>

      <Modal 
        closeModal={() => { 
            clearPuzzle();
            setPuzzlesDone({
              ...puzzlesDone,
              cutWire: true
            });
          }
        } 
        isVisible={puzzleNum === 3}>
        <CutWire setPuzzleValue={(value) => {
            setCorrectPuzzleValues({
              ...correctPuzzleValues,
              cutWire: (value.redIsCut && value.yellowIsCut && !value.purpleIsCut)
            });
          }}/>
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 4}>
        <div>Puzzle 4</div>
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 5}>
        <Timer />
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 6}>
        <div>Puzzle 6</div>
      </Modal>
    </div>
  );
};

export default Passcode;
