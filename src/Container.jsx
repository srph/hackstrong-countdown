/** @jsx React.DOM */
var React = require('react');

var If = require('./If.jsx');
var Timer = require('./Timer.jsx');

var _start = new Date('01/10/2015 10:00:00');
var _deadline = new Date('01/11/2015 10:00:00');

var Container = React.createClass({
  getInitialState: function() {
    return { current: new Date() };
  },

  /**
   * Bind the countdown timer which
   * updates the current time each second
   */
  componentDidMount: function() {
    this.$countdown = setInterval(function() {
      this.setState({ current: new Date() });
    }.bind(this), 1000);
  },

  /**
   * Disables the countdown
   */
  componentWillUnmount: function() {
    cancelInterval ( this.$countdown );
  },

  render: function () {
    // Check whether the event has started or has been done long ago.
    var current = this.state.current;
    var done = ( _deadline.getTime() - current.getTime() < 0);
    var started = (_start.getTime() - current.getTime() < 0);

    return (
      <div>
        <If condition={!done}>
          <If condition={!started}>
            <h6> The event is about to start in </h6>
            <h1> <Timer deadline={_start} /> </h1>
          </If>

          <If condition={started}>
            <h5> Hands up in </h5>
            <h1> <Timer deadline={_deadline} /> </h1>
          </If>
        </If>

        <If condition={started && done}>
          <h1> Deadline passed. Goodluck, `hackers`! </h1>
        </If>
      </div>
    );
  }
});

module.exports = Container;