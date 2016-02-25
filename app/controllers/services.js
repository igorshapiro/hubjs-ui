export default Ember.Controller.extend({
  api: Ember.inject.service(),

  services: Ember.computed.alias('api.services'),
})
