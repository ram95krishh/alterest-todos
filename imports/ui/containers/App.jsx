import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../components/AccountsUIWrapper';
import Task from '../components/Task';
import { Tasks } from '../../api/tasks.js';

/**
 * Root container of the app.
 * 
 * @component App
 * @hideconstructor
 * 
 * @example
 * 
 * ReactDOM.render(<App />, document.getElementById('app'));
 */
class App extends Component {
 
  renderTasks() {
    const { tasks = [], currentUser } = this.props
    const currentUserId = currentUser && currentUser._id;

    return tasks.map((task) => {
      const { owner } = task
      const showPrivateButton = owner === currentUserId

      return (
        <Task
          key={task._id}
          showPrivateButton={showPrivateButton}
          task={task}
        />
      )
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTaskInput() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return null
    }
    return (
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
        <input
          type="text"
          ref="textInput"
          placeholder="Type to add new tasks"
        />
    </form>
    )
  }
 
  render() {
    const { incompleteCount } = this.props
    return (
      <div className="container">
        <header>
          <h1>Todo List ({incompleteCount})</h1>
          <AccountsUIWrapper />
          {this.renderTaskInput()}
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    currentUser: Meteor.user(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);