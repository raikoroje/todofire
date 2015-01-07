import Ember from 'ember';

export default Ember.ArrayController.extend({
	needs: ['tasks'],
	allTasks: Ember.computed.alias('controllers.tasks'),
	itemController: 'task',
	canToggle: function () {
		var anyTasks = this.get('allTasks.length');
		var isEditing = this.isAny('isEditing');

		return anyTasks && !isEditing;
	}.property('allTasks.length', '@each.isEditing')
});
