import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Tasks } from './tasks.js';
 
if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      let userId;
      let taskId;
      let taskCount;

      before(() => {
        Meteor.users.remove({ username: 'tester' });
        userId = Meteor.users.insert({ username: 'tester' });
      });
 
      beforeEach(() => {
        Tasks.remove({});
        taskId = Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'tester',
        });
        taskCount = Tasks.find({}).count();
      });
 
      it('can delete owned task', () => {
        const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        const invocation = { userId };
        
        deleteTask.apply(invocation, [taskId]);
        
        assert.equal(Tasks.find().count(), 0);
      });

      it('can add a task', () => {
        const insertTask = Meteor.server.method_handlers['tasks.insert'];
        const invocation = { userId };
        const payload = 'test task';
        
        insertTask.apply(invocation, [payload]);
        
        assert.equal(Tasks.find().count(), taskCount + 1);
      });

      it('anonymous user cannot add a task', () => {
        const insertTask = Meteor.server.method_handlers['tasks.insert'];
        const invocation = {};
        const payload = 'test task';
        
        const insertAction = () => insertTask.apply(invocation, [payload]);
        
        assert.throws(insertAction, Error, 'not-authorized');
      });

      it('can setChecked to a task', () => {
        const setCheckedFn = Meteor.server.method_handlers['tasks.setChecked'];
        const invocation = { userId };
        const payload = true;
        
        setCheckedFn.apply(invocation, [taskId, payload]);
        
        assert.equal(Tasks.findOne({ _id: taskId }).checked, true);
      });

    });
  });
}
