import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

const Modal = ({ title, children, id }: ModalProps) => {
  const CloseButton = () => (
    <label
      htmlFor={id}
      className="btn btn-sm btn-circle absolute right-2 top-2"
    >
      ✕
    </label>
  );

  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-11/12 max-w-5xl h-full">
          <CloseButton />
          <h3 className="font-bold text-lg ">{title}</h3>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
