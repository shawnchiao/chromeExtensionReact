import React from "react";

const lexicalItemDefinition = ({ dicData }) => {
  const formatRelations = (relations) => relations.join(", ");

  const containerStyle = {
    fontFamily: '"Arial, sans-serif"',
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  };

  const headerStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px"
  };

  const wordContainerStyle = {
    display: "flex",
    alignItems: "baseline",
    gap: "10px"
  };

  const lexicalItemStyle = {
    fontSize: "24px",
    marginRight: "10px"
  };

  const smallInfoStyle = {
    fontSize: "14px",
    color: "#666"
  };

  const meaningStyle = {
    fontWeight: 'bold'
  };

  const exampleStyle = {
    fontStyle: 'italic',
    marginLeft: '1rem'
  };

  const sectionStyle = {
    marginBottom: "10px"
  };

  const noteStyle = {
    fontStyle: "italic",
    fontSize: "14px"
  };

  const titleStyle = {
    fontWeight: "bold",
    color: "#333"
  };

  return (
    <div style={containerStyle}>
      {dicData ? (
        <>
          <div style={headerStyle}>
            <div style={wordContainerStyle}>
              <h2 style={lexicalItemStyle}>{dicData.lexicalItem}</h2>
              <span style={smallInfoStyle}>
                {dicData.translation} | {dicData.partOfSpeech} | {dicData.register}
              </span>
            </div>
            <div style={smallInfoStyle}>
              British: {dicData.phoneticSymbols.british} {dicData.regionAndFrequency.british}/10 | American: {dicData.phoneticSymbols.american} {dicData.regionAndFrequency.american}/10 | Australian: {dicData.phoneticSymbols.australian} {dicData.regionAndFrequency.australian}/10
            </div>
          </div>
          <div style={meaningStyle}>
            <p>{dicData.meaning}</p>
          </div>
          <div style={exampleStyle}>
            <p>{dicData.example}</p>
          </div>
          
          <div style={sectionStyle}>
            <p style={noteStyle}>{dicData.note}</p>
          </div>
          <div style={smallInfoStyle}>
            <span style={titleStyle}>S: </span>
            <span>{formatRelations(dicData.relations.synonyms)}</span>
          </div>
          <div style={smallInfoStyle}>
            <span style={titleStyle}>A: </span>
            <span>{formatRelations(dicData.relations.antonyms)}</span>
          </div>
          <div style={smallInfoStyle}>
            <span style={titleStyle}>C: </span>
            <span>{formatRelations(dicData.relations.commonCollocations)}</span>
          </div>
        </>
      ) : (
        <div style={headerStyle}>
         Loading...
        </div>
      )}
    </div>
  );
};

export default lexicalItemDefinition;
