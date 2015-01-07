import DS from 'ember-data';
import ENV from 'todofire/config/environment';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase('https://' + ENV.firebase_instance + '.firebaseio.com')
});
