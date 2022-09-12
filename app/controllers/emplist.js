import Ember from "ember";

export default Ember.Controller.extend({

  app_model: Ember.inject.controller("application"),
  
  logincheck: null,

  cookie: null,

  btnclass: true,

  curr_dept: 1,

  all_check: 0,

  confirm_msg : null,

  deptlist: Ember.computed(function () {

    return this.get("main_deptlist");

  }),

  departments: Ember.computed(function () {

    return JSON.parse(this.get('app_model.model')).departments;


  }),

  init: function () {
    this.set("logincheck", false);

    var cookiearr = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );

    this.set("cookie", cookiearr);

    if (this.get("cookie.r") != 2) {
      this.redirect();
    }

    if (this.get("cookie.e") == "null" && this.get("cookie.r") == "null") {
      this.set("logincheck", true);
    } else {
      this.set("logincheck", false);
    }
  },

  redirect() {
    this.replaceRoute("homepage");
  },

  logout() {
    this.transitionToRoute("login");
  },

  actions: {
    Logout() {
      document.cookie = "e=null";
      document.cookie = "r=null";

      console.log(document.cookie);

      this.logout();
    },

    setSelected(selected) {
      this.set("curr_dept", selected);

      var checkbox = document.getElementById("head-checkbox");

      this.set('all_check', 0);

      checkbox.checked = false;

      let btn = document.getElementById("open");

      if (selected == 1) {
        btn.innerHTML = "Move to";
        this.set("btnclass", true);

        this.set("deptlist", this.get("main_deptlist"));
      } else {
        btn.innerHTML = "Remove";

        this.set("btnclass", false);

        for (let i = 0; i < this.get("departments").length; i++) {
          let id = this.get("departments")[i].dept_id;

          if (id == selected) {
            this.set("deptlist", this.get("departments")[i].employees);
            break;
          }
        }
      }
    },

    checkall() {

      var checkboxes = document.getElementsByName("emp_check");

      if (this.get("all_check") == 0) {
        
        for (let i = 0; i < checkboxes.length; i++) {
          
            checkboxes[i].checked = true;
        }

        this.set('all_check', 1);

      }
      else if(this.get("all_check") == 1) {

        for (let i = 0; i < checkboxes.length; i++) {

            checkboxes[i].checked = false;  
        }

        this.set('all_check', 0);
        
      } 

    },

    navi_menu() {


      const open = document.getElementById("open-nav");
      
      const modal_container = document.getElementById("modal-nav");

      var a = open.innerHTML;

      console.log(a);
      

      if (a == '&lt;') {

          open.addEventListener("click", () => {
              open.innerHTML = ">";
              modal_container.classList.add("show1");
          });
      }
      else if (open.innerHTML == '&gt;') {
          
          open.addEventListener("click", () => {
              
              open.innerHTML = "<";
              
              modal_container.classList.remove("show1");
          
          });

      }
      
  },

    transfer_emp() {

      var checkboxes = document.getElementsByName("emp_check");
      var vals = "";
   
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
          
          vals += checkboxes[i].value + ",";
        }
      }

      vals = vals.substring(0, vals.length - 1);

      console.log(vals);

      if(vals == "") {


      }
      else if(this.get('curr_dept') != 1 && vals != ""){


        console.log(vals + " otherdept");

        const open = document.getElementById('open');
        const modal_container = document.getElementById('modal_container');
        const close = document.getElementById('close');

        const heading = document.getElementById('dialog-heading');
        heading.innerHTML = 'Remove Employee';

        const small = document.getElementById('err-id');

        small.classList.add('err');

        console.log(small);

      

      open.addEventListener('click', () => {
        modal_container.classList.add('show-dialog');
        this.set('confirm_msg', 'ARE YOU SURE DO YOU WANT TO REMOVE SELECTED EMPLOYEES');
        this.set('addemp', false);
    })

    close.addEventListener('click', () => {
        modal_container.classList.remove('show-dialog');
        this.set('confirm_msg', null);

    })

    conf.addEventListener('click', () => {
      
      this.set('confirm_msg', 'REMOVED SUCCESSFULLY');

      $.ajax ( {

        url : "http://localhost:8080/demoapp/v1/employee/removeemployee?emp_id=" + vals,
        method: 'PUT',
        async: false,
        success : function(resultText) {

            console.log(resultText);
            
            return resultText;

        },
        error : function(jqXHR, exception){
            
            console.log('error')
        }

} )

     
  })


    }
      else if (this.get('curr_dept') == 1 && vals != ""){


      const open = document.getElementById('open');
      const modal_container = document.getElementById('modal_container');
      const close = document.getElementById('close');

      const heading = document.getElementById('dialog-heading');

      const small = document.getElementById('suc-id');

      console.log(small);

      var man_id = this.get('cookie.e');

      heading.innerHTML = 'Add Employee';

              open.addEventListener('click', () => {
                  modal_container.classList.add('show-dialog')
                  this.set('addemp', true);
              })

              close.addEventListener('click', () => {

                // debugger
                  modal_container.classList.remove('show-dialog');
                  this.set('confirm_msg', null);


              })

              console.log(man_id + " " + this.get('cconf_dept') + " " + vals);

              conf.addEventListener('click', () => {

                $.ajax ( {

                  url : 'http://localhost:8080/demoapp/v1/employee/addemployee?manager_id=' + man_id + "&dept_id=" + this.get('curr_dept') + "&emp_id=" + vals,
                  method: 'PUT',
                  async: false,
                  success : function(resultText) {
      
                      console.log(resultText);
                      
                      return resultText;
      
                  },
                  error : function(jqXHR, exception){
                      
                      console.log('error');
                  } 
                })

                this.set('confirm_msg', 'Employee Added Successfully');
            })


            

      }

      // vals = "";

    },


    transfer_emp_confirm(selected) {

        console.log(selected);
        this.set('conf_dept', selected);


    }

    
  },

});
