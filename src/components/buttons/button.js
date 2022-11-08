import React from 'react';
import LoadingIcon from '../icons/loadingIcon';

export default class Button extends React.Component {
  render() {
    const { disabled, onClick, children, loading, selected } = this.props;

    return (
      <span>
        <button
          className={`btn-outline ${selected ? 'bg-gray-300' : ''}`}
          disabled={disabled}
          onClick={onClick}>
          <div className="inline-flex items-center">
            {children}
            {loading ? <LoadingIcon /> : ''}
          </div>
        </button>
      </span>
    );
  }
}
