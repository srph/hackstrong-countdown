/** @jsx React.DOM */
var React = require('react');

var If = require('../src/If.jsx');
var Timer = require('./Timer.jsx');

var PlaceholderStyle = {
  'marginBottom': '-10px',
  'textTransform': 'uppercase',
  'letterSpacing': '2px',
  'fontWeight': '700'
}

var Container = React.createClass({
  getInitialState: function() {
    return {
      current: new Date(),
      deadline: new Date(),
      started: false
    };
  },

  /**
   * Bind the countdown timer which
   * updates the current time each second
   */
  componentDidMount: function() {
    // Fetch the `deadline` in the localStorage
    var localDeadline = localStorage.getItem('ahk.deadline');

    // We'd rather use a new date because `current` state
    // _may_ be outdated
    var current = new Date();

    // And if the `deadline` exists in the localStorage, and it doesn't
    // exceed the current date, let's use it.
    if ( localDeadline !== null && (localDeadline - current) > 0 ) {
      var deadline = new Date( parseInt(localDeadline, 10) );
      this.setState({ started: true, deadline: deadline });
      this._startCountdown();
    }
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
    var deadline = this.state.deadline;
    var started = this.state.started;

    var done = (deadline - current) <= 0;

    return (
      <div>
        <If condition={started}>
          <If condition={!done}>
            <h6 style={PlaceholderStyle}> <small> Hands up in: </small> </h6>
            <h1> <Timer current={current} deadline={deadline} /> </h1>
          </If>

          <If condition={done}>
            <h1> Deadline passed. Goodluck, `hackers`! </h1>
          </If>
        </If>

        <If condition={!started}>
          <button type="button" onClick={this._setDeadline} className="button-primary">
            Start!
          </button>
        </If>
      </div>
    );
  },

  _setDeadline: function() {
    var deadline = new Date();
    deadline.setDate(deadline.getDate() + 1);

    // Save the set deadline to the local storage
    localStorage.setItem('ahk.deadline', deadline.getTime());

    // Start the timer
    this.setState({ started: true, deadline: deadline });
    this._startCountdown();
  },

  /**
   * Starts the countdown timer
   * Updates the `current` state every second
   */
  _startCountdown: function() {
    this.$countdown = setInterval(function() {
      this.setState({ current: new Date() });
    }.bind(this), 1000);
  }
});

module.exports = Container;