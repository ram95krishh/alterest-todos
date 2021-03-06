import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

/**
 * Meteor methods acting as tasks controllers
 * 
 * @module api-methods
 * @hideconstructor
 */
Meteor.methods({
  /**
   * @function insert
   * - Function handling task insertion
   * 
   * @param text {string} text to insert
   * 
   * @example
   * 
   * const todoText = "Hello world";
   * Meteor.call('tasks.insert', todoText);
   * 
   */
  'tasks.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  /**
   * @function remove
   * - Function handling task removal
   * 
   * @param taskId {string} id of task to remove
   * 
   * @example
   * 
   * const taskId = "asdasd12300xcas8qwd";
   * Meteor.call('tasks.remove', taskId);
   * 
   */
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.remove(taskId);
  },

  /**
   * @function setChecked
   * - Function handling task completion
   * 
   * @param taskId {string} id of task to set checked value
   * 
   * @example
   * 
   * const taskId = "asdasd12300xcas8qwd";
   * const checked = true;
   * Meteor.call('tasks.setChecked', taskId, checked);
   * 
   */
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  /**
   * @function setPrivate
   * - Function handling task completion
   * 
   * @param taskId {string} id of task to set private value
   * 
   * @example
   * 
   * const taskId = "asdasd12300xcas8qwd";
   * const private = false;
   * Meteor.call('tasks.setPrivate', taskId, private);
   * 
   */
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
 
    const task = Tasks.findOne(taskId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});