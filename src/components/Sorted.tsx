import React, { FC } from "react";

interface IOption {
  value: string;
  name: string;
}

interface SortedProps {
  value: string;
  onChange: (selectedSort: string) => void;
  defaultValue: string;
  options: IOption[];
}

const Sorted: FC<SortedProps> = ({
  options,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <select
      className="border border-gray-300 rounded-md p-2 mb-4"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Sorted;
