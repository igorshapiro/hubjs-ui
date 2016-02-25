import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('services', { path: '/services' }, function() {
    this.route('service', { path: '/:service_name' }, function() {
      this.route('messages', {path: '/messages/:type' })
    })
  })
});

export default Router;
