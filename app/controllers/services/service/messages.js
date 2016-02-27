function callAPI(method, url, data) {
  return $.ajax(url, {
    method: method,
    dataType: "json",
    contentType: 'application/json',
    data: data,
  })
}

export default Ember.Controller.extend({
  path: Ember.inject.service(),

  serviceUrl() {
    return `/api/v1/services/${this.get('serviceName')}`
  },

  reloadMessages() {
    this.get('path').toggleProperty('reload')
    // this.transitionToRoute('services.service.messages')
  },

  actions: {
    deleteRecurringMessage(msg) {
      return callAPI("DELETE",
        `${this.serviceUrl()}/recurring/${msg.recurringMessageId}`)
        .then(this.reloadMessages.bind(this))
    },

    scheduleImmediateRecurringMessage(msg) {
      return callAPI("PUT",
        `${this.serviceUrl()}/recurring/${msg.recurringMessageId}`)
        .then(this.reloadMessages.bind(this))
    },

    deleteDeadMessage(msg) {
      return callAPI("DELETE",
        `${this.serviceUrl()}/dead/${msg.messageId || msg}`)
        .then(this.reloadMessages.bind(this))
    },

    reenqueueDeadMessage(msg) {
      return callAPI("PUT",
        `${this.serviceUrl()}/dead/${msg.messageId || msg}`)
        .then(this.reloadMessages.bind(this))
    },
  }
})
