/** @jsx React.DOM */
'use strict';
var React = require('react/addons');

var Timer = React.createClass({
  propTypes: {
    current: React.PropTypes.instanceOf(Date).isRequired,
    deadline: React.PropTypes.instanceOf(Date).isRequired
  },

  render: function() {
    var current = this.props.current;
    var deadline = this.props.deadline;
    var remaining = deadline - current;
    
    var hh = pad( parseInt( (remaining % 86400000) / 3600000), 10 );
    var mm = pad( parseInt( ((remaining % 86400000) % 3600000) / 60000), 10 );
    var ss = pad( parseInt( ((((remaining % 86400000) % 3600000) / 60000) * 60) % 60), 10 );

    return ( <span> {hh} : {mm} : {ss} </span> );
  },
});

module.exports = Timer;

/**
 * Adds an extra 0 to numbers less than 10 (9 -> 09; 10 -> 10)
 */
function pad(n) { return (n < 10 ? '0' : '') + n }