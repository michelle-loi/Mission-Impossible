import './LockScreen.scss';
import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa6';
import { MdNetworkWifi } from 'react-icons/md';
import { MdSignalCellular3Bar } from 'react-icons/md';
import { MdBattery90 } from 'react-icons/md';
import { FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LockScreen = () => {
  const navigate = useNavigate();

  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format date with NA locale
      const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });

      // Format 12-hour clock with no seconds
      let time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      time = time.replace(/ AM| PM/, '');

      setDateTime({ date, time });
    };

    // Call function on mount to set date and time
    updateDateTime();

    // Call function every second to update
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > minSwipeDistance;
    if (isSwipeUp) {
      //console.log('swiping')
      navigate('/passcode');
    }
  };

  return (
    <div
      className="lockscreen"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="lockscreen__info">
        <MdNetworkWifi />
        <MdSignalCellular3Bar />
        <MdBattery90 />
      </div>
      <div className="lockscreen__datetime">
        <div className="lockscreen__time">{dateTime.time}</div>
        <div className="lockscreen__date">
          {dateTime.date}
          <FaSun />
        </div>
      </div>

      <div className="lockscreen__camera">
        <div className="camera__wrapper">
          <FaCamera size={30} />
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
