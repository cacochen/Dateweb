/**
 * Created by Domain on 3/29/2017.
 */
angular.module('movieRating').factory('productDataFactory', productDataFactory);

function productDataFactory($http) {
    return {
        productList : productList,
        productDisplay : productDisplay,
        postReview : postReview,
        postProduct : postProduct
    };


    function productList() {
        return $http.get('/api/products').then(complete).catch(failed);
    }

    function productDisplay(_productId) {
        return $http.get('/api/products/' + _productId).then(complete).catch(failed);
    }

    function postReview(_productId, review) {
        return $http.post('/api/products/' + _productId + '/reviews', review).then(complete).catch(failed);
    }

    function postProduct(product) {
        return $http.post('/api/products',product).then(complete).catch(failed);
    }

    function complete(response) {
        return response;
    }

    function failed(error) {
        console.log(error.statusText);
    }

}