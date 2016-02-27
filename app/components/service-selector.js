import Ember from 'ember'

export default Ember.Component.extend({
  path: Ember.inject.service(),
  api: Ember.inject.service(),
  services: Ember.computed.alias('api.services'),
  serviceName: Ember.computed.alias('path.serviceName'),

  serviceOptions: Ember.computed('api.services', 'serviceName', function() {
    var svcName = this.get('serviceName')
    return this
      .get('services')
      .map(_ => ({ name: _.name, active: _.name === svcName }))
  })
})
