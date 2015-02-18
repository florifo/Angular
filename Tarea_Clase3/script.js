
	var origamiApp = angular.module('origamiApp', ['ngRoute']);

	//Configuramos las rutas mediante el route provider
	origamiApp.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl : 'partials/inicio.html',
				controller  : 'mainController'
			})

			.when('/parametro', {
				templateUrl : 'partials/parametro.html',
				controller  : 'parametroController'
			})

			.when('/clima/:postalcode/:days', {
				templateUrl : 'partials/clima.html',
				controller  : 'climaController'
			});
	});


	//Factory
	origamiApp.factory('Clima',['$http', '$q', '$cont', function($http, $q, $cnt) {
	    
	    var URL   = 'http://api.openweathermap.org/data/2.5/forecast/daily';

	    return{

	      obtenerClimaPorPostal : function(postalcode, days){

	          var defer = $q.defer();

	          $http({
	            method:'GET', 
	            url:URL,
	            params: 
	            {
	            	q: postalcode,
	            	mode: 'json',
	            	units: 'metric',
	            	cnt: days
	            }
	          }).
	              success(function(data, status, headers, config){
	                  defer.resolve(data);
	              }).
	              error(function(data, status, headers, config){
	                  defer.reject(data);
	              });

	          return defer.promise;
	      }
	    }

	}]);
	

	origamiApp.controller('mainController', function($scope) {
		$scope.message = 'Angular.js Rocks!';
	});


	origamiApp.controller('parametroController', function($scope) {
		$scope.message = 'Escribe tu codigo postal y dale click al boton';
	});


	origamiApp.controller('climaController', function($scope, $routeParams, Clima) {
		$scope.message = 'Estamos solicitando el clima para ' ;
		$scope.loading = true;
		$scope.date = new Date();

		Clima.obtenerClimaPorPostal($routeParams.postalcode,$routeParams.days).then( function(data){
	        $scope.clima = data;
	        $scope.loading = false;
	        $scope.showitem = true;
	    });
});