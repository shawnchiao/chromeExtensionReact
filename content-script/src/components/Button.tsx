import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tooltipStyle: React.CSSProperties = {
    width:"4.5rem",
    position: "absolute",
    bottom: "calc(100% + 5px)", // Changed from top to bottom
    left: "50%",
    transform: "translateX(-50%)",
    padding: "0.3rem",
    borderRadius: "0.25rem",
    backgroundColor: "hsl(222.2 84% 4.9%)",
    color: "hsl(210 40% 98%)",
    fontSize: "0.6rem",
    fontWeight: "500",
    zIndex: 2147483647,
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.2s",
    pointerEvents: isVisible ? "auto" : "none",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  };

  return (
    <div style={{ position: "relative" }} ref={tooltipRef}>
      {React.cloneElement(children, {
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
      })}
      <div style={tooltipStyle}>{content}</div>
    </div>
  );
};

interface ButtonProps {
  handleClick: () => void;
  isSmall?: boolean;
  children: string;
  tooltip?: string;
}

const Button: React.FC<ButtonProps> = ({
  handleClick,
  isSmall = false,
  children,
  tooltip,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0.5rem",
    fontSize: isSmall ? "1.25rem" : "default",
    fontWeight: isSmall ? "500" : "700",
    transition: "background-color 0.2s, color 0.2s, transform 0.2s",
    outline: "none",
    border: "1px solid #d1d5db",
    backgroundColor: isPressed ? "#f6f4f3" : isHovered ? "#f3f4f6" : "white",
    color: isPressed || isHovered ? "#111827" : "#374151",
    height: isSmall ? "1rem" : "default",
    width: isSmall ? "1rem" : "default",
    padding: isSmall ? "0.9rem 0.9rem" : "0.5rem 1rem",
    cursor: "pointer",
    transform: isPressed ? "scale(0.9)" : "scale(1)",
  };

  const buttonElement = (
    <button
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={buttonStyle}
    >
      {children}
    </button>
  );

  return tooltip ? (
    <Tooltip content={tooltip}>{buttonElement}</Tooltip>
  ) : (
    buttonElement
  );
};

export default Button;
