import './CompassWires.scss';
import Compass from './Compass.jsx';
import resistorIMG from '../../assets/resistor.png';
const CompassWires = () => {
  return (
    <div className="compass-wires-container">
      <div className="compass-wires">
        <div className="wire wire1">
          <div className="light-drop light-drop-1"></div>
        </div>

        <div className="wire wire2">
          <div className="light-drop light-drop-2"></div>
        </div>
        <div className="wire wire3">
          <div className="light-drop light-drop-3"></div>
        </div>
        <div className="wire wire4">
          <div className="light-drop light-drop-4"></div>
        </div>
        <div className="wire wire5">
          <div className="light-drop light-drop-5"></div>
        </div>
        <div className="wire wire6">
          <div className="light-drop light-drop-6"></div>
        </div>
      </div>
      <div className="compass-wires-compass">{/*<Compass />*/}</div>
    </div>
  );
};

export default CompassWires;
