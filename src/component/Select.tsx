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
      control: (base, state) => ({
        ...base,
        width: "100%",
        borderColor: state.isFocused ? '#f59e0b' : base.borderColor, // Change border color on focus
        boxShadow: state.isFocused ? '0 0 0 1px #f59e0b' : 'none', // Optional: add a shadow to highlight focus
        '&:hover': {
          borderColor: state.isFocused ? '#f59e0b' : '#8a8a8a', // Change border color on hover
        }
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? '#ffe8a9' : (state.isSelected ? '#ffbb00' : base.backgroundColor),
        color: state.isFocused ? 'black' : (state.isSelected ? 'white':"black" )
      })
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
