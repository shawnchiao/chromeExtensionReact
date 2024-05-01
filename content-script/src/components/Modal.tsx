// @ts-nocheck
import React, { useRef, useCallback } from "react";

export const Modal = ({
  index,
  modalId,
  children,
  closeModal,
  position,
  onDragStart,
}) => {
  const modalRefs = useRef([]);
  const getModalRef = useCallback((index) => {
    if (!modalRefs.current[index]) {
      modalRefs.current[index] = React.createRef();
    }
    return modalRefs.current[index];
  }, []);

  return (
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
        maxHeight: "55vh",
        overflow: "hidden",
        // border: "5px solid #d1d1d1",
        borderRadius: "15px",
        boxShadow: `0 0 0 2px #d1d1d1, 
        0 10px 15px -3px rgba(0, 0, 0, 0.1), 
        0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
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
          zIndex: 2147483649,
          cursor: "move",
        }}
        onMouseDown={(event) => onDragStart(index, event)}
      >
        <button
          style={{
            boxSizing: "border-box",
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "15px",
            padding: "5px",
            fontSize: "0",
            lineHeight: "1",
            fontWeight: "900",
            border: "none",
            backgroundColor: "black",
            color: "white",
            borderRadius: "100%",
            cursor: "pointer",
          }}
          onClick={() => closeModal(modalId)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="3"
              y1="3"
              x2="12"
              y2="12"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="3"
              y1="12"
              x2="12"
              y2="3"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>

      {children}
    </div>
  );
};

export default Modal;
