import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
 
/**
 * When included, imports Meteor's inbuilt AccountsUIWrapper login component
 * 
 * @component AccountsUIWrapper
 * @hideconstructor
 * 
 * @example
 * 
 * <AccountsUIWrapper />
 */
class AccountsUIWrapper extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return <span ref="container" />;
  }
}

export default AccountsUIWrapper;