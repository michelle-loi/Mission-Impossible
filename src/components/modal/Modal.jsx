import './Modal.scss';

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal-container">
      <div>
        <button onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
