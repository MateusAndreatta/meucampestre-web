import React from 'react';

export default class CheckboxField extends React.Component {
  render() {
    const { disabled, label, name, required, onChange, checked } = this.props;

    return (
      <span>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name={name}
            id={name}
            className="checkbox"
            checked={checked}
            onChange={onChange}
            required={required}
            disabled={disabled}
          />
          <span
            className={`font-normal text-slate-700 ${
              required ? ' required ' : ''
            }}`}>
            {label}
          </span>
        </label>
      </span>
    );
  }
}
