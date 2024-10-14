import './Toggles.scss';

/**
 * This code is based on: https://3dtransforms.desandro.com/box
 * @param side the state used to hold which side to display
 * @param setSide the setter is set which side to display
 * @returns {JSX.Element} The radio buttons
 */
const Toggles = ({ side, setSide }) => {
  /**
   * Get the side selected from the radio button
   * @param event the radio button click
   */
  const selectSide = (event) => {
    const selectedSide = event.target.value;
    setSide(selectedSide);
  };

  return (
    <div className="toggle">
      <label className="toggle__label">
        <input
          type="radio"
          name="rotate-cube-side"
          value="front"
          checked={side === 'front'}
          onChange={selectSide}
        />
        Front
      </label>
      <label className="toggle__label">
        <input
          type="radio"
          name="rotate-cube-side"
          value="right"
          checked={side === 'right'}
          onChange={selectSide}
        />
        Right
      </label>
      <label className="toggle__label">
        <input
          type="radio"
          name="rotate-cube-side"
          value="back"
          checked={side === 'back'}
          onChange={selectSide}
        />
        Back
      </label>
      <label className="toggle__label">
        <input
          type="radio"
          name="rotate-cube-side"
          value="left"
          checked={side === 'left'}
          onChange={selectSide}
        />
        Left
      </label>
      <label className="toggle__label">
        <input
          type="radio"
          name="rotate-cube-side"
          value="top"
          checked={side === 'top'}
          onChange={selectSide}
        />
        Top
      </label>
      <label className="toggle__label">
        <input
          type="radio"
          name="rotate-cube-side"
          value="bottom"
          checked={side === 'bottom'}
          onChange={selectSide}
        />
        Bottom
      </label>
    </div>
  );
};

export default Toggles;
