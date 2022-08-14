import React, { useCallback, useEffect, useRef, useState } from 'react';
import SelectorIcon from '../icons/selectorIcon';

export default function SelectField(props) {
  const {
    disabled,
    label,
    name,
    required,
    onChange,
    data,
    optionName,
    optionKey,
  } = props;
  const [showList, setShowList] = useState(false);

  const [selectedValue, setSelectedValue] = useState(data[0]);

  const panelResultElement = useRef();
  const selectButton = useRef();

  const handleClickOutside = useCallback((event) => {
    const myHTMLWrapper = panelResultElement.current;
    const searchElement = selectButton.current;
    if (
      myHTMLWrapper &&
      searchElement &&
      !myHTMLWrapper.contains(event.target) &&
      !searchElement.contains(event.target)
    ) {
      setShowList(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setShowList(false);
    onChange(selectedValue);
  }, [selectedValue]);

  return (
    <div className="w-full">
      <div className="relative mt-1">
        <label
          htmlFor={name}
          className={`text-sm font-medium text-slate-700 ${
            required ? ' required ' : ''
          }`}>
          {label}
        </label>
        <button
          type="button"
          ref={selectButton}
          onClick={() => setShowList(!showList)}
          className="input relative w-full">
          <span className="flex items-center">
            <span className="block truncate">{selectedValue[optionName]}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <SelectorIcon />
          </span>
        </button>

        {showList && (
          <div
            ref={panelResultElement}
            className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-sm">
            <ul
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-56 overflow-auto rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
              {data.map((value) => {
                return (
                  <li
                    key={value[optionKey]}
                    id="listbox-item-0"
                    onClick={() => setSelectedValue(value)}
                    className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-sky-500 hover:text-white">
                    <div className="flex items-center">
                      <span className="block truncate font-normal">
                        {value[optionName]}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
