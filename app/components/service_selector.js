export default Ember.Component.extend({
  actions: {
    selectService(svc) {
      this.set('service', svc)
      this.sendAction('serviceSelected', svc)
    }
  }
})
