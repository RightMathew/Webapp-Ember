import Ember from 'ember';

export default Ember.Controller.extend({

    model : Ember.computed(function () {
        return this.get("model");
      }),

    sample : Ember.computed(function () {
      return this.get("sample");
    }),

});
