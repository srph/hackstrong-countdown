/** @jsx React.DOM */
'use strict';
var React = require('react/addons');

var Timer = React.createClass({
  propTypes: { deadline: React.PropTypes.instanceOf(Date).isRequired },

  getInitialState: function() {
    return { remaining: new Date() };
  },

  /**
   * Bind the countdown timer
   */
  componentDidMount: function() {
    this.$countdown = setInterval(function() {
      var current = new Date();
      var deadline = this.props.deadline;

      this.setState({
        remaining: deadline - current
      });
    }.bind(this), 1000);
  },

  /**
   * Remove the timer
   */
  componentWillUnmount: function() {
    cancelInterval( this.$countdown );
  },

  render: function() {
    var remaining = this.state.remaining;
    var hh = pad( Math.round( (remaining % 86400000) / 3600000) );
    var mm = pad( Math.round( ((remaining % 86400000) % 3600000) / 60000) );
    var ss = pad( Math.round( ((((remaining % 86400000) % 3600000) / 60000) * 60) % 60) );

    return ( <span> {hh} : {mm} : {ss} </span> );
  },
});

module.exports = Timer;

/**
 * Adds an extra 0 to numbers less than 10 (9 -> 09; 10 -> 10)
 */
function pad(n) { return (n < 10 ? '0' : '') + n }