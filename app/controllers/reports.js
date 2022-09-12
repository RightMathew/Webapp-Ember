import Ember from "ember";

export default Ember.Controller.extend({
  app_model: Ember.inject.controller("application"),

  departments: Ember.computed(function () {
    return JSON.parse(this.get("app_model.model")).departments;
  }),

  emp_cnt: null,

  projects: null,

  employee_projects: null,

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

  actions: {
    setSelected(selected) {
      var _this = this;

      $.ajax({
        url: "http://localhost:8080/demoapp/v1/reports?dept_id=" + selected,
        method: "GET",
        async: false,

        success: function (resultText) {
          // console.log(resultText);

          _this.set("resulttext", resultText);
        },

        error: function (jqXHR, exception) {
          console.log("error");
        },
      });

      var json = JSON.parse(this.get("resulttext"));

      this.set("emp_cnt", json.emp_cnt);

      this.set("projects", json.projects);

      console.log(json);
      console.log(json.projects);
      console.log(json.emp_projects);

      let emp_project_name = [];

      let emp_project_cnt = [];

      var com = {}

      var arr = [];

      for (let i = Object.keys(json.emp_projects).length - 1; i >= 0; i--) {

        console.log(Object.keys(json.emp_projects)[i]);
        emp_project_name.push(Object.keys(json.emp_projects)[i]);

        console.log(Object.values(json.emp_projects)[i]);
        emp_project_cnt.push(Object.values(json.emp_projects)[i]);

      }

      for(let i = 0; i < Object.keys(json.emp_projects).length ; i++)
      {
          com.name = emp_project_name[i];
          com.cnt = emp_project_cnt[i];
          arr.push({ ...com });
      }

      console.log(arr);

      this.set("employee_projects", arr);

    },
  },
});
