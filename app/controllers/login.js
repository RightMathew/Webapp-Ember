import Ember from 'ember';

export default Ember.Controller.extend({

    titleval:null,
    bool1:false,
    bool2:false,

    cookie : null,


    init : function() {
        
        // document.cookie = "e=null";
        // document.cookie = "r=null";

        var cookiearr = document.cookie
                    .split(";")
                    .map(cookie => cookie.split('='))
                    .reduce((accumulator, [key, value]) => ({
                        ...accumulator, [key.trim()]: decodeURIComponent(value)}), 
                    {});

        this.set('cookie', cookiearr);

        if(this.get('cookie.e') != 'null' && this.get('cookie.r') != 'null') {
            
                this.transitionToRoute('homepage');
        }

    },


    actions: {
        
        login() {
            
            var email = this.get('email');
            var pass = this.get('password');
            var flag = false;

            var _this = this;
            let arr;

            $.ajax({
                
                url : "http://localhost:8080/demoapp/v1/login?email=" + email + "&password=" + pass,
                method : 'POST',
                async: false,
                success : function(resultText){
                    
                    if (resultText === 'emailmismatch') {


                        _this.set('titleval', 'Invalid Email');
                        _this.set('bool1', true);

                        console.log(_this.get('titleval'));
                    }

                    else if (resultText === 'passmismatch') {
                        _this.set('titleval', 'Invalid Password');
                        _this.set('bool1', 'true');
                    }

                    else {

                        
                        _this.set('titleval', 'Login Success');
                        _this.set('bool2', 'true');

                        arr = resultText.split(",");
                        console.log(arr[0] + " " + arr[1]);
                        flag = true;
                    }

                },
                error : function(jqXHR, exception){
                    console.log('Error Occured While LOGIN!!!' + " " + jqXHR + " " + exception);
                }
            });

            if(flag) {
        
                this.set('arr', arr);

                var today = new Date();

                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

                document.cookie = "createtime=" + date;
                document.cookie = "e=" + arr[0];
                document.cookie = "r=" + arr[1];

                this.success_validate();

            }

            else {
                alert("login error");
            }
            
        }
    },

    success_validate() {

            
            this.transitionToRoute('homepage');
    }

    
});