import Ember from 'ember';
// import { service } from '@ember/service';
// import {inject} from 'ember/service';

export default Ember.Component.extend({
    
    report : null,

    actions : {

        Logout(){

            this.logout();
        },

        generateReport() {

            if(this.get('report') == null)
            {
                this.set('report', 'abc');
                console.log('report generated');
            }
            else {

                console.log('data fetched');
            }

        }
    },

    logout() {

            console.log(document.cookie);
            console.log('asda');
        
            this.replaceRoute('login');
    }

});
