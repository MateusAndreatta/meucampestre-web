import React from 'react';
import PropTypes from 'prop-types';

import LightningBoltIcon from '../icons/lightningBoltIcon';
import ExclamationIcon from '../icons/exclamationIcon';
import CheckIcon from '../icons/checkIcon';

let styles = {
  popUp:
    'absolute inset-x-0 bottom-0 mx-auto flex w-full overflow-hidden bg-white md:shadow-md md:inset-x-auto md:top-5 md:right-5 md:bottom-auto md:max-w-sm md:rounded-lg',
  iconContainer: 'flex w-12 items-center justify-center',
  icon: {
    width: 'w-6',
    height: 'h-6',
    color: 'text-white',
    type: 'solid',
  },
  container: '-mx-3 px-4 py-2',
  contentContainer: 'mx-3',
  title: 'font-semibold',
  content: 'text-sm text-gray-600',
};

let timer = null;

class PopAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: props.direction,
      title: props.title,
      content: props.content,
      delay: props.delay || 5000,
      type: props.type,
      show: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount() {
    let that = this;
    timer = setTimeout(() => {
      that.setState({ show: false });
    }, this.state.delay);
  }

  componentWillUnmount() {
    clearTimeout(timer);
  }

  render() {
    const { title, content, type, show } = this.state;
    return <div>{show && getAlert(type, title, content)}</div>;
  }
}

const types = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

PopAlert.propTypes = {
  type: PropTypes.oneOf(Object.keys(types)),
};

PopAlert.type = types;

export default PopAlert;

function getAlert(type, title, content) {
  switch (type) {
    case types.success: {
      return successPop(title, content);
    }
    case types.info: {
      return infoPop(title, content);
    }
    case types.warning: {
      return warningPop(title, content);
    }
    case types.error: {
      return errorPop(title, content);
    }
    default:
      return infoPop(title, content);
  }
}

function successPop(title, content) {
  return (
    <div className={styles.popUp}>
      <div className={`${styles.iconContainer} bg-emerald-500`}>
        <CheckIcon
          color={styles.icon.color}
          type={styles.icon.type}
          width={styles.icon.width}
          height={styles.icon.height}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <span className={`${styles.title} text-emerald-500`}>{title}</span>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
}

function infoPop(title, content) {
  return (
    <div className={styles.popUp}>
      <div className={`${styles.iconContainer} bg-blue-500`}>
        <ExclamationIcon
          color={styles.icon.color}
          type={styles.icon.type}
          width={styles.icon.width}
          height={styles.icon.height}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <span className={`${styles.title} text-blue-500`}>{title}</span>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
}

function warningPop(title, content) {
  return (
    <div className={styles.popUp}>
      <div className={`${styles.iconContainer} bg-yellow-400`}>
        <ExclamationIcon
          color={styles.icon.color}
          type={styles.icon.type}
          width={styles.icon.width}
          height={styles.icon.height}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <span className={`${styles.title} text-yellow-400`}>{title}</span>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
}

function errorPop(title, content) {
  return (
    <div className={styles.popUp}>
      <div className={`${styles.iconContainer} bg-red-500`}>
        <LightningBoltIcon
          color={styles.icon.color}
          type={styles.icon.type}
          width={styles.icon.width}
          height={styles.icon.height}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <span className={`${styles.title} text-red-500`}>{title}</span>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
}
