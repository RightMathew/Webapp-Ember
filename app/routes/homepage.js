import Ember from 'ember';

export default Ember.Route.extend({

    projects_list : null,

    cookie : null,

    beforeModel() {

        this.set('cookie', this.controllerFor("homepage").cookie);
        this.set('app_model', this.controllerFor("homepage").app_model);
        

        if(this.get('cookie.e') == 'null' && this.get('cookie.r') == 'null')
        {
            // this.transitionToRoute('login');
        }

    },
    
    model() {

        if(this.get('cookie.e') == 'null' && this.get('cookie.r') == 'null'){

            console.log('login First');

        } else {

            return $.get("http://localhost:8080/demoapp/v1/employee?emp_id=" + this.get('cookie.e') + "&emp_desig=" + this.get('cookie.r'), false);
        }

        
        
    },

    afterModel(model) {

        
        if(this.get('cookie.e') == 'null' && this.get('cookie.r') == 'null'){

        }
        else {


        var json = JSON.parse(model);
        
        var project = json.project;
        }
    },

    setupController : function(controller, model) {

        console.log();

        controller.set('model', model);


        if(this.get('cookie.r') == 2) {


            // controller.set('department', )
        }
        

    }

});



















// MODEL AJAX CALLS SAMPLES

// var _this = this;
        // var json =  $.get("http://localhost:8080/demoapp/v1/employee?emp_id=1&emp_desig=1", true);

        // console.log(json.responseText);
        // console.log(this.controllerFor('login').arr);

        // $.ajax ( {

        //     url : "http://localhost:8080/demoapp/v1/employee?emp_id=1&emp_desig=1",
        //     method: 'GET',
        //     async: false,
        //     success : function(resultText) {

        //         console.log(resultText);
                
        //         return resultText;

        //     },
        //     error : function(jqXHR, exception){
                
        //         console.log('error')
        //     }

        // })