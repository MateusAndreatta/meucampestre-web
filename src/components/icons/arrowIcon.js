import PropTypes from 'prop-types';
import React from 'react';

import { ArrowSmUpIcon } from '@heroicons/react/outline';
import { ArrowSmDownIcon } from '@heroicons/react/outline';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { ArrowSmLeftIcon } from '@heroicons/react/outline';

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
        return <ArrowSmUpIcon className={style} />;
      case directions.left:
        return <ArrowSmLeftIcon className={style} />;
      case directions.down:
        return <ArrowSmDownIcon className={style} />;
      default:
        return <ArrowSmRightIcon className={style} />;
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
