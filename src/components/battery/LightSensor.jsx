import { useEffect, useState } from 'react';
import Battery from './Battery.jsx';
import './LightSensor.scss';
import batteryResetSFX from '../../assets/battery-reset.mp3';
import batteryStartSFX from '../../assets/battery-start.mp3';
import { playAudio } from '../../utils/useAudio.jsx';

/**
 * https://deanhume.com/ambient-light-sensor/
 * https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor
 * @returns {JSX.Element}
 * @constructor
 */
const LightSensor = () => {
  const [lux1, setLux1] = useState(-1);
  const [lux2, setLux2] = useState(-1);
  const [lux3, setLux3] = useState(-1);

  const [batteryNum, setBatteryNum] = useState(-1);

  useEffect(() => {
    let sensor;

    const handleLuminance = () => {
      switch (batteryNum) {
        case 1:
          setLux1(sensor.illuminance);
          break;
        case 2:
          setLux2(sensor.illuminance);
          break;
        case 3:
          setLux3(sensor.illuminance);
          break;
        default:
          break;
      }
    };

    const handleError = (event) => {
      alert(
        'An error occurred with the light sensor. Refresh page and try again.'
      );
    };

    if ('AmbientLightSensor' in window) {
      try {
        sensor = new AmbientLightSensor();
        sensor.addEventListener('reading', handleLuminance);
        sensor.addEventListener('error', handleError);
        sensor.start();
      } catch (e) {
        handleError();
      }
    }

    return () => {
      if (sensor) {
        sensor.removeEventListener('reading', handleLuminance);
        sensor.removeEventListener('error', handleError);
        sensor.stop();
      }
    };
  }, [batteryNum]);

  const clickHandler = (battery) => {
    if (battery === batteryNum) {
      setBatteryNum(-1);
      playAudio(new Audio(batteryStartSFX), 0.8, 0.006);
    } else {
      playAudio(new Audio(batteryResetSFX), 0.8, 0.006);
      switch (battery) {
        case 1:
          setLux1(-1);
          break;
        case 2:
          setLux2(-1);
          break;
        case 3:
          setLux3(-1);
          break;
        default:
          break;
      }
      setBatteryNum(battery);
      console.log(`Clicked: ${battery}`);
    }
  };

  return (
    <div className="light-sensor">
      <div className="battery-container">
        <div className="battery-cell" onClick={() => clickHandler(1)}>
          <Battery lux={lux1} />
          <div
            className={`battery-indicator battery-indicator-1 ${lux1 >= 1000 ? 'battery-indicator-charged' : ''}`}
          ></div>
        </div>
        <div className="battery-cell" onClick={() => clickHandler(2)}>
          <Battery lux={lux2} />
          <div
            className={`battery-indicator battery-indicator-2 ${lux2 >= 1000 ? 'battery-indicator-charged' : ''}`}
          ></div>
        </div>
        <div className="battery-cell" onClick={() => clickHandler(3)}>
          <Battery lux={lux3} />
          <div
            className={`battery-indicator battery-indicator-3 ${lux3 >= 1000 ? 'battery-indicator-charged' : ''}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LightSensor;
