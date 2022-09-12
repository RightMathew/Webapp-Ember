import Ember from 'ember';

export default Ember.Controller.extend({

    selectedState : null, // for state Selction

    // First name validation 

    fn_bool : null,
    fn_class : null,
    fn_small : null,
    fn_validbool : false,

    // Last name Validation

    ln_bool : null,
    ln_class : null,
    ln_small : null,
    ln_validbool : false,

     // Dob Validation

     dob_bool : null,
     dob_class : null,
     dob_small : null,
     dob_validbool : false,

     // flatno Validation

     fln_bool : null,
     fln_class : null,
     fln_small : null,
     fln_validbool : false,

      // Street Validation

      str_bool : null,
      str_class : null,
      str_small : null,
      str_validbool : false,

      // City Validation

      ct_bool : null,
      ct_class : null,
      ct_small : null,
      ct_validbool : false,

      // pin Validation

      pin_bool : null,
      pin_class : null,
      pin_small : null,
      pin_validbool : false,

      // doj Validation

      doj_bool : null,
      doj_class : null,
      doj_small : null,
      doj_validbool : false,

      // doj Validation

      email_bool : null,
      email_class : null,
      email_small : null,
      email_validbool : false,

      // pass Validation

      pass_bool : null,
      pass_class : null,
      pass_small : null,
      pass_validbool : false,

      // cpass Validation

      cpass_bool : null,
      cpass_class : null,
      cpass_small : null,
      cpass_validbool : false,

      // state Validation

      state_bool : null,
      state_class : null,
      state_small : null,
      state_validbool : false,

    actions : {

        Submit() {

            if(this.get('fn_validbool') === true && this.get('ln_validbool') === true 
            && this.get('dob_validbool') === true && this.get('fln_validbool') === true 
            && this.get('str_validbool') === true && this.get('ct_validbool') === true 
            && this.get('pin_validbool') === true && this.get('doj_validbool') === true  
            && this.get('email_validbool') === true && this.get('pass_validbool') === true
            && this.get('cpass_validbool') === true && ( ( this.get('selectedState') != null ) && ( this.get('state_validbool') === true ) ) ){
                
                var first_name = this.get('first_name').trim();
                var last_name = this.get('last_name').trim();
                var gender;

                if(document.getElementById('dot-1').checked){

                    gender = 'm';
                }
                else {
    
                    gender = 'f';
                }

                var dob = this.get('dob');
                var address = this.get('flat_no').trim() + ", " + this.get('street').trim() + ", " + this.get('city').trim() + ", " + this.get('selectedState') + ", " + this.get('pincode').trim();
                var doj = this.get('doj');
                var designation;

                if(document.getElementById('dot-3').checked){

                    designation = 1;
                }
                else {
        
                    designation = 2;
                }

                var email = this.get('email').trim();
                var pass = this.get('pass');

                var check;

                $.ajax ({

                    url : "http://localhost:8080/demoapp/v1/signup?first_name=" + first_name + "&last_name=" + last_name + 
                            "&gender=" + gender + "&address=" + address + "&dob=" + dob + "&doj=" + doj + 
                            "&emp_designation=" + designation + "&email=" + email + "&password=" + pass,
                    
                    method : 'POST',
                    async: false,
                
                    success : function(resultText){
                
                        console.log(resultText);
                        check = resultText;

                    }
                });

                if(check == 1)
                {
                    this.success_validate();
                }

            }
            

        },

        setSelected(selected) {


            if(selected === null || selected === "Select a state...")
            {
                this.set('state_class', 'error');
                this.set('state_bool', 'true');
                this.set('state_small', 'Select a State');
                this.set('state_validbool', false);
   
            }
            else {
                
                this.set('state_class', 'success');
                this.set('state_bool', 'true');
                this.set('state_validbool', true);
                this.set('selectedState', selected);
            }

        },


        fieldEmptyValid(value, clas, bool, small, msg, valid) {

            if(value.trim() === '')
            {
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, msg);
                this.set(valid, false);

            }
            else {
                
                this.set(clas, 'success');
                this.set(bool, 'true');
                this.set(valid, true);

            }
            
        },

        pinValid(pincode, clas, bool, small, msg, valid) {

            var a = /^[1-9][0-9]{5}$/.test(pincode);

            if(a === false)
            {
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, msg);
                this.set(valid, false);

                
            }
            else {
                
                this.set(clas, 'success');
                this.set(bool, 'true');
                this.set(valid, true);

                
            }

        },

        emailValid(email, clas, bool, small, msg, valid) {

            var a = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            var check;
            
            if(a == false)
            {

                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, msg);
                this.set(valid, false);

                
            }
            else {

                $.ajax ({

                    url: "http://localhost:8080/demoapp/v1/checks?email=" + email,
                    method : 'POST',
                    async: false,
    
                    success : function(resultText) {
    
                        check = resultText;
    
                    }
    
                });

                if (check == 0) {

                    this.set(clas, 'success');
                    this.set(bool, 'true');
                    this.set(valid, true);
                }
                else {

                    this.set(clas, 'error');
                    this.set(bool, 'true');
                    this.set(small, 'Email Id Already Exists.');
                    this.set(valid, false);
                }
                
                
            }

            
        },

        passReg(pwd, clas, bool, small, valid) {

            var numbers = /[0-9]/g;
            var upperCaseLetters = /[A-Z]/g;
            var lowerCaseLetters = /[a-z]/g;
            var special = /[!@#$%^&*]/g;
            
            
            if(pwd.length===0){
                
                console.log("lesser character");

                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, 'Password can\'t be Blank');
                this.set(valid, false);

        
            }
            else if(pwd.length<8) {
            
                console.log("* Length must be more than 8 characters");
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, '* Length must be more than 8 characters');
                this.set(valid, false);
             
            }
            else if (pwd.length>16) {

                console.log("* Length must not be more than 16 characters");
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, '* Length must not be more than 16 characters');
                this.set(valid, false);
            
            }
            else if(!pwd.match(numbers)) {
                
                console.log("* A number is required");
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, '* Password must contain a number');
                this.set(valid, false);

            }
            else if(!pwd.match(upperCaseLetters)) {

                console.log("* A upper-case letter is required");
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, '* Password must contain a Upper-case');
                this.set(valid, false); 
                
            }
            else if(!pwd.match(lowerCaseLetters)) {
                
                console.log("* A lower-case letter is required");
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, '* Password must contain a Lower-case');
                this.set(valid, false);
            
            }
            else if(!pwd.match(special)) {
                
                console.log("*(! @ # $ % ^ & *) A special character is required");
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, '*(! @ # $ % ^ & *) A special character is required');
                this.set(valid, false);
            }
            else {

                this.set(clas, 'success');
                this.set(bool, 'true');
                this.set(valid, true);
            }


        },

        passConfirm(pwd, cpass, clas, bool, small, msg, valid) {
            
            if(pwd != cpass)
            {

                console.log(1);
                this.set(clas, 'error');
                this.set(bool, 'true');
                this.set(small, msg);
                this.set(valid, false);
                console.log(2);
                
            }
            else {
                
                this.set(clas, 'success');
                this.set(bool, 'true');
                this.set(valid, true);

                
            }


        }

        
    },

    success_validate() {
            
        this.transitionToRoute('login');
    },

    
});


