import Ember from 'ember';

export default Ember.Route.extend({

    main_deptlist : null,

    model() {

        return $.get("http://localhost:8080/demoapp/v1/maindeptlist?dept_id=1", false);
    },

    afterModel(model) {

        var json = JSON.parse(model);

        this.set('main_deptlist', json);

    },

    setupController : function(controller) {

        controller.set('main_deptlist', this.get('main_deptlist'));

    }
});
