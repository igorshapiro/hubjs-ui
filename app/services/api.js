import Ember from 'ember'

export default Ember.Service.extend({
  services: [],

  init() {
    this._super(...arguments);

    var me = this
    $.getJSON('/api/v1/services')
      .then(_ => me.set('services', _.services))
      .done()
  },
})
