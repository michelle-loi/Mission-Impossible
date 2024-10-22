import './HomeScreen.scss';
import gmail from '../../assets/new-logo-gmail-svgrepo-com.png';
import maps from '../../assets/google-logo-new-maps-svgrepo-com.png';
import photos from '../../assets/google-logo-photos-new-svgrepo-com.png';
import youtube from '../../assets/youtube-svgrepo-com.png';
import chrome from '../../assets/chrome-svgrepo-com.png';
import google from '../../assets/google-logo-search-new-svgrepo-com.png';
import assistant from '../../assets/assistant-logo-new-google-svgrepo-com.png';
import Clock from '../../components/clock/Clock.jsx';
import {
  MdBattery90,
  MdNetworkWifi,
  MdSignalCellular3Bar,
} from 'react-icons/md';
const HomeScreen = () => {
  return (
    <div className="homescreen">
      <div className="homescreen__upper">
        <div className="homescreen__info">
          <MdNetworkWifi />
          <MdSignalCellular3Bar />
          <MdBattery90 />
        </div>
        <div>
          <Clock />
        </div>
      </div>
      <div className="homescreen__lower">
        <div className="homescreen__apps">
          <img className="homescreen__logo" src={gmail} alt="" />
          <img className="homescreen__logo" src={maps} alt="" />
          <img className="homescreen__logo" src={photos} alt="" />
          <img className="homescreen__logo" src={youtube} alt="" />
          <img className="homescreen__logo" src={chrome} alt="" />
        </div>
        <div className="homescreen__search">
          <img className="search-logo" src={google} alt="" />
          <img className="search-logo" src={assistant} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
