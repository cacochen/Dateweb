/**
 * Created by Domain on 4/4/2017.
 */
angular.module('movieRating').factory('AuthFactory', AuthFactory);

function AuthFactory() {
    return {
        auth : auth
    };

    var auth = {
        isLoggedIn: false
    };
}