import Ember from 'ember';

export function pluralize(singular, count) {
  	var inflector = Ember.Inflector.inflector;
	return count === 1 ? singular : inflector.pluralize(singular);
}

export default Ember.Handlebars.makeBoundHelper(pluralize);
