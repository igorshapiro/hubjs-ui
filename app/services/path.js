import Ember from 'ember'

export default Ember.Service.extend({
  init() {
    this._super(...arguments);

    this.set('router', Ember.getOwner(this).lookup('router:main'))
  },

  updateRouteParams: function() {
    this.safeSet('serviceName', 'services.service', 'service_name')
    this.safeSet('messageType', 'services.service.messages', 'type')
  }.observes('router.url').on('init'),

  safeSet(attr, route, param) {
    // Routes contain dots, so we can't access them using the dot notation in
    // Ember.Object.get(...)
    var routeParams = this.get('router.router.state.params')[route]
    this.set(attr, routeParams ? routeParams[param] : null)
  }
})
