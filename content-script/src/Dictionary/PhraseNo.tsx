// @ts-nocheck
function capitalizeFirstCharacter(str) {
  if (typeof str !== "string") {
    return ""; // Returns an empty string if the input is not a string
  }

  if (str.length === 0) {
    return ""; // Returns an empty string if the input is empty
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Define the style objects
const containerStyle = {
  maxWidth: '350px',
  margin: '20px auto',
  padding: '20px 0',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`
};

const phraseStyle = {
  fontSize: '24px',
  color: '#2a6496',
  marginLeft: '10px',
  marginBottom: '15px',
  fontWeight: 'bold'
};

const translationStyle = {
  fontSize: '15px',
  color: 'rgb(82, 86, 90)',
  marginLeft: '12px',
  marginBottom: '15px'
};

const sectionStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '0px',
  marginBottom: '20px'
};

const titleStyle = {
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px'
};

const contextItemStyle = {
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '15px',
  backgroundColor: '#ecf0f1'
};

const contextLabelStyle = {
  fontWeight: 'bold',
  marginBottom: '5px'
};

const contextUsageStyle = {
  fontStyle: 'italic'
};

const listStyle = {
  listStyleType: 'none',
  padding: '0'
};

const listItemStyle = {
  marginBottom: '5px'
};

const noteStyle = {
  fontStyle: 'italic',
  marginTop: '20px',
  backgroundColor: '#e6f7ff',
  padding: '10px',
  borderRadius: '0px',
  lineHeight: '1.2'
};

const frequencyStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const synonymAntonymRowStyle = {
  display: 'flex',
  justifyContent: 'space-around'
};

// The component
function PhraseNo({ data, isShowedTran }) {
  return (
    <div style={containerStyle}>
      <div style={phraseStyle}>{data.phrase}</div>
      {isShowedTran && <div style={translationStyle}>{data.translation}</div>}

      <div style={sectionStyle}>
        <div style={titleStyle}>Definition</div>
        {data.definition}
      </div>
      <div style={sectionStyle}>
        <div style={titleStyle}>Region & Frequency</div>
        <div style={frequencyStyle}>
          {Object.entries(data.regionAndFrequency).map(([key, value]) => {
            const regionCode = capitalizeFirstCharacter(key) || "Other";
            return (
              <span key={key}>
                {regionCode}: {value}/10
              </span>
            );
          })}
        </div>
      </div>
      <div style={sectionStyle}>
        <div style={titleStyle}>Usage in Context</div>
        {data.contexts.map((context, index) => (
          <div key={index} style={contextItemStyle}>
            <div style={contextLabelStyle}>{context.context}</div>
            <div style={contextUsageStyle}>{context.usage}</div>
          </div>
        ))}
      </div>
      <div style={{ ...sectionStyle, ...synonymAntonymRowStyle }}>
        <div>
          <div style={titleStyle}>Synonyms</div>
          <ul style={listStyle}>
            {data.synonyms.map((synonym, index) => (
              <li key={index} style={listItemStyle}>
                {synonym}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={titleStyle}>Antonyms</div>
          <ul style={listStyle}>
            {data.antonyms.map((antonym, index) => (
              <li key={index} style={listItemStyle}>
                {antonym}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={noteStyle}>{data.note}</div>
    </div>
  );
}

export default PhraseNo;
