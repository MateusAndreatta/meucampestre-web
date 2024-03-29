import PropTypes from 'prop-types';
import React from 'react';

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

class ChevronIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: props.direction,
      color: props.color || 'default-icon-color',
      height: props.height || 'h-5',
      width: props.width || 'w-5',
      classes: props.className,
    };
  }

  render() {
    const { direction, color, width, height, classes } = this.state;
    let style = `${width} ${height} ${color} ${classes}`;
    switch (direction) {
      case directions.up:
        return <ChevronUpIcon className={style} />;
      case directions.left:
        return <ChevronLeftIcon className={style} />;
      case directions.down:
        return <ChevronDownIcon className={style} />;
      default:
        return <ChevronRightIcon className={style} />;
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
