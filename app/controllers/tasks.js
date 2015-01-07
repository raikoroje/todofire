import Ember from 'ember';

export default Ember.ArrayController.extend({

/* properties */
	remaining: Ember.computed.filterBy('model', 'isCompleted', false),
	completed: Ember.computed.filterBy('model', 'isCompleted', true),

	allAreDone: function (key, value) {
		if (value !== undefined) {
			this.setEach('isCompleted', value);
			return value;
		} else {
			var length = this.get('length');
			var completedLength = this.get('completed.length');

			return length > 0 && length === completedLength;
		}
	}.property('length', 'completed.length'),

	actions: {
		createTask: function () {
			var title, task;

			// Get the task title set by the "New Task" text field
			title = this.get('newTitle').trim();
			if (!title) {
				return;
			}

			// Create the new Task model
			task = this.store.createRecord('task', {
				title: title,
				isCompleted: false
			});
			task.save();

			// Clear the "New Task" text field
			this.set('newTitle', '');
		},

		clearCompleted: function () {
			var completed = this.get('completed');
			completed.invoke('deleteRecord');
			completed.invoke('save');
		}
	}
});
