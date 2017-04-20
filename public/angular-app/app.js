/**
 * Created by Domain on 3/21/2017.
 */
angular.module("movieRating", ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/', {
            templateUrl : 'public/angular-app/main/main.html',
            access : {
                restricted : false
            }
        })
        .when('/products', {
            templateUrl : 'angular-app/product-list/products.html',
            controller : productsController,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/products/:productId', {
            templateUrl : 'angular-app/product-display/product.html',
            controller : productController,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/register', {
            templateUrl : 'angular-app/register/register.html',
            controller : RegisterController,
            controllerAs : 'vm',
            access : {
                restricted : false
            }
        })
        .when('/profile', {
            templateUrl : 'angular-app/profile/profile.html',
            controllerAs : 'vm',
            access : {
                restricted : true
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}


function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if(nextRoute.access !== undefined && nextRoute.access.restricted && !window.sessionStorage.token && !authFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    })
}

