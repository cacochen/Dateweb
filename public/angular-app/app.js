/**
 * Created by Domain on 3/21/2017.
 */
angular.module("movieRating", ['ngRoute']).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'public/angular-app/main/main.html'
        })
        .when('/products', {
           templateUrl: 'angular-app/product-list/products.html',
            controller : productsController,
            controllerAs : 'vm'
        })
        .when('/products/:productId', {
            templateUrl: 'angular-app/product-display/product.html',
            controller : productController,
            controllerAs : 'vm'
        })
        .when('/register', {
            templateUrl : 'angular-app/register/register.html',
            controller : RegisterController,
            controllerAs : 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
}

