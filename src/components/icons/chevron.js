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
      color: props.color || 'text-blue-400',
      width: props.width || 'w-5',
    };
  }

  render() {
    const { direction, color, width } = this.state;

    switch (direction) {
      case directions.up:
        return <ChevronUpIcon className={`${width} ${color}`} />;
      case directions.left:
        return <ChevronLeftIcon className={`${width} ${color}`} />;
      case directions.down:
        return <ChevronDownIcon className={`${width} ${color}`} />;
      default:
        return <ChevronRightIcon className={`${width} ${color}`} />;
    }
  }
}

const directions = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left',
};

ChevronIcon.propTypes = {
  direction: PropTypes.oneOf(Object.keys(directions)),
};

ChevronIcon.direction = directions;

export default ChevronIcon;
