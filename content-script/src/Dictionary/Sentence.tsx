// @ts-nocheck
import React from "react";
import "./phraseCo.css";
import PlaySoundIcon from "../components/PlaySoundIcon";
function capitalizeFirstCharacter(str) {
  if (typeof str !== "string") {
    return ""; // Returns an empty string if the input is not a string
  }

  if (str.length === 0) {
    return ""; // Returns an empty string if the input is empty
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
const keyMapping = {
  "american": "US",
  "british": "UK",
  "australian": "AU"
};
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
  // marginLeft: '10px',
  // marginBottom: '15px',
  margin: '4%',
  fontWeight: 'bold'
};

const translationStyles = {
  fontSize: '15px',
  color: 'rgb(82, 86, 90)',
  // marginLeft: '12px',
  // marginBottom: '15px'
  margin: '5%',
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
function Sentence({ data, isShowedTran }) {
  console.log("data in sentence", data);
  return (
    <div style={containerStyles}>
      <div style={phraseStyles}>{data.sentence}</div>
      <div
          style={{
            ...regions,
            display: "grid",
            // gridTemplateColumns: "auto 1fr 1fr",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
            columnGap: "10px",
          }}
        >
          {Object.entries(data.audioData).map(([key, value]) => (
            <React.Fragment key={key}>
              <span style={{ justifySelf: "center" }}>
              {key}
              </span>
              {/* <div style={{ display: "flex", alignItems: "center", justifySelf: "center", gap:"auto" }}> */}
               
                <PlaySoundIcon style={{ justifySelf: "left" }} size="24px"
                  url={data.audioData[key][0]}
                />
              {/* </div> */}
            </React.Fragment>
          ))}
        </div>
      {isShowedTran && <div style={translationStyles}>{data.translation}</div>}
      <div style={sectionStyles}>
        <div style={titleStyles}>Overall Explanation</div>
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
