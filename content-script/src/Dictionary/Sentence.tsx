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

function Sentence({ data, isShowedTran }) {
  return (
    <div className="container">
      <div className="phrase">{data.sentence}</div>
      {isShowedTran && <div className="translation">{data.translation}</div>}
      <div className="section">
        <div className="title">Overall Explanation</div>
        <div className="overall-explanation">{data.overallExplanation}</div>
      </div>
      <div className="section">
        <div className="title">Thought Groups</div>
        {data.thoughtGroups.map((group, index) => (
          <div key={index} className="context-item">
            <div className="title">{group.text}</div>
            <div className="explanation">{group.explanation}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="title">Distilled Expressions</div>
        {data.distilledExpressions.map((expression, index) => (
          <div key={index} className="distilled">
            <div className="title">{expression.expression}</div>
            <div className="definition">{expression.definition}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sentence;
