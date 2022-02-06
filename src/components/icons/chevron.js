import PropTypes from 'prop-types';
import React from 'react';

import { ChevronUpIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon } from '@heroicons/react/outline';

class ChevronIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: props.direction,
    };
  }

  render() {
    switch (this.state.direction) {
      case direction.up:
        return <ChevronUpIcon className="w-5 text-blue-400" />;
      case direction.right:
        return <ChevronRightIcon className="w-5 text-blue-400" />;
      case direction.down:
        return <ChevronDownIcon className="w-5 text-blue-400" />;
      default:
        return <ChevronLeftIcon className="w-5 text-blue-400" />;
    }
  }
}

const direction = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left',
};

ChevronIcon.propTypes = {
  direction: PropTypes.oneOf(Object.keys(direction)),
};

ChevronIcon.direction = direction;

export default ChevronIcon;
