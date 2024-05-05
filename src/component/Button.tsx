// @ts-nocheck

const Button = ({ onClick, text }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
