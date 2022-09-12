import Ember from "ember";

export default Ember.Controller.extend({
  
    app_model: Ember.inject.controller("application"),

  tasks: [],
  projects: null,

  emp: null,
  man: null,
  logincheck: null,

  cookie: null,

  man_modaldata: null,
  dept: [],

  showmenu: false,

  parsed_appmodel : Ember.computed(function () {
    
    return JSON.parse(this.get("app_model.model"));

  }),

  parse_model: Ember.computed(function () {
    
    if(this.get("model") != null || this.get("model") != undefined) {
        return JSON.parse(this.get("model"));
    }

  }),

  empname: Ember.computed(function () {

    return (
      this.get("parse_model.first_name") +
      " " +
      this.get("parse_model.last_name")
    );
  }),

  department_man : Ember.computed(function () {

        var A = this.get('parsed_appmodel');


    if(this.get('parsed_appmodel.departments').length > 0 ) {

        return this.get('parsed_appmodel.departments');
    }

    
  }),

  employee_list : Ember.computed(function () {

    if(this.get('parsed_appmodel.departments').length > 0 ) {

        var A = this.get('parsed_appmodel');

        var b = A.departments[0].employees;
        
        return b;
        }

    }),

    projects_list : Ember.computed(function () {

        if(this.get('parsed_appmodel.departments').length > 0 ) {
    
            var A = this.get('parsed_appmodel');
    
            var b = A.departments[0].projects;
            
            return b;
     }  
    
  }),

  task_list : Ember.computed(function () {

    if(this.get('projects_list') != null) {

        return this.get('projects_list')[0].tasks;
        
 }  

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

    if (this.get("cookie.e") == "null" && this.get("cookie.r") == "null") {
      this.set("logincheck", true);
    } else {
      this.set("logincheck", false);

      if (this.get("cookie.r") == 1) {
        this.set("emp", true);
      } else if (this.get("cookie.r") == 2) {
        this.set("man", true);
      }
    }
  },

  logout() {
    this.replaceRoute("login");
  },

  actions: {
    
    dept_selected(index) {

        this.set('task_list', null);

        this.send('dept_det', index);

    },

    dept_det(index) {

        var A = this.get('parsed_appmodel');

        var b = A.departments[index].employees;

        this.set('employee_list', b);

        b = A.departments[index].projects;

        this.set('projects_list', b);
        
        

    },

    dept_proj_task_det(index) {


        this.set('task_list', this.get('projects_list')[index].tasks);
    },

    forTasks(id) {
      var json = JSON.parse(this.get("model"));

      console.log(id);

      if (id == "x") {
        var task = [];

        this.set("tasks", task);

        console.log(this.get("tasks"));
      } else {
        var task = json.project[id].tasks;

        this.set("tasks", task);

        console.log(this.get("tasks"));
      }
    },

    apiTimerRecord(time, project_id) {
      console.log("inside controller" + "  " + time);

      $.ajax({
        url:
          "http://localhost:8080/demoapp/v1/projects/hours?project_id=" +
          project_id +
          "&emp_id=" +
          this.get("cookie.e") +
          "&hours=" +
          time,
        type: "PUT",
        async: true,
        success: function (result) {
          console.log(result);
        },
      });
    },

    Logout() {
      document.cookie = "e=null";
      document.cookie = "r=null";

      console.log(document.cookie);

      this.logout();
    },

    toLogin() {
      this.transitionToRoute("login");
    },

    modal() {
      
        const open = document.getElementById("open");
        const modal_container = document.getElementById("modal_container");
        const close = document.getElementById("close");

        open.addEventListener("click", () => {
            modal_container.classList.add("show");
        });

        close.addEventListener("click", () => {
            modal_container.classList.remove("show");
        });
    },

    deptemplist() {

      this.transitionToRoute("emplist");
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
        
    }
  },
});

// controller : Ember.inject.controller('login'),
