// @ts-nocheck

import React, { useState } from "react";
import Select from "react-select";
import { langList } from "../data/langList";

const CountrySelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log("selectedOption", selectedOption);
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: "100%",
        }),
      }}
      defaultValue={selectedOption}
      onChange={setSelectedOption}
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
