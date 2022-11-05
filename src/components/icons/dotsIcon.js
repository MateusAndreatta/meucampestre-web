import PropTypes from 'prop-types';
import React from 'react';

import {
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

class DotsIcon extends React.Component {
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
      case directions.horizontal:
        return <EllipsisHorizontalIcon className={style} />;
      default:
        return <EllipsisVerticalIcon className={style} />;
    }
  }
}

const directions = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

DotsIcon.propTypes = {
  direction: PropTypes.oneOf(Object.keys(directions)),
};

DotsIcon.direction = directions;

export default DotsIcon;
