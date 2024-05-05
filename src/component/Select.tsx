// @ts-nocheck

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { langList } from "../data/langList";

const CountrySelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log("selectedOption", selectedOption);

  useEffect(() => {
    chrome.storage.local.get(null, function (result) {
      console.log("result", result);
      setSelectedOption(result.selectedLang);
    });
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    chrome.runtime.sendMessage({
      type: "SELECT_LANGUAGE",
      selectedLang: selectedOption,
    });
  }
 console.log("selectedOption", selectedOption);
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: "100%",
        }),
      }}
      value={selectedOption}
      defaultValue={selectedOption}
      onChange={(e)=>handleChange(e)}
      options={langList}
    />
  );
};

export default function App() {
  return (
    <div className="fadeInUp">
      <CountrySelect />
    </div>
  );
}
