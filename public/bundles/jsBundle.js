(function () {
    'use strict';
    angular.module('app', ['ui.router', 'ui.bootstrap']).config(Config);
    Config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('Home', {
            url: '/home',
            templateUrl: 'views/home.html'
        }).state('Login', {
            url: '/',
            templateUrl: 'views/login.html'
        }).state('Profile', {
            url: '/Profile',
            templateUrl: 'views/profile.html'
        }).state('Register', {
            url: '/Register',
            templateUrl: 'views/register.html'
        });
        $urlRouterProvider.otherwise('/');
    }
})();


(function () {
    'use strict';
    angular.module('app').controller('homeController', homeController);

    homeController.$inject = [];

    function homeController() {
        var vm = this;

    }
})();
(function () {
    'use strict';
    angular.module('app').controller('indexController', indexController);

    indexController.$inject = ["$modal"];

    function indexController($modal) {
        var ix = this;

        // Right Hand Menu Dropdown 
        ix.status = {
            isopen: false
        };

        ix.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            ix.status.isopen = !ix.status.isopen;
        };

        // Modal for Post Button

        ix.open = function (size) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/myModalContent.html',
                controller: 'myModalController',
            });
        };
    }
})();
(function () {
    'use strict';
    angular.module('app').controller('loginController', loginController);

    loginController.$inject = ["UserFactory", "$state"];

    function loginController(UserFactory, $state) {
        var lg = this;
        lg.user = {};
        lg.status = UserFactory.status;
        lg.register = register;
        lg.login = login;
        lg.logout = UserFactory.logout;

        function register() {
            var u = lg.user;
            if (!u.username || !u.password || !u.cpassword || !(u.password === u.cpassword)) {
                return false;
            }
            UserFactory.register(u).then(function () {
                $state.go('Home');
            });
        }

        function login() {
            UserFactory.login(lg.user).then(function () {
                $state.go('Home');
            });
        }
    }
})();
(function () {
    'use strict';
    angular.module('app').controller('myModalController', myModalController);

    myModalController.$inject = ["$modal"];

    function myModalController($modalInstance, items) {
        var vm = this;

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        }
    }
})();
(function () {
    'use strict';
    angular.module('app').factory('HomeFactory', HomeFactory);

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
            $http.post('/v1/api/Post', post).success(function (res) {
                post._id = res.id;
                post.dateCreated = new Date();
                o.posts.push(post);
                q.resolve();
            }).error(function (res) {
                q.reject(res);
            });
            return q.promise;
        };

        function deletePost(post) {
            $http.post('/v1/api/deletePost/' + post._id).success(function (res) {
                o.posts.splice(o.posts.indexOf(post), 1);
            });
        };

        function getPost(id) {
            var q = $q.defer();
            $http.get('/v1/api/Post/' + id).success(function (res) {
                q.resolve(res);
            });
            return q.promise;
        };

        function getPosts() {
            $http.get('/v1/api/Post').success(function (res) {
                for (var i = 0; i < res.length; i += 1) {
                    res[i].dateCreated = new Date(res[i].dateCreated);
                    o.posts.push(res[i]);
                }
            });
        }
        getTasks();
    }
})();
(function () {
    'use strict';
    angular.module('app').factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q'];

    function UserFactory($http, $q) {
        var o = {};
        o.status = {};
        if (getToken()) {
            o.status.isLoggedIn = true;
            o.status.username = getUsername();
        }
        o.setToken = setToken;
        o.getToken = getToken;
        o.removeToken = removeToken;
        o.register = register;
        o.login = login;
        o.logout = logout;
        return o;

        function register(user) {
            var q = $q.defer();
            $http.post('/api/Users/Register', user).success(function (res) {
                setToken(res.token);
                o.status.isLoggedIn = true;
                q.resolve();
            });
            return q.promise;
        }

        function login(user) {
            var u = {
                username: user.username.toLowerCase(),
                password: user.password
            };
            var q = $q.defer();
            $http.post('/api/Users/Login', u).success(function (res) {
                setToken(res.token);
                o.status.isLoggedIn = true;
                q.resolve();
            });
            return q.promise;
        }

        function logout() {
            o.status.isLoggedIn = false;
            removeToken();
        }

        function setToken(token) {
            localStorage.setItem('token', token);
            o.status.username = getUsername();
        }

        function getToken() {
            return localStorage['token'];
        }

        function removeToken() {
            localStorage.removeItem('token');
            o.status.username = null;
        }

        function getUsername() {
            return JSON.parse(atob(getToken().split('.')[1])).username;
        }
    }
})();