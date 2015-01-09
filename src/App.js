'use strict';
var React = require('react');
var Container = require('./Container.jsx');

var Style = {
  outerTable: {
    'display': 'table',
    'height': '100%',
    'width': '100%'
  },

  innerTable: {
    'display': 'table-cell',
    'verticalAlign': 'middle',
    'textAlign': 'center'
  }
};

var LogoStyle = {
  'display': 'block',
  'marginLeft': 'auto',
  'marginRight': 'auto',
  'marginBottom': '10px',
  'width': '240px',
  'textAlign': 'center'
};

var App = React.createClass({
  render: function() {
    return (
      <div style={Style.outerTable}>
        <div style={Style.innerTable}>
          <img src="dist/img/logo.png" style={LogoStyle} />
          <Container />
        </div>
      </div>
    );
  }
})

React.render(
  <App />,
  document.querySelector('.container')
);