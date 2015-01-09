'use strict';
var React = require('react');

/**
 * Conditionally show elements
 * http://stackoverflow.com/a/26152067/2698227
 */
var If = React.createClass({
  propTypes: { condition: React.PropTypes.bool.isRequired },
  render: function() {
    return (
      <span>
      	{ this.props.condition ? this.props.children : '' }
      </span>
    )
  }
});

module.exports = If;