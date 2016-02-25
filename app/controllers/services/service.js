export default Ember.Controller.extend({
  path: Ember.inject.service(),
  messageTypes: [
    { type: 'dead', title: "Dead letter" },
    { type: 'processing', title: "Processing" },
    { type: 'recurring', title: "Recurring" },
  ],

  currentMessageType: Ember.computed.alias('path.messageType')
})
