/**
 * Created by Domain on 4/4/2017.
 */
angular.module('movieRating').directive('mrNavigation', mrNavigation);

function mrNavigation() {
    return {
        restrict : 'E',
        templateUrl: 'angular-app/navigation-directive/navigation-directive.html'
    }
};