import { useEffect, useState } from 'react';
import Battery from './Battery.jsx';
import './LightSensor.scss';
/**
 * https://deanhume.com/ambient-light-sensor/
 * https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor
 * @returns {JSX.Element}
 * @constructor
 */
const LightSensor = () => {
  const [lux, setLux] = useState(0);

  useEffect(() => {
    let sensor;

    const handleLuminance = () => {
      setLux(sensor.illuminance);
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
  }, []);

  return (
    <div className="light-sensor">
      <div className="battery-container">
        <div className="battery-cell">
          <Battery lux={lux} />
          <div className="battery-indicator battery-indicator-1"></div>
        </div>
        <div className="battery-cell">
          <Battery lux={lux} />
          <div className="battery-indicator battery-indicator-2"></div>
        </div>
        <div className="battery-cell">
          <Battery lux={lux} />
          <div className="battery-indicator battery-indicator-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LightSensor;
