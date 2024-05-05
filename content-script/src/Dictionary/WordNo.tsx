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
  maxWidth: "350px",
  margin: "20px auto",
  padding: "20px 0",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
};

const phraseStyle = {
  fontSize: "24px",
  color: "#2a6496",
  marginLeft: "10px",
  marginBottom: "15px",
  fontWeight: "bold",
};

const sectionStyle = {
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "0px",
  marginBottom: "20px",
};

const noteStyle = {
  fontStyle: "italic",
  marginTop: "20px",
  backgroundColor: "#e6f7ff",
  padding: "10px",
  borderRadius: "0px",
  lineHeight: "1.2",
};

// The existing functional component
function WordNo({ data, isShowedTran }) {
  const partOfSpeechStyle = {
    fontWeight: "bold",
    fontSize: "18px",
    color: "darkblue",
    marginTop: "20px",
  };

  const definitionStyle = {
    textAlign: "left",
    fontWeight: "700",
  };

  const exampleStyle = {
    paddingLeft: "20px",
    fontStyle: "italic",
    fontWeight: "400",
  };

  const definitionContainerStyle = {
    margin: "10px 0",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "#ecf0f1",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={{ paddingBottom: "20px" }}>
        <div style={phraseStyle}>{capitalizeFirstCharacter(data.word)}</div>
        <div
          style={{
            display: "flex",
            padding: "0 11px",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          {Object.entries(data.phoneticSymbols).map(([key, value]) => {
            const regionCode = capitalizeFirstCharacter(key) || "Other";
            return (
              <span style={{ marginLeft: "5px" }} key={key}>
                {regionCode}:<span style={{ marginLeft: "10px" }}>{value}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div style={sectionStyle}>
        {data.entries.map((entry, index) => (
          <div key={index}>
            <div style={partOfSpeechStyle}>
              {capitalizeFirstCharacter(entry.partOfSpeech)}
            </div>
            {entry.definitions.map((def, defIndex) => (
              <div style={definitionContainerStyle} key={defIndex}>
                {isShowedTran && (
                  <div
                    style={{
                      fontWeight: "700",
                    }}
                  >
                    {def.translation}
                  </div>
                )}
                <div style={definitionStyle}>
                  {capitalizeFirstCharacter(def.definition)}
                </div>
                <div style={exampleStyle}>
                  {capitalizeFirstCharacter(def.example)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={noteStyle}>{data.note}</div>
    </div>
  );
}

export default WordNo;
