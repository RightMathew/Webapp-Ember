import Ember from 'ember';

export default Ember.Component.extend({

    taskarr : Ember.computed('model', 'model.@each', function(){
        
        // console.warn(this.get('model'));
        
        return this.get('model');

    }),

});
