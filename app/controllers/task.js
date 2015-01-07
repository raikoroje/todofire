import Ember from 'ember';

export default Ember.ObjectController.extend({
	isEditing: false,

	// We use the bufferedTitle to store the original value of
	// the model's title so that we can roll it back later in the
	// `cancelEditing` action.
	bufferedTitle: Ember.computed.oneWay('title'),

	actions: {
		editTask: function () {
			this.set('isEditing', true);
		},

		doneEditing: function () {
			var bufferedTitle = this.get('bufferedTitle').trim();

			if (Ember.isEmpty(bufferedTitle)) {
				// The `doneEditing` action gets sent twice when the user hits
				// enter (once via 'insert-newline' and once via 'focus-out').
				//
				// We debounce our call to 'removeTask' so that it only gets
				// made once.
				Ember.run.debounce(this, 'removeTask', 0);
			} else {
				var task = this.get('model');
				task.set('title', bufferedTitle);
				task.set('description', 'foobar');
				task.save();
			}

			// Re-set our newly edited title to persist its trimmed version
			this.set('bufferedTitle', bufferedTitle);
			this.set('isEditing', false);
		},

		cancelEditing: function () {
			this.set('bufferedTitle', this.get('title'));
			this.set('isEditing', false);
		},

		removeTask: function () {
			this.removeTask();
		}
	},

	removeTask: function () {
		var task = this.get('model');

		task.deleteRecord();
		task.save();
	},

	saveWhenCompleted: function () {
		this.get('model').save();
	}.observes('isCompleted')
});
