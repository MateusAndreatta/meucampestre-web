import React from 'react';
import LoadingIcon from '../icons/loadingIcon';

export default class Button extends React.Component {
  render() {
    const { disabled, onClick, children, loading } = this.props;

    return (
      <span>
        <button className="btn-outline" disabled={disabled} onClick={onClick}>
          <div className="inline-flex items-center">
            {children}
            {loading ? <LoadingIcon /> : ''}
          </div>
        </button>
      </span>
    );
  }
}
