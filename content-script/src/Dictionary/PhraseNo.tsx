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

function PhraseNo({ data, isShowedTran }) {
  return (
    <div className="container">
      <div className="phrase">{data.phrase}</div>
      {isShowedTran && <div className="translation">{data.translation}</div>}

      <div className="section">
        <div className="title">Definition</div>
        {data.definition}
      </div>
      <div className="section">
        <div className="title">Region & Frequency</div>
        <div className="frequency">
          {Object.entries(data.regionAndFrequency).map(([key, value]) => {
            const regionCode = capitalizeFirstCharacter(key) || "Other"; // Return "Other" if the key is not found
            return (
              <span key={key}>
                {regionCode}: {value}/10
              </span>
            );
          })}
        </div>
      </div>
      <div className="section">
        <div className="title">Usage in Context</div>
        {data.contexts.map((context, index) => (
          <div key={index} className="context-item">
            <div className="context-label">{context.context}</div>
            <div className="context-usage">{context.usage}</div>
          </div>
        ))}
      </div>
      <div className="section synonym-antonym-row">
        <div>
          <div className="title">Synonyms</div>
          <ul className="list">
            {data.synonyms.map((synonym, index) => (
              <li key={index} className="list-item">
                {synonym}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="title">Antonyms</div>
          <ul className="list">
            {data.antonyms.map((antonym, index) => (
              <li key={index} className="list-item">
                {antonym}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="note">{data.note}</div>
    </div>
  );
}

export default PhraseNo;
