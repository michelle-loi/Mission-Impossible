import Bomb from '../../components/bomb/Bomb.jsx';
import Toggles from '../../components/toggles/Toggles.jsx';
import Modal from '../../components/modal/Modal.jsx';
import LightSensor from '../../components/battery/LightSensor.jsx';
import CompassWires from '../../components/compass/CompassWires.jsx';
import Timer from '../../components/timer/Timer.jsx';
import CutWire from '../../components/cutwire/CutWire.jsx';
import { useEffect, useState } from 'react';
import './Passcode.scss';
import { useNavigate } from 'react-router-dom';
import ControlBtn from '../../components/controlbtn/ControlBtn.jsx';
import { AnimatePresence, motion } from 'framer-motion';

const Passcode = () => {
  const [side, setSide] = useState('front');
  const [puzzleNum, setPuzzleNum] = useState(null);
  const [dontHoldBomb, setDontHoldBomb] = useState(false);
  const [puzzlesDone, setPuzzlesDone] = useState({
    compassWires: false,
    lightSensor: false,
    cutWire: false,
    timer: false,
  });
  const [correctPuzzleValues, setCorrectPuzzleValues] = useState({
    compassWires: false,
    lightSensor: false,
    cutWire: false,
    timer: false,
  });
  const [showToggles, setShowToggles] = useState(false);

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

  // If the toggles were shown and the user holds the bomb, when they
  // release the bomb make sure the toggles are hidden as well
  useEffect(() => {
    if (dontHoldBomb || !puzzleNum) {
      setShowToggles(false);
    }
  }, [dontHoldBomb, puzzleNum]);

  const ToggleVariants = {
    initial: { opacity: 0, y: 100 }, // start below
    in: { opacity: 1, y: 0 }, // animate into view
    exit: { opacity: 0, y: 100 }, // animate below again
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
        setShowToggles={setShowToggles}
        dontHoldBomb={dontHoldBomb}
        puzzlesDone={puzzlesDone}
      />

      {/* Puzzles */}
      <Modal
        closeModal={() => {
          clearPuzzle();
          setPuzzlesDone({
            ...puzzlesDone,
            lightSensor: true,
          });
        }}
        isVisible={puzzleNum === 1}
      >
        <LightSensor
          setPuzzleValue={(value) => {
            const { lux1, lux2, lux3 } = value;

            const isCorrect =
              lux1 >= 1000 &&
              lux1 < 2000 &&
              lux2 >= 3000 &&
              lux2 < 4000 &&
              lux3 >= 5000;

            setCorrectPuzzleValues({
              ...correctPuzzleValues,
              lightSensor: isCorrect,
            });
          }}
        />
      </Modal>

      <Modal
        closeModal={() => {
          clearPuzzle();
          setPuzzlesDone({
            ...puzzlesDone,
            compassWires: true,
          });
        }}
        isVisible={puzzleNum === 2}
      >
        <CompassWires
          setPuzzleValue={(value) => {
            // Correct answers with the expected values
            const compassAns = [
              { id: 'res-1', value: 68 },
              { id: 'res-5', value: 256 },
              { id: 'res-6', value: 145 },
            ];

            // iterate through every object and check via indices to make sure
            // correct order
            const isCorrect =
              value.length === compassAns.length &&
              value.every(
                (val, index) =>
                  val.resistorId === compassAns[index].id &&
                  Math.abs(val.heading - compassAns[index].value) <= 3 // ±3 buffer (for my shaky hands)
              );

            setCorrectPuzzleValues({
              ...correctPuzzleValues,
              compassWires: isCorrect,
            });
          }}
        />
      </Modal>

      <Modal
        closeModal={() => {
          clearPuzzle();
          setPuzzlesDone({
            ...puzzlesDone,
            cutWire: true,
          });
        }}
        isVisible={puzzleNum === 3}
      >
        <CutWire
          setPuzzleValue={(value) => {
            setCorrectPuzzleValues({
              ...correctPuzzleValues,
              cutWire:
                value.redIsCut && value.yellowIsCut && !value.purpleIsCut,
            });
          }}
        />
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 4}>
        <div>Puzzle 4</div>
      </Modal>

      <Modal
        closeModal={() => {
          clearPuzzle();
          setPuzzlesDone({
            ...puzzlesDone,
            timer: true,
          });
        }}
        isVisible={puzzleNum === 5}
      >
        <Timer
          setPuzzleValue={(value) => {
            setCorrectPuzzleValues({
              ...correctPuzzleValues,
              timer:
                value.timeLeft > 0 && value.passcode.split('-4') === '6969',
            });
          }}
        />
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 6}>
        <div>Puzzle 6</div>
      </Modal>

      <div className="passcode__attempt">
        <ControlBtn text={'Reset'} color={28} />
        <ControlBtn text={'Defuse'} />
      </div>

      <AnimatePresence>
        {showToggles && !dontHoldBomb && !puzzleNum && (
          <motion.div
            key={'toggle-unique-key'}
            className="passcode__toggles"
            initial="initial"
            animate="in"
            exit="exit"
            variants={ToggleVariants}
            transition={{ duration: 0.4 }}
          >
            <Toggles isDisabled={dontHoldBomb} side={side} setSide={setSide} />
          </motion.div>
        )}
      </AnimatePresence>

      {/*<div>truth: {correctPuzzleValues.lightSensor ? 'true' : 'false'}</div>*/}
    </div>
  );
};

export default Passcode;