/**
 * Created by Domain on 4/3/2017.
 */
angular.module('movieRating').controller('RegisterController', RegisterController);

function RegisterController($http) {
    var vm = this;

    vm.register = function() {
      var user = {
          username : vm.username,
          password : vm.password
      };

      if(!vm.username|| !vm.password) {
          vm.error = 'Please add a username and a password.';
      } else {
          if(vm.password !== vm.passwordRepeat) {
              vm.error ='Please make sure the passwords match.';
          } else {
              $http.post('/api/users/register', user).then(function(result){
                 console.log(result);
                 vm.message = 'Successful registration, you can login';
                 vm.error = '';
              }).catch(function(error){
                  console.log(error);
              });
          }
      }
    };
};