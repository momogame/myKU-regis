angular.module('myKU-register')
.service('Momoservice', function () {
  var self = this;
  
  self.price = 0.50;

})

.service('userService', function() {
  var self = this;

  self.name = "Unknown";
  self.surname = "Man";
  self.id = "0101001011";
  self.facul = "Engineering";
  self.major = "Software and Knowledge Engineering";

})

.service('courseService', function() {
  var self = this;

  self.totalCredit = 0;
  self.enrolledCourses_S = [];

  self.regisCourse = function(course) {
    self.enrolledCourses_S.push(course);
    //self.totalCredit += course.credit.total;
  }

  self.dropCourse = function(course) {
    var remove_index = 0;
    for(i = 0; i < self.enrolledCourses_S.length; i++) {
        if(self.enrolledCourses_S[i].id == course.id) {
          console.log("it's the same subject");
          remove_index = i;
          //self.totalCredit -= course.credit.total
          break;
        }
      }
     self.enrolledCourses_S.splice(remove_index, 1); 
  }

  self.isEnroll = function(course) {

    for(i = 0; i < self.enrolledCourses_S.length; i++) {
      if(self.enrolledCourses_S[i].id == course.id) {
        return true;
      }
    }
    return false;
  }


})
  