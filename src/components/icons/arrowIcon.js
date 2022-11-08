import PropTypes from 'prop-types';
import React from 'react';

import {
  ArrowSmallDownIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ArrowSmallUpIcon,
} from '@heroicons/react/24/outline';

class ArrowIcon extends React.Component {
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
        return <ArrowSmallUpIcon className={style} />;
      case directions.left:
        return <ArrowSmallLeftIcon className={style} />;
      case directions.down:
        return <ArrowSmallDownIcon className={style} />;
      default:
        return <ArrowSmallRightIcon className={style} />;
    }
  }
}

const directions = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left',
};

ArrowIcon.propTypes = {
  direction: PropTypes.oneOf(Object.keys(directions)),
};

ArrowIcon.direction = directions;

export default ArrowIcon;
