import React from 'react';

export default class InputField extends React.Component {
  render() {
    const {
      disabled,
      label,
      errorLabel,
      name,
      type,
      value,
      required,
      placeholder,
      onChange,
    } = this.props;

    return (
      <span>
        <label
          htmlFor={name}
          className={`text-sm font-medium text-slate-700 ${
            required ? ' required ' : ''
          }`}>
          {label}
        </label>
        <input
          className="peer input mt-1 w-full"
          type={type}
          id={name}
          name={name}
          value={value || ''}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
        />
        <p className="mt-2 hidden text-sm text-pink-600 peer-invalid:block">
          {errorLabel}
        </p>
      </span>
    );
  }
}
