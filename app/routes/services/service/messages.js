export default Ember.Route.extend({
  path: Ember.inject.service(),
  serviceName: Ember.computed.alias('path.serviceName'),
  messageType: Ember.computed.alias('path.messageType'),

  updateModel: function() {
    var serviceName = this.get('serviceName')
    var messageType = this.get('messageType')
    if (!messageType || !serviceName) return

    // var boundTransform = this.transformMessage.bind(this)
    var controller = this.get('controller')
    controller.set('messageType', messageType)
    controller.set('serviceName', serviceName)
    $.getJSON(`/api/v1/services/${serviceName}/${messageType}`)
      .then(_ => controller.set('model', _.messages))
  }.observes('serviceName', 'messageType', 'path.reload').on('init'),
})
