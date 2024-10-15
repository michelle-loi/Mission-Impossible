import React, { useState, useEffect } from 'react';
import './Compass.scss';
import compassImg from '../../assets/compass2.png';

/**
 * Compass tutorial:
 * https://dev.to/orkhanjafarovr/real-compass-on-mobile-browsers-with-javascript-3emi
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientationabsolute_event
 */
const Compass = () => {
  const [heading, setHeading] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Checks for iOS devices
  const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);

  // Checks if permission is requested
  const requiresPermission =
    typeof DeviceOrientationEvent.requestPermission === 'function';

  useEffect(() => {
    /**
     * Sets the heading value in the compass
     * @param event the device movement event
     */
    const handleCompass = (event) => {
      // absolute indicates if the heading value is accurate
      if (event.absolute) {
        // webkit for iOS devices, alpha for android
        let compassValue = event.webkitCompassHeading || event.alpha;

        // if there is a value set it.
        if (event.alpha !== null) {
          setHeading(event.alpha);

          // alert to error
        } else {
          alert(
            'Compass heading could not be found. Reset page and try again.'
          );
        }
      } else {
        alert('Compass heading may not be precise.');
      }
    };

    // If it is iOS or requires permission ask for it
    if (isIOS || requiresPermission) {
      document.body.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === 'granted') {
              setPermissionGranted(true);
              window.addEventListener(
                'deviceorientationabsolute',
                handleCompass
              );
            } else {
              setPermissionGranted(false);
              alert('Permission not granted. You cannot use the application.');
            }
          })
          .catch(() => {
            alert('Compass functionality not supported');
          });
      });
    } else {
      // Non iOS platform (e.g., Android)
      setPermissionGranted(true);
      window.addEventListener('deviceorientationabsolute', handleCompass);
    }

    // cleanup on component unmount
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleCompass);
    };
  }, []);

  return (
    <div className="compass">
      {permissionGranted ? (
        <div className="compass--show">
          <img
            className="compass__img"
            src={compassImg}
            alt=""
            style={{ transform: `rotate(${-heading}deg)` }}
          />
          <div className="compass__heading">{`${heading.toFixed(0)}°`}</div>
        </div>
      ) : (
        <div className="compass--hide">
          <p className="hide__text">
            Click on the screen to grant permission for orientation
          </p>
        </div>
      )}
    </div>
  );
};
export default Compass;
