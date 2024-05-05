// @ts-nocheck
import React from "react";
function capitalizeFirstCharacter(str) {
  if (typeof str !== "string") {
    return ""; // Returns an empty string if the input is not a string
  }

  if (str.length === 0) {
    return ""; // Returns an empty string if the input is empty
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
const lexicalItemDefinition = ({ dicData, isShowedTran }) => {
  const formatRelations = (relations) => relations.join(", ");

  const containerStyle = {
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "auto",
    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  };

  const wordContainerStyle = {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
  };

  const lexicalItemStyle = {
    fontSize: "24px",
    marginRight: "10px",
    marginBottom: "10px",
  };

  const smallInfoStyle = {
    fontSize: "14px",
    color: "#666",
    display: "flex",
    gap: "5px",
  };
  const regions = {
    fontSize: "14px",
    color: "#666",
    fontWeight: "600",
    background: "#fff1dd",
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    gap: "10px",
    borderRadius: "10px",
    marginTop: "10px",
  };
  const meaningStyle = {
    fontWeight: "bold",
  };

  const exampleStyle = {
    fontStyle: "italic",
    marginLeft: "1rem",
  };

  const sectionStyle = {
    marginBottom: "10px",
  };

  const noteStyle = {
    fontStyle: "italic",
    fontSize: "14px",
    // padding: "5px",
    lineHeight: "1.2",
  };

  const titleStyle = {
    fontWeight: "800",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={wordContainerStyle}>
          <div style={lexicalItemStyle}>
            {capitalizeFirstCharacter(dicData.lexicalItem)}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {isShowedTran && (
            <div
              style={{
                backgroundColor: "#e7e7e7",
                borderRadius: "10px",
                padding: "5px",
                lineHeight: "1",
              }}
            >
              {dicData.translation}
            </div>
          )}
          <div
            style={{
              backgroundColor: "#ecd4d4",
              borderRadius: "10px",
              padding: "5px",
              lineHeight: "1",
            }}
          >
            {dicData.partOfSpeech}
          </div>
          <div
            style={{
              backgroundColor: "#d4e3ec",
              borderRadius: "10px",
              padding: "5px",
              lineHeight: "1",
            }}
          >
            {dicData.register}
          </div>
        </div>
        <div
          style={{
            ...regions,
            display: "grid",
            // gridTemplateColumns: "auto 1fr 1fr",
            gridTemplateColumns: "auto auto auto",
            alignItems: "center",
            columnGap: "10px",
          }}
        >
          {Object.entries(dicData.phoneticSymbols).map(([key, value]) => (
            <React.Fragment key={key}>
              <span style={{ justifySelf: "right" }}>
                {key === "british" && "UK"}
                {key === "american" && "US"}
                {key === "australian" && "AU"}:
              </span>
              <span style={{ justifySelf: "center" }}>{value}</span>
              <span style={{ justifySelf: "left" }}>
                {dicData.regionAndFrequency[key]}/10
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div
        style={{
          background: "#e7e7e7",
          padding: "15px",
          borderRadius: "10px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <div style={meaningStyle}>
          <div>{dicData.meaning}</div>
        </div>
        <div style={exampleStyle}>
          <div>{dicData.example}</div>
        </div>
      </div>
      <div
        style={{
          padding: "15px",
          borderRadius: "10px",
          marginTop: "10px",
          background: "rgb(212, 227, 236)",
        }}
      >
        <div style={noteStyle}>{dicData.note}</div>
      </div>
      <div
        style={{
          padding: "15px",
          borderRadius: "10px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          background: "rgb(236, 212, 212)",
          fontWeight: "500",
        }}
      >
        <div style={smallInfoStyle}>
          <span style={titleStyle}>S:</span>
          <span>{formatRelations(dicData.relations.synonyms)}</span>
        </div>
        <div style={smallInfoStyle}>
          <span style={titleStyle}>A:</span>
          <span>{formatRelations(dicData.relations.antonyms)}</span>
        </div>
        <div style={smallInfoStyle}>
          <span style={titleStyle}>C:</span>
          <span>{formatRelations(dicData.relations.commonCollocations)}</span>
        </div>
      </div>
    </div>
  );
};

export default lexicalItemDefinition;
