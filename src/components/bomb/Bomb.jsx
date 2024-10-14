import './Bomb.scss';
import { useState } from 'react';
import bombFront from '../../assets/bomb_front.png';
import bombBack from '../../assets/bomb_back.png';
import bombTop from '../../assets/bomb_top.png';
import bombBottom from '../../assets/bomb_bottom.png';
import bombSide from '../../assets/bomb_side.png';
import Light from '../light/Light.jsx';
import key1 from '../../assets/key_1.png';
import key2 from '../../assets/key_2.png';
import key3 from '../../assets/key_3.png';
import key4 from '../../assets/key_4.png';
import key5 from '../../assets/key_5.png';
import key6 from '../../assets/key_6.png';

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
              <img className="modal-btn__img" src={key1} alt="" />
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--back">
            <img src={bombBack} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(2)}>
              <img className="modal-btn__img" src={key2} alt="" />
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--right">
            <img src={bombSide} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(3)}>
              <img className="modal-btn__img" src={key3} alt="" />
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--left">
            <img src={bombSide} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(4)}>
              <img className="modal-btn__img" src={key4} alt="" />
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--top">
            <img src={bombTop} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(5)}>
              <img className="modal-btn__img" src={key5} alt="" />
            </button>
            <Light />
          </div>
          <div className="bomb__face bomb__face--bottom">
            <img src={bombBottom} alt="" className="bomb__img" />
            <button className="bomb__modal-btn" onClick={() => setPuzzleNum(6)}>
              <img className="modal-btn__img" src={key6} alt="" />
            </button>
            <Light />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bomb;
