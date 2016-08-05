var myTodoApp = angular.module('myTodoApp');

myTodoApp.controller('myTodoController', function ($scope, $routeParams, $filter /*store*/) {
	console.log('$filter', $filter);
	console.log('$routeParams', $routeParams);
	var STORAGE_ID = 'todos-angularjs';
	$scope.todos = /*$scope.getFromLocalStorage() ||*/ [];
	$scope.newTodo = "";
	$scope.editedTodo = null;

	$scope.$watch('todos', function () {
			$scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
			$scope.completedCount = $scope.todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);
	$scope.$on('$routeChangeSuccess', function () {
		$scope.todos = $scope.getFromLocalStorage();
		console.log("iNside route chagne success");
		console.log('todos', $scope.todos);
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
				console.log('todos.length', $scope.todos.length);
		});
	$scope.addTodo = function () {
		var newTodo = {
			title: $scope.newTodo.trim(),
			completed: false
		};

		if (!newTodo.title) {
			return;
		}
		$scope.saving=true;
		$scope.todos.push(newTodo);
		console.log('$scope.todos', $scope.todos);
		$scope.newTodo = "";
		$scope.saving=false;

		$scope.saveToLocalStorage($scope.todos);

		//$scope.saving = true;
		/*store.insert(newTodo)
			.then(function success() {
				$scope.newTodo = '';
			})
			.finally(function () {
				$scope.saving = false;
			});*/
	};
	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		$scope.originalTodo = angular.extend({}, todo); //clone the original todo to use when on demand.
	};
	$scope.saveEdits = function (todo, event) {
		if (event == "blur" && $scope.saveEvent == "submit") {
			$scope.saveEvent = null;
			return;
		}
		$scope.saveEvent = event;
		if ($scope.reverted) {
			$scope.reverted = null;
			return;
		}
		todo.title = todo.title.trim();

		if (todo.title === $scope.originalTodo.title) {
			$scope.editedTodo = null;
			return;
		}

		todo.title = $scope.originalTodo.title;
		$scope.editedTodo = null;
	};
	$scope.revertEdits = function (todo) {
		$scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
		$scope.editedTodo = null;
		$scope.originalTodo = null;
		$scope.reverted = ture;
	};
	$scope.removeTodo = function (todo) {
		var index = $scope.todos.indexOf(todo);
		index > -1 ? $scope.todos.splice(index, 1) : "";
	};
	$scope.saveTodo = function (todo) {
		$scope.todos.push(todo);
	};
	$scope.toggleCompleted = function (todo, completed) {
		if (angular.isDefined(completed)) {
			todo.completed = completed;
		}
		/*todo.completed = true;*/
	};
	$scope.clearCompletedTodos = function () {
		//store.clearCompleted();
		var completedTodos = [];
		var incompletedTodos = [];
		$scope.todos.forEach(function (todo) {
			if (todo.completed) {
				completeTodos.push(todo);
			} else {
				incompleteTodos.push(todo);
			}
		});
		angular.copy(incompleteTodos, $scope.todos);
		$scope.saveToLocalStorage($scope.todos);
	};
	$scope.markAll = function (completed) {
		$scope.todos.forEach(function (todo) {
			if (todo.completed !== completed) {
				$scope.toggleCompleted(todo, completed);
			}
		});
	};
	$scope.saveToLocalStorage =  function (todos) {
		localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
	};
	$scope.getFromLocalStorage = function () {
		return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
	};


});