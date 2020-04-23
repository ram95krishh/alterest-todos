import React from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

const Task = ({
    task: {
      _id, text, checked = false,
      username, private = false
    },
    showPrivateButton = false,
  }) => {

  const taskClassName = classnames({
    checked: checked,
    private: private,
  });

  const toggleChecked = () => {
    Meteor.call('tasks.setChecked', _id, !checked);
  }
 
  const deleteThisTask = () => {
    Meteor.call('tasks.remove', _id);
  }
  
  const togglePrivate = () => {
    Meteor.call('tasks.setPrivate', _id, !private);
  }

  return (
    <li className={taskClassName}>
      <button className="delete" onClick={deleteThisTask}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={!!checked}
        onClick={toggleChecked}
      />

      { showPrivateButton ? (
          <button className="toggle-private" onClick={togglePrivate}>
            { private ? 'Private' : 'Public' }
          </button>
        ) : null
      }

      <span className="text">
        <strong>{username}</strong>: {text}
      </span>
    </li>
  );
}
 
export default Task;