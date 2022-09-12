import Ember from 'ember';

export default Ember.Route.extend({

   beforeModel() {

      var cookiearr = document.cookie
                        .split(";")
                        .map(cookie => cookie.split('='))
                        .reduce((accumulator, [key, value]) => ({
                            ...accumulator, [key.trim()]: decodeURIComponent(value)}), 
                        {});

      this.set('cookie', cookiearr);

   },

   model() {
        
      console.log('application model');
      
      console.log(this.get('cookie'));

      if(this.get('cookie.e') == 'null' && this.get('cookie.r') == 'null'){

         console.log('login First');
         
      } else {

         return $.get("http://localhost:8080/demoapp/v1/employee?emp_id=" + this.get('cookie.e') + "&emp_desig=" + this.get('cookie.r'), false);
      }

   },

   afterModel(model) {

      if(this.get('cookie.e') != 'null' && this.get('cookie.r') != 'null'){

         console.log(model);
         
      }

   },

   setupController : function(controller, model) {

         controller.set('model', model);
         controller.set('sample', '123');

  }

});
