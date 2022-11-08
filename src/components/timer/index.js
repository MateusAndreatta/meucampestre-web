import React from 'react';
import moment from 'moment';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInicial: new Date(),
      date: new Date(),
    };
    this.tick = this.tick.bind(this);
  }

  render() {
    var now = moment(this.state.dataInicial); //todays date
    var end = moment(this.state.date); // another date
    var duration = moment.duration(end.diff(now));
    var f = moment.utc(duration.as('milliseconds')).format('HH:mm:ss');

    return <div>{f}</div>;
  }
  tick() {
    this.setState({ date: new Date() });
  }

  componentDidMount() {
    this.clockId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clockId);
  }
}

export default Timer;
