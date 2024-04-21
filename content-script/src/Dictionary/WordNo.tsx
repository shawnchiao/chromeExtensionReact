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

function WordNo({ data, isShowedTran }) {
  const partOfSpeechStyle = {
    fontWeight: "bold",
    fontSize: "18px",
    color: "darkblue",
    marginTop: "20px",
  };

  const definitionStyle = {
    textAlign: "left",
    // paddingRight: "20px",
    fontWeight: "700",
  };

  const exampleStyle = {
    paddingLeft: "20px",
    fontStyle: "italic",
    fontWeight: "400",
  };
  const definitionContainerStyle = {
    margin: "10px 0", // Changed from 'margin-bottom'
    padding: "20px",
    borderRadius: "15px", // Changed from 'border-radius'
    backgroundColor: "#ecf0f1",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  return (
    <div className="container">
      <div style={{ paddingBottom: "20px" }}>
        <div className="phrase">{capitalizeFirstCharacter(data.word)}</div>
        <div
          style={{
            display: "flex",
            padding: "0 11px",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          {Object.entries(data.phoneticSymbols).map(([key, value]) => {
            const regionCode = capitalizeFirstCharacter(key) || "Other"; // Return "Other" if the key is not found
            return (
              <span style={{ marginLeft: "5px" }} key={key}>
                {regionCode}:<span style={{ marginLeft: "10px" }}>{value}</span>
              </span>
            );
          })}
          {/* UK: {data.phoneticSymbols.british} | US:{" "}
          {data.phoneticSymbols.american} | AU:{" "}
          {data.phoneticSymbols.australian} */}
        </div>
      </div>
      <div className="section">
        {data.entries.map((entry, index) => (
          <div key={index}>
            <div style={partOfSpeechStyle}>
              {capitalizeFirstCharacter(entry.partOfSpeech)}
            </div>
            {entry.definitions.map((def, defIndex) => (
              <div style={definitionContainerStyle} key={defIndex}>
                <div
                  style={{
                    fontWeight: "700",
                  }}
                >
                  {" "}
                  {def.translation}
                </div>
                <div style={definitionStyle}>
                  {/* <strong style={{ padding: "5px" }}>{defIndex + 1}</strong>{" "} */}
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

      <div className="note">{data.note}</div>
    </div>
  );
}

export default WordNo;
