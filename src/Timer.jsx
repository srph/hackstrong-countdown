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
      var current = new Date().getTime();
      var deadline = this.props.deadline.getTime();

      this.setState({
        remaining: new Date( deadline - current )
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
    var hh = pad( remaining.getHours() );
    var mm = pad( remaining.getMinutes() );
    var ss = pad( remaining.getSeconds() );

    return ( <span> {hh} : {mm} : {ss} </span> );
  },
});

module.exports = Timer;

/**
 * Adds an extra 0 to numbers less than 10 (9 -> 09; 10 -> 10)
 */
function pad(n) { return (n < 10 ? '0' : '') + n }