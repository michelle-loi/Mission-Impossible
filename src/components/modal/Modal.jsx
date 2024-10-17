import './Modal.scss';

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal-container">
      <button className="modal__set-btn" onClick={closeModal}>
        Set
      </button>
      {children}
    </div>
  );
};

export default Modal;
