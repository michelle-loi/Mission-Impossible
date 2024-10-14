import './Bomb.scss';
import { useState } from 'react';
import bombFront from '../../assets/bomb_front.png';
import bombBack from '../../assets/bomb_back.png';
import bombTop from '../../assets/bomb_top.png';
import bombBottom from '../../assets/bomb_bottom.png';
import bombSide from '../../assets/bomb_side.png';
import Light from '../light/Light.jsx';

/**
 * This code is based on: https://3dtransforms.desandro.com/box
 * @returns Bomb element
 */
const Bomb = ({ side, setPuzzleNum }) => {
  return (
    <>
      <div className="bomb-scene">
        <div className={`bomb show-${side}`}>
          <div className="bomb__face bomb__face--front">
            <img src={bombFront} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(1)}>
              Puzzle 1
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--back">
            <img src={bombBack} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(2)}>
              Puzzle 2
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--right">
            <img src={bombSide} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(3)}>
              Puzzle 3
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--left">
            <img src={bombSide} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(4)}>
              Puzzle 4
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--top">
            <img src={bombTop} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(5)}>
              Puzzle 5
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--bottom">
            <img src={bombBottom} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(6)}>
              Puzzle 6
            </button>
            <Light />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bomb;
