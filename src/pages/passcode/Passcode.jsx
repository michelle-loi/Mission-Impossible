import Bomb from '../../components/bomb/Bomb.jsx';
import Toggles from '../../components/toggles/Toggles.jsx';
import Modal from '../../components/modal/Modal.jsx';
import LightSensor from '../../components/battery/LightSensor.jsx';
import CompassWires from '../../components/compass/CompassWires.jsx';
import { useEffect, useState } from 'react';
import './Passcode.scss';
import { useNavigate } from 'react-router-dom';
import ControlBtn from '../../components/controlbtn/ControlBtn.jsx';
import { AnimatePresence, motion } from 'framer-motion';

const Passcode = () => {
  const [side, setSide] = useState('front');
  const [puzzleNum, setPuzzleNum] = useState(null);
  const [dontHoldBomb, setDontHoldBomb] = useState(false);
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
    if (dontHoldBomb) {
      setShowToggles(false);
    }
  }, [dontHoldBomb]);

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
      />

      {/* Puzzles */}
      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 1}>
        <LightSensor />
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 2}>
        <CompassWires />
      </Modal>

      <Modal closeModal={clearPuzzle} isVisible={puzzleNum === 3}>
        <div>Puzzle 3</div>
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

      <div className="passcode__attempt">
        <ControlBtn text={'Reset'} />
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
    </div>
  );
};

export default Passcode;
