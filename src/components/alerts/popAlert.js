import React from 'react';
import PropTypes from 'prop-types';

import { CheckCircleIcon } from '@heroicons/react/solid';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { LightningBoltIcon } from '@heroicons/react/solid';

// TODO: O ideal seria esse icone vir de um componente proprio dele, e passando os parametros
// TODO: - Animar com um fade quando o elemento estiver saindo/entrando da tela

let styles = {
  popUp:
    'absolute top-10 right-10 mx-auto flex w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md',
  iconContainer: 'flex w-12 items-center justify-center',
  icon: 'h-6 w-6 text-white',
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
        <CheckCircleIcon className={styles.icon} />
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
        <ExclamationCircleIcon className={styles.icon} />
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
        <ExclamationCircleIcon className={styles.icon} />
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
        <LightningBoltIcon className={styles.icon} />
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