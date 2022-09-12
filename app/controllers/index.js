import Ember from 'ember';

export default Ember.Controller.extend({

    actions : {

        Login(){
            
            this.transitionToRoute('login');
            // console.log(this.get('model.model'));
        },

        Signup(){
            
            this.transitionToRoute('signup');
        }
    }
});