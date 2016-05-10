angular.module('myKU-register', ['ui.router'])
  .controller('RegisterController', function ($http, courseService, userService) {
    var self = this

    //self.setDataToController();

    self.currentUser = userService; 
    self.enrolled_courses = []; //List of enrolled courses
    self.course_list = []; //List of all courses


    /*bind variable to show in 'view'*/
    self.selected_course; //Couse detail 
    self.selected_courseDeeper; //Couse more detail
    self.predrop_course; //Course that is going to drop
    self.totalCredit = 0; //Total credit of all enrolled course

    self.blank_detail = [ {
                            "location": "-",
                            "id": "-",
                            "type": "-",
                            "instructors": [ "-" ],
                            "date": "-",
                            "enrolled": 0,
                            "accept": 0
                            }
                        ]

    
    //Get list of all courses 
    $http.get('https://whsatku.github.io/skecourses/list.json')
    .success(function(response){
      self.course_list = response //List of all courses
    })

    //set data in controller
    self.setDataToController = function() {

    }


    self.enroll = function (course) {
      //Check whether the course already exist or not 
      var alreadyAdded = courseService.isEnroll(course);

      //if not, add the course
      if(!alreadyAdded && !self.isExceed(course) ) {
        courseService.regisCourse(course); //store in courseService
        self.enrolled_courses.push(course); //store in controller variable
        self.addTotalCredit(course);
      }
    }


    self.drop = function (course) {
      var remove_index = 0;
      courseService.dropCourse(course); //drop from courseService

      for(i = 0; i < self.enrolled_courses.length; i++) {
        if(self.enrolled_courses[i].id == course.id) {
          remove_index = i;
          break;
        }
      }
      self.enrolled_courses.splice(remove_index, 1); //drop from controller variable
      self.minusTotalCredit(course);
    } 


    self.getCourseInfo = function(course) {
      var getID = course.id;

      //get course details consist of 'name', 'credit', 'prereq', 'id', and 'description'
      $http.get('https://whsatku.github.io/skecourses/' + course.id + '.json')
      .success(function(response){
        self.selected_course = response //detail of the selected course(show in 'view')
      })

      //get more details consist of 'location', 'section', 'type', 'instructor', etc.
      $http.get('https://whsatku.github.io/skecourses/sections/' + course.id + '.json')
      .success(function(response){
        self.selected_courseDeeper = response //more detail of the selected course(show in 'view')
      })
      .error(function(data) {
        self.selected_courseDeeper = self.blank_detail;
      });


    }


    self.setPreDrop = function(course) {
      self.predrop_course = course;

    }
   
    self.isEnroll_lc = function(course) {
      return courseService.isEnroll(course);
    }

    self.addTotalCredit = function(course) {
       $http.get('https://whsatku.github.io/skecourses/' + course.id + '.json')
        .success(function(response){
        self.totalCredit += response.credit.total;       
      })
    }

    self.minusTotalCredit = function(course) {
       $http.get('https://whsatku.github.io/skecourses/' + course.id + '.json')
        .success(function(response){
        self.totalCredit -= response.credit.total;       
      })
    }

    self.isExceed = function(course) {
      //var oldTotalCredit = self.totalCredit;
      
        $http.get('https://whsatku.github.io/skecourses/' + course.id + '.json')
        .success(function(response){
        self.thisCredit = response.credit.total;       
      })

      if( self.totalCredit + self.thisCredit  > 22 ) {
        console.log("going to exceed");
        window.alert("Credit's maximum exceed");
        return true;
      }
      return false;
    }

    self.showJSON = function() {
      var JSONtext = "";

      window.alert(JSON.stringify(self.enrolled_courses));
    }

  })





//LOGIN CONTROLLER
.controller('LoginController', function ($http, userService, $state) {
  var self = this;



  self.authenticate = function(Id, password) {
      console.log("user id = " + Id + ", password = " + password);

      $http.get('http://52.37.98.127:3000/v1/5610546711/'+ Id +'?pin=0108')
        .success(function(response){
        console.log("userId-" + Id + " exist");
        console.log("pswrd: " + response.pass);

        if(password == response.pass) {
          console.log("correct password!");

          self.setService(response)
        }
      })

  }


  self.setService = function(authen_data) {
    userService.name = authen_data.firstName;
    userService.surname = authen_data.lastName;
    userService.id = authen_data.stdId;
    userService.facul = authen_data.facul;
    userService.major = authen_data.major;

    console.log(userService.name + "has login to the system.");

    $state.go('information');
  }



})
  