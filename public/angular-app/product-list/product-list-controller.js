/**
 * Created by Domain on 3/27/2017.
 */
angular.module('movieRating').controller('productsController', productsController);

function productsController($route, productDataFactory) {
    var vm = this;
    vm.title = 'Movie Review App';
   productDataFactory.productList().then(function(response) {
       console.log(response);
       vm.products = response.data;
    });

    vm.addProduct = function() {
        var postData = {
            name: vm.name,
            director: vm.director,
            language: vm.language,
            runtime: vm.runtime,
            boxOffice: vm.boxOffice
        };
        if (vm.productForm.$valid) {
            productDataFactory.postProduct(postData).then(function(response) {
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