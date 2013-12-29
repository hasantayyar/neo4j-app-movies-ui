'use strict';

/* Controllers */

var contentappControllers = angular.module('contentappControllers', []);

contentApp.directive('carousel', function() {
	var res = {
     restrict : 'A',
     link     : function (scope, element, attrs) {
           scope.$watch(attrs.carousel, function(movies) {  
           	if(scope.movies.length > 0)
           	{
           		movies = scope.movies;
           		var genre = element.attr('data-genre');
           		var html = '';
	            for (var i = 0; i < movies.length; i++) {
	            	if ($.inArray(genre, movies[i].genres) != -1) {
	            	var movieTitleLink = movies[i].title.replace('/', ' ')
	                 html += '<div class="item">' +
						          '<div class="thumbnail">' +
						            '<a href="index.html#/movies/' + movies[i].title + '"><img alt="100%x180" src="assets/img/posters/' + movieTitleLink + '.jpg"></a>' +
						          '</div>' +
						          '<span><a href="index.html#/movies/' + movies[i].title + '">' + movies[i].title + '</a></span>' +
						        '</div>';
						    };
	            }
            
            	element[0].innerHTML = html;

            	setTimeout(function() {
	            $(element).owlCarousel({
						items : 8,
						itemsDesktop : [1199,6],
						itemsDesktopSmall : [980,4],
						itemsTablet: [768,3],
						itemsMobile: [479, 2]
					});

            	$("#owl-example").owlCarousel({
					    items : 3,
					    itemsDesktop : [1199,3],
					    itemsDesktopSmall : [980,3],
					    itemsTablet: [768,2]
					});
	           }, 0);
			}
        	
        });
       }
   };
  return res;
});

contentApp.controller('MovieListCtrl', ['$scope', '$http', '$templateCache', 
	function($scope, $http, $templateCache) {
	  	$scope.url = 'http://neo4jmovies.azurewebsites.net:80/api/v0/movies?api_key=special-key&neo4j=false';
	  	$scope.movies = [];

	  	var fetchMovies = function()
	  	{
	  		$http({method: 'GET', url: $scope.url, cache: $templateCache}).
			    success(function(data, status, headers, config) {
			    	$scope.movies = data;
			    }).
			    error(function(data, status, headers, config) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    });
	  	}

	  	fetchMovies();
	}]);



contentApp.controller('MovieItemCtrl', ['$scope', '$routeParams', '$http', '$templateCache',
  function($scope, $routeParams, $http, $templateCache) {
    $scope.movieId = $routeParams.movieId;
    $http({method: 'GET', url: 'http://neo4jmovies.azurewebsites.net:80/api/v0/movies/title/' + $scope.movieId + '?api_key=special-key&neo4j=false', cache: $templateCache}).
	    success(function(data, status, headers, config) {
	    	$scope.movie = data;
	    }).
	    error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    });

    $http({method: 'GET', url: 'http://neo4jmovies.azurewebsites.net:80/api/v0/people/director/movie/' + $scope.movieId + '?api_key=special-key&neo4j=false', cache: $templateCache}).
	    success(function(data, status, headers, config) {
	    	$scope.movie.director = data;
	    }).
	    error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    });
  }]);
			