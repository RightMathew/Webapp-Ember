import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', function() {});
  this.route('signup', function() {});
  this.route('homepage', function() {});
  this.route('emplist', {path : '/homepage/emplist'});
  this.route('reports', {path : '/homepage/reports'});
  this.route('projects', {path : '/homepage/projects'});
  this.route('departments', {path : '/homepage/departments'});
  this.route('newpage');
});

export default Router;
