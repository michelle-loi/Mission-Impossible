import './CompassWires.scss';
import Compass from './Compass.jsx';
import resistorIMG from '../../assets/resistor2.png';
import { useState } from 'react';
import { playAudio } from '../../utils/useAudio.jsx';
import overheatSFX from '../../assets/overheat.mp3';

const CompassWires = () => {
  const [heading, setHeading] = useState(0);
  const [resistorsSelected, setResistorsSelected] = useState([]);
  const [pendingResistor, setPendingResistor] = useState(null);

  /**
   * Handles when a resistor is clicked. If it is the first time the resistor
   * is clicked then we will set it as the resistor the user wants to set.
   * If they click the same resistor again, if there is a heading
   * we will set it as a resistor value.
   * ONLY SET 3 resistors.
   * @param resistorId the resistor the user is setting
   */
  const handleResistorClick = (resistorId) => {
    if (pendingResistor === resistorId) {
      // Finalize the resistor (store its value)
      if (heading !== null) {
        // Update the resistors, keep only the last 3
        const roundHeading = heading.toFixed(0);
        setResistorsSelected((prev) => {
          const newResistors = [...prev, { resistorId, heading: roundHeading }];
          if (newResistors.length > 3) {
            newResistors.shift(); // remove the oldest entry (it's a queue!!!!!)
          }
          return newResistors;
        });
      }
      setPendingResistor(null); // Clear pending state
    } else {
      // If a different resistor was previously pending, clear it
      setPendingResistor(resistorId);
    }
    playAudio(new Audio(overheatSFX), 0.8, 1);
  };

  return (
    <div className="compass-wires-container">
      <div className="compass-wires">
        <div className="wire wire1">
          <div className="light-drop-container">
            <div className="light-drop light-drop-1"></div>
          </div>
          <img
            className={`resistor resistor-1 ${pendingResistor === 'res-1' ? 'resistor-overheat' : ''}`}
            src={resistorIMG}
            alt=""
            onClick={() => handleResistorClick('res-1')}
          />
        </div>

        <div className="wire wire2">
          <div className="light-drop-container">
            <div className="light-drop light-drop-2"></div>
          </div>
          <img
            className={`resistor resistor-2 ${pendingResistor === 'res-2' ? 'resistor-overheat' : ''}`}
            src={resistorIMG}
            alt=""
            onClick={() => handleResistorClick('res-2')}
          />
        </div>

        <div className="wire wire3">
          <div className="light-drop-container">
            <div className="light-drop light-drop-3"></div>
          </div>
          <img
            className={`resistor resistor-3 ${pendingResistor === 'res-3' ? 'resistor-overheat' : ''}`}
            src={resistorIMG}
            alt=""
            onClick={() => handleResistorClick('res-3')}
          />
        </div>

        <div className="wire wire4">
          <div className="light-drop-container">
            <div className="light-drop light-drop-4"></div>
          </div>
          <img
            className={`resistor resistor-4 ${pendingResistor === 'res-4' ? 'resistor-overheat' : ''}`}
            src={resistorIMG}
            alt=""
            onClick={() => handleResistorClick('res-4')}
          />
        </div>

        <div className="wire wire5">
          <div className="light-drop-container">
            <div className="light-drop light-drop-5"></div>
          </div>
          <img
            className={`resistor resistor-5 ${pendingResistor === 'res-5' ? 'resistor-overheat' : ''}`}
            src={resistorIMG}
            alt=""
            onClick={() => handleResistorClick('res-5')}
          />
        </div>

        <div className="wire wire6">
          <div className="light-drop-container">
            <div className="light-drop light-drop-6"></div>
          </div>
          <img
            className={`resistor resistor-6 ${pendingResistor === 'res-6' ? 'resistor-overheat' : ''}`}
            src={resistorIMG}
            alt=""
            onClick={() => handleResistorClick('res-6')}
          />
        </div>
      </div>
      <div className="compass-wires-compass">
        <Compass heading={heading} setHeading={setHeading} />

        {/* Used to test the heading values remove later */}
        {/*<ul className="resistor-setting-test">*/}
        {/*  <li>Test</li>*/}
        {/*  {resistorsSelected.map((resistor, index) => (*/}
        {/*    <li key={index}>*/}
        {/*      {resistor.resistorId}: {resistor.heading}*/}
        {/*    </li>*/}
        {/*  ))}*/}
        {/*</ul>*/}
      </div>
    </div>
  );
};

export default CompassWires;
