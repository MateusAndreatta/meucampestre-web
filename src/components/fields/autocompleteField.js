import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';

export default function AutocompleteField(props) {
  const {
    disabled,
    label,
    name,
    value,
    required,
    placeholder,
    onChangeAutocomplete,
    items,
    optionName,
    optionKey,
  } = props;

  const [query, setQuery] = useState('');

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) => {
          return item[optionName].toLowerCase().includes(query.toLowerCase());
        });

  return (
    <span>
      <label
        htmlFor={name}
        className={`text-sm font-medium text-slate-700 ${
          required ? ' required ' : ''
        }`}>
        {label}
      </label>
      <Combobox
        value={value || ''}
        onChange={onChangeAutocomplete}
        disabled={disabled}>
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          className="input mt-1 w-full"
          name={name}
          placeholder={placeholder}
        />
        <Combobox.Options className="max-h-64 overflow-y-auto">
          {filteredItems.map((item) => (
            <Combobox.Option
              key={item[optionKey]}
              value={item}
              className="my-1 rounded bg-white py-1 px-1 hover:cursor-pointer">
              {item[optionName]}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </span>
  );
}
