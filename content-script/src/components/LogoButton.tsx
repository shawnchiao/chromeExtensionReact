// @ts-nocheck

const LogoButton = ({ onClick, position }) => {
  return (
    <button
      id="text-selection-button"
      className="logo-button"
      style={{
        backgroundImage: `url(${chrome.runtime.getURL("images/logoT.png")})`,
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 2147483648,
      }}
      onClick={onClick}
    ></button>
  );
}

export default LogoButton;