'use strict';

/**
 * @ngdoc overview
 * @name practicaApp
 * @description
 * # practicaApp
 *
 * Main module of the application.
 */
angular
  .module('practicaApp', ['ui.router','firebase','ngStorage','spotify', 'angularAudioRecorder', 'dndLists','ui.bootstrap','xeditable','ngYoutubeEmbed'])
  // .config(['$stateProvider','$urlRouterProvider', '$locationProvider', function($stateProvider,$urlRouterProvider,$locationProvider ){
  .config(['$stateProvider','$urlRouterProvider',  function($stateProvider,$urlRouterProvider ){




$urlRouterProvider.rule(function ($injector, $location) {

       //what this function returns will be set as the $location.url
        var path = $location.path(), normalized = path.toLowerCase();
        console.log('$urlRouterProvider');
        console.log($injector);
        console.log('path: '+path);
        console.log('-'+path+'-');
        console.log('path nomalized :'+normalized);
        console.log($location);
        console.log($location.url());
         // $location.url('/spotifycallback/'+$location.url().replace('#','?'));


          console.log($location.url().indexOf('access_token')); // -1 si no le encuenta, de lo contrario da el lugar en el array
          console.log($location.url().indexOf('token_type')); // -1 si no le encuenta, de lo contrario da el lugar en el array
          console.log($location.url().indexOf('expires_in')); // -1 si no le encuenta, de lo contrario da el lugar en el array

          if(path==='' && $location.url().indexOf('access_token')!==-1 && $location.url().indexOf('token_type')!==-1 && $location.url().indexOf('expires_in'))
            {
              console.log('cambio URL');
              $location.url('/spotifycallback/'+$location.url().replace('#','?'));
            // $location.replace().path('/spotifycallback/');
        }

        console.log(normalized);
        if (path !== normalized) {
        //     //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
        //     // $location.replace().path(normalized);
        }
        // because we've returned nothing, no state change occurs
    });
// $urlRouterProvider.otherwise('/'); // define la vista por default
$stateProvider
.state('login',{
    url:'/login',
    templateUrl:'views/login.html',
    controller:'LoginCtrl as login'
});

$stateProvider
.state('home',{
    url:'/',
    templateUrl:'views/main.html',
    controller:'MainCtrl as main'
});



$stateProvider
.state('mispracticas',{
    url:'/mispracticas',
    templateUrl:'views/mispracticas.html',
    controller:'MispracticasCtrl as mispracticas'
});


$stateProvider
.state('nuevapractica',{
    url:'/nuevapractica:',
    params: {
            param1: null
        },
    templateUrl:'views/nuevapractica.html',
    controller:'NuevapracticaCtrl as nuevapractica'
});

// $stateProvider
// .state('tree',{
//     url:'/tree',
//     templateUrl:'views/tree.html'
//     // controller:'LoggerCtrl as login'
// });

// $stateProvider
// .state('dialogdemo',{
//     url:'/dialogdemo',
//     templateUrl:'views/dialogdemo.html'
//     // controller:'LoggerCtrl as login'
// });

$stateProvider
.state('armarpractica',{
    url:'/armarpractica',
        params: {
            userKey: null,
            practicaKey: null
        },
    templateUrl:'views/armarpractica.html',
    controller:'ArmarpracticaCtrl as armarpractica'
});

$stateProvider
.state('spotifycallback',{
    // url:'/spotifycallback/',
    // url:'/spotifycallback/?access_token&token_type&expires_in',
    url:'/spotifycallback/?access_token&token_type&expires_in',
    templateUrl:'views/spotifycallback.html',
    resolve: {
    'urlFix': ['$location', function($location){
      console.log(' resolve');
      console.log($location.url());
        // $location.url($location.url().replace('#','?'));
     }]
   },
    controller:'SpotifycallbackCtrl as sp'
});
 console.log(' resolve location');
 console.log($stateProvider);


// // $locationProvider.html5Mode(true);
// $locationProvider.html5Mode({
//   enabled: true,
//   requireBase: false
// });


// $stateProvider
// .state('practica',{
//     url:'/practica',
//     templateUrl:'views/practica.html',
//     controller:'PracticaCtrl as practica'
// });


  }])
.config( function(){


 var config = {
    apiKey: 'AIzaSyDvIgZ8FpDoSTJuSbHl8VJH0zacuN4Z_Fk',
    authDomain: 'practicas-5bd5b.firebaseapp.com',
    databaseURL: 'https://practicas-5bd5b.firebaseio.com',
    projectId: 'practicas-5bd5b',
    storageBucket: 'practicas-5bd5b.appspot.com',
    messagingSenderId: '796645806481'
  };

  firebase.initializeApp(config);
    })




.run(['editableOptions', function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);