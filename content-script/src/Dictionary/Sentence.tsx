// @ts-nocheck

import "./phraseCo.css";

function capitalizeFirstCharacter(str) {
  if (typeof str !== "string") {
    return ""; // Returns an empty string if the input is not a string
  }

  if (str.length === 0) {
    return ""; // Returns an empty string if the input is empty
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

const containerStyles = {
  maxWidth: '350px',
  margin: '20px auto',
  padding: '20px 0',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
};

const phraseStyles = {
  fontSize: '24px',
  color: '#2a6496',
  marginLeft: '10px',
  marginBottom: '15px',
  fontWeight: 'bold'
};

const translationStyles = {
  fontSize: '15px',
  color: 'rgb(82, 86, 90)',
  marginLeft: '12px',
  marginBottom: '15px'
};
const sectionStyles = {
  marginBottom: '20px',
  borderRadius: '10px',
  padding: '15px',
  backgroundColor: "#fff"
};

const titleStyles = {
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px'
};

const distilledStyles = {
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '15px',
  backgroundColor: '#f1efec'
};

const contextItemStyles = {
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '15px',
  backgroundColor: '#ecf0f1'
};


function Sentence({ data, isShowedTran }) {
  return (
    <div style={containerStyles}>
      <div style={phraseStyles}>{data.sentence}</div>
      {isShowedTran && <div style={translationStyles}>{data.translation}</div>}
      <div className="section">
        <div className="title">Overall Explanation</div>
        <div>{data.overallExplanation}</div>
      </div>
      <div style={sectionStyles}>
        <div style={titleStyles}>Thought Groups</div>
        {data.thoughtGroups.map((group, index) => (
          <div key={index} style={contextItemStyles}>
            <div style={titleStyles}>{group.text}</div>
            <div>{group.explanation}</div>
          </div>
        ))}
      </div>

      <div  style={sectionStyles}>
        <div style={titleStyles}>Distilled Expressions</div>
        {data.distilledExpressions.map((expression, index) => (
          <div key={index} style={distilledStyles}>
            <div style={titleStyles}>{expression.expression}</div>
            <div>{expression.definition}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sentence;
