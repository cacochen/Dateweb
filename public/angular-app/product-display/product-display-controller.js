/**
 * Created by Domain on 3/27/2017.
 */
angular.module('movieRating').controller('productController', productController);

function productController($route, $routeParams,$window, productDataFactory, AuthFactory, jwtHelper) {
    var vm = this;
    var _productId = $routeParams.productId;
    vm.isSubmitted = false;

    productDataFactory.productDisplay(_productId).then(function(response) {
        console.log(response);
        vm.product = response.data;
    });

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

    // Add a new review for the movie
    vm.addReview = function() {

        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;

      var postData = {
          name: username,
          dislike: vm.dislike,
          review: vm.review
      };
      if (vm.reviewForm.$valid) {
          productDataFactory.postReview(_productId, postData).then(function(response) {
            if(response.status === 201) {
                console.log("Bingo!!");
                $route.reload();
            }
          }).catch(function(error) {
             console.log(error);
          });
      } else {
          vm.isSubmitted = true;
      }
    };

}