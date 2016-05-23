angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.formData_update = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// Update ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.updateTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData_update.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.update($('#update_id').val(),$scope.formData_update)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData_update = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		$scope.editTodo = function(id){
			 jQuery('#update_id').val(id);
       var arrayPosition = $scope.todos.map(function(arrayItem) { return arrayItem._id; }).indexOf(id);
       jQuery('#update_text').val($scope.todos[arrayPosition].text);

		}

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]).controller('postsController', ['$scope','$http','Posts', function($scope, $http, Posts) {
		$scope.formData = {};
		$scope.formData_update = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all posts and show them
		// use the service to get all the posts
		Posts.get()
			.success(function(data) {
				$scope.posts = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createPost = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			// if ($scope.formData.title != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Posts.create($scope.formData)

					// if successful creation, call our get function to get all the new posts
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.posts = data; // assign our new list of posts
					});
			// }
		};

		// Update ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.updatePost = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData_update.title != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Posts.update($('#update_id').val(),$scope.formData_update)

					// if successful creation, call our get function to get all the new posts
					.success(function(data) {
						$scope.loading = false;
						$scope.formData_update = {}; // clear the form so our user is ready to enter another
						$scope.posts = data; // assign our new list of posts
					});
			}
		};

		$scope.editPost = function(id){
			 jQuery('#update_id').val(id);
       var arrayPosition = $scope.posts.map(function(arrayItem) { return arrayItem._id; }).indexOf(id);
       jQuery('#update_text').val($scope.posts[arrayPosition].title);

		}

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deletePost = function(id) {
			$scope.loading = true;

			Posts.delete(id)
				// if successful creation, call our get function to get all the new posts
				.success(function(data) {
					$scope.loading = false;
					$scope.posts = data; // assign our new list of posts
				});
		};
	}]);;