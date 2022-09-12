import Ember from 'ember';

export default Ember.Component.extend({
    
    myTimer : null,
    
    time : 0,
    
    projectlength : null,

    click : false,

    timeintervalshow : false,

    project_id : null,

    projectarr : Ember.computed('model', function(){

        var json = JSON.parse(this.get('model'));

        var projects = json.project;

        this.set('projectlength', projects.length);

        return projects;

    }),

    

    actions : {

        forTasksComp(id) {

            if(this.click == true)
            {   
                this.sendAction('forTasks', id);           
            }
        },


        timer(id, index, proj_id) {

            var qwe = document.getElementById(id);

            if(qwe.innerHTML == 'Check - In'){

                qwe.classList.remove('checked-in');
                
                qwe.classList.add('checked-out');

                qwe.textContent = 'Check - Out';
                
                this.set('timeintervalshow', true);

                console.log(proj_id);

                this.click = true;
                
                this.send('forTasksComp', index);

                for(let i = 0; i < this.get('projectlength'); i++)
                {
                    
                    if(i != index)
                    {
                        var dis = document.getElementById('projbtn' + i);
                        dis.classList.add('grey-out');
                        dis.disabled = true;
                    }
                }


                var c = 1;
                var _this = this;
                
                this.myTimer = setInterval(myclock, 1000);

                function myclock() {
            
                    _this.time = c++;

                    console.log(_this.time + " " + id);
                
                };

                console.log('checked_in');

            }

            else if (qwe.innerHTML == 'Check - Out') {

                qwe.textContent = 'Check - In';

                qwe.classList.remove('checked-out');

                qwe.classList.add('checked-in');

                this.timeintervalshow = false;

                for(let i = 0; i < this.get('projectlength'); i++)
                {
                   
                    if(i != index)
                    {
                        var dis = document.getElementById('projbtn' + i);
                        dis.classList.remove('grey-out');
                        dis.disabled = false;
                    }
                }

                this.sendAction('apiTimerRecord', this.time, proj_id);
                
                clearInterval(this.myTimer);
                
                console.log('checked_out');

                this.send('forTasksComp', 'x');

                this.click = false;
                
            }
        },
        
    },

 

});



// this.set('timediff2', new Date())

//                 console.log(this.get('timediff2'));

//                 var diff =(this.get('timediff1').getTime() - this.get('timediff2').getTime()) / 1000;
                
//                 diff /= (60 * 60 * 24);

//                 console.log(diff);
        
//                 console.log(Math.abs(Math.round(diff)));

// diff_days(dt2, dt1) 
// {

//     var diff =(dt2.getTime() - dt1.getTime()) / 1000;
//     diff /= (60 * 60 * 24);
//     return Math.abs(Math.round(diff));

// },
