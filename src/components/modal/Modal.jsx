import './Modal.scss';

const Modal = ({ children, closeModal, styles }) => {
  return (
    <div className="modal-container" style={{ ...styles }}>
      <button className="modal__set-btn" onClick={closeModal}>
        Set
      </button>
      {children}
    </div>
  );
};

export default Modal;
