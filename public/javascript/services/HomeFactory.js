(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		o.posts = [];
		o.postPost = postPost;
		o.deletePost = deletePost;
		o.getPost = getPost;
		return o;

		function postPost(post) {
			var q = $q.defer();
			$http.post('/v1/api/Post', post).success(function(res) {
				post._id = res.id;
				post.dateCreated = new Date();
				o.posts.push(post);
				q.resolve();
			}).error(function(res) {
				q.reject(res);
			});
			return q.promise;
		};

		function deletePost(post) {
			$http.post('/v1/api/deletePost/' + post._id).success(function(res) {
				o.posts.splice(o.posts.indexOf(post), 1);
			});
		};

		function getPost(id) {
			var q = $q.defer();
			$http.get('/v1/api/Post/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		function getPosts() {
			$http.get('/v1/api/Post').success(function(res) {
				for (var i = 0; i < res.length; i += 1) {
					res[i].dateCreated = new Date(res[i].dateCreated);
					o.posts.push(res[i]);
				}
			});
		}
		getTasks();
	}
})();