'use strict';

/**
 * @ngdoc function
 * @name practicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the practicaApp
 */
angular.module('practicaApp')
  .controller('MainCtrl',  ['$stateParams', '$state','$firebaseAuth', '$scope', 'fb','$location',function ($stateParams, $state,firebaseAuth,$scope,fb,$location) {


$scope.user='Sign Up';
$scope.photoURL='';
$scope.photoURLshow=false;
$scope.showBar=false;
$scope.firebaseUser={};
 var auth = firebaseAuth();

auth.$onAuthStateChanged(function(firebaseUser) {
  if (firebaseUser) {
    // console.log(firebaseUser);
    // console.log('Signed in as:', firebaseUser.uid);
    $scope.showBar=true;
    console.log('$scope.showBar:', $scope.showBar);
    $scope.firebaseUser=firebaseUser;
    if(firebaseUser.displayName){
    $scope.user=firebaseUser.displayName;
    }else{
        $scope.user=firebaseUser.email;
    }
    if(firebaseUser.photoURL){
           console.log('firebaseUser.photoURL:', firebaseUser.photoURL);
            // $scope.$apply(function () {
            $scope.photoURLshow=true;
            $scope.photoURL=firebaseUser.photoURL;
            if($location.url()==='/login'){
            $state.go('mispracticas');
        };
            // } );
        // console.log('$scope.photoURLshow:', $scope.photoURLshow);
        // console.log('$scope.photoURL:', $scope.photoURL);
    }
     console.log('state Main to mis practicas');
     console.log($location);
     console.log($location.url());
     console.log($location.path);

  // $state.go('mispracticas');
  } else {
    console.log('Signed out');
     console.log('state Main to mis practicas');
     console.log($state.current);
     // console.log('$urlRouterProvider');
console.log($location);
     console.log($location.url());
     console.log($location.path);

    $scope.user='Sign Up';
    $scope.photoURL=null;
    $scope.photoURLshow=false;
     $scope.photoURLshow=false;
    $scope.$apply(function () {
    $scope.photoURL=null;
    $scope.photoURLshow=false;
     $scope.showBar=false;
     console.log('$scope.showBar:', $scope.showBar);
    if($location.url()!=='/practicarlink'){
     $state.go('home');
    }
    } );
     // console.log('$scope.photoURLshow:', $scope.photoURLshow);
     //    console.log('$scope.photoURL:', $scope.photoURL);
  }
});

$scope.logOut=function () {
     var auth = firebaseAuth();
        auth.$signOut().then(function(){
        console.log('Signed out ok');
        // $scope.$apply(function () {
            $scope.photoURL=null;
            $scope.photoURLshow=false;
            fb.setUser(null);
            fb.setUserKey(null);
        // } );

   }).catch(function(){

        console.log('Signed out error');
   });
};

  }]);


// code : 'auth/account-exists-with-different-credential'