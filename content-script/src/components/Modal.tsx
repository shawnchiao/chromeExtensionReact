// @ts-nocheck
import React, { useRef, useCallback } from "react";

export const Modal = ({ index, modalId, children, closeModal, position, onDragStart }) => {
  const modalRefs = useRef([]);
  const getModalRef = useCallback((index) => {
    if (!modalRefs.current[index]) {
      modalRefs.current[index] = React.createRef();
    }
    return modalRefs.current[index];
  }, []);


  return(
    <div
      id={`text-selection-modal-${index}`}
      ref={getModalRef(index)}
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        backgroundColor: "white",
        zIndex: 2147483646,
        cursor: "default",
        maxWidth: "350px",
        width: "30%",
        minWidth: "280px",
        maxHeight: "50vh",
        overflow: "auto",
        border: "5px solid #d1d1d1",
        borderRadius: "15px",
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
      }}
    >
      <div
        id="modal-header-lingofloat"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "30px",
          borderRadius: "10px 0",
          backgroundColor: "rgb(209 209 209)",
          borderBottom: "1px solid #d1d1d1",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "10px",
          zIndex: 2147483649,
          cursor: "move",
        }}
        onMouseDown={(event) => onDragStart(index, event)}
      >
        <button
          style={{
            marginRight: "5px",
            padding: "2px 5px",
            fontSize: "15px",
            fontWeight: "900",
            border: "none",
            backgroundColor: "black",
            color: "white",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={() => closeModal(modalId)}
        >
          X
        </button>
      </div>

      {children}
    </div>
  );
};

export default Modal;