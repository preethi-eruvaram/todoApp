angular.module('myTodoApp', ['ngRoute'])
	.config(function ($routeProvider) {
		var routeConfig = {
			controller: "myTodoController",
			templateUrl: "/index.html"/*,
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}*/
		};
		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});