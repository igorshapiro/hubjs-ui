export default Ember.Controller.extend({
  api: Ember.inject.service(),

  actions: {
    serviceSelected(svc) {
      this.transitionToRoute('services.service', svc.name)
    }
  }
})
