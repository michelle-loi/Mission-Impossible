import { useEffect, useState } from 'react';
import Battery from './Battery.jsx';

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
    <div>
      <Battery lux={lux} />
    </div>
  );
};

export default LightSensor;
