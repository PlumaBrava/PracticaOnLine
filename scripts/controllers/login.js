'use strict';

/**
 * @ngdoc function
 * @name practicaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the practicaApp
 */
angular.module('practicaApp')

 // .controller('LoginCtrl',['firebase','$firebaseAuth','$state','fb','$localStorage','$scope',function (firebase,$firebaseAuth,$state,fb,localStorage,$scope) {
 .controller('LoginCtrl',['$state','$scope','$firebaseAuth','fb',function ($state,$scope,firebaseAuth,fb) {


  console.log('LoginCtrl');
  console.log($state);
  var self=this;
  $scope.err=null;


// console.log('userKey');
// console.log(localStorage.userKey);
// console.log(localStorage.user);

// console.log('empresa');
// console.log(localStorage.empresaKey);
// console.log(localStorage.empresa);


this.emailPasswordLogin=function(email, password){
 $scope.err = '';
    console.log('passwordLogin');
    console.log('email '+ email);
    console.log('password '+ password);
   // if (fb.isUserLog()){
   //     $state.go('practica');
   //  }else {

      if( !email) {
        // this.muestraMensaje('Please enter a email');
        $scope.err = 'Please enter a email';

      }
      else if( !password) {

        $scope.err = 'Passwords nullo';
        // this.muestraMensaje('Passwords nullo');

          }

  var auth = firebaseAuth();



  auth.$signInWithEmailAndPassword(email, password)
    .then(function(CallBackuser){
          console.log(CallBackuser);
          if(CallBackuser){
          // var user = firebase.auth().currentUser;
         console.log('CallBackuser: '+CallBackuser.email);
        // console.log('user mail: '+user.email);
        // console.log('user uid: '+user.uid);
        // console.log(user);
           $scope.err=CallBackuser.email;
   self.muestraMensaje('Signed in as:'+ CallBackuser.displayName);
  self.registrarUsuario(CallBackuser);

        // fb.setUserKey(user.uid);
        // fb.setUser(user.email);
        // self.readUser(user.uid);
        // self.readPerfil(user.uid);
      }
    })
  .catch(function(error) {
  // Handle Errors here.
  console.log('error');
  console.log(error);
  // var errorCode = error.code;
  var errorMessage = error.message;

   $scope.err=errorMessage;

  });

  // };
};


this.createAccount=function(email, password,confirm){
  console.log('createAccount');
  console.log('email '+ email);
  console.log('password '+ password);
  console.log('confirm '+ confirm);

  $scope.err = 'crear cuenta';
      if( !password) {
        self.muestraMensaje('Please enter a password');
      }
      else if( password !== confirm ) {
         self.muestraMensaje('error: '+'Passwords do not match');
      }
      else {
        var auth = firebaseAuth();
        auth.$createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          var errorMessage = error.message;
          console.log('error: '+errorMessage);
          self.muestraMensaje('error: '+errorMessage);

        })
        .then(function(CallBackuser){
            console.log(CallBackuser);
            if(CallBackuser){
            // var user = firebase.auth().currentUser;
            self.muestraMensaje('mail: '+CallBackuser.email);
            console.log('CallBackuser: '+CallBackuser.email);
            self.registrarUsuario(CallBackuser);
            // console.log('user mail: '+user.email);
  //          console.log(user);

            }
        });
  }
};


//         // Auth.$createUser({email: email, password: pass})
//         //   .then(function () {
//         //     // authenticate so we have permission to wruite to Firebase
//         //     return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
//         //   })
//         //   .then(createProfile)
//         //   .then(redirect, showError);
//       };




// this.loginFacebook=function(){
//     console.log('clickFacebook ');
//     //    if (fb.isUserLog()){

//     //    $state.go('practica');
//     // }else {
//     var provider = new firebase.auth.FacebookAuthProvider();
//     provider.setCustomParameters({
//           'display': 'popup'
//         });
//         fb.getRefFB().auth.signInWithPopup(provider).then(function(result) {
//           // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//           var token = result.credential.accessToken;
//           console.log('token: '+token);
//           // The signed-in user info.
//           var user = result.user;
//           console.log('user: '+user);


//           // ...
//         })
//         .catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // The email of the user's account used.
//           var email = error.email;
//           // The firebase.auth.AuthCredential type that was used.
//           var credential = error.credential;

//             console.log('error: '+errorMessage+'-'+email+credential);
//             $scope.err='error: '+errorMessage+'-'+email+credential;
//           // ...
//         });
//       // };
// };
this.loginFacebook=function(){
    console.log('loginFacebook ');
    $scope.err='loginFacebook ';
    // if (fb.isUserLog()){
    //    $state.go('practica');
    // }else {


 // var auth = $firebaseAuth();
 var auth = firebaseAuth();
   console.log(auth);
  // login with google.com
  auth.$signInWithPopup('facebook').then(function(firebaseUser) {
  console.log(firebaseUser);
    console.log('Signed in as:', firebaseUser.user.displayName);
  self.muestraMensaje('Signed in as:'+ firebaseUser.user.displayName);
  self.registrarUsuario(firebaseUser.user);
    // console.log(firebaseUser);
  }).catch(function(error) {
    console.log('Authentication failed:', error);
    console.log( error);
    self.muestraMensaje('Authentication failed:'+ error);
  });
};


this.loginGoogle=function(){
    console.log('login Google ');
    $scope.err='login Google ';
    // if (fb.isUserLog()){
    //    $state.go('practica');
    // }else {


 // var auth = $firebaseAuth();
 var auth = firebaseAuth();
   console.log(auth);
  // login with google.com
  auth.$signInWithPopup('google').then(function(firebaseUser) {
  console.log(firebaseUser);
    console.log('Signed in as:', firebaseUser.user.displayName);
  self.muestraMensaje('Signed in as:'+ firebaseUser.user.displayName);
  self.registrarUsuario(firebaseUser.user);
    // console.log(firebaseUser);
  }).catch(function(error) {
    console.log('Authentication failed:', error);
    console.log( error);
    self.muestraMensaje('Authentication failed:'+ error);
  });
};


this.muestraMensaje =function(mensaje){
                // $scope.$apply(function () {
                   $scope.err = mensaje;
                   // } );
};


this.sendPasswordResetEmail=function(email){
  var auth = firebaseAuth();
  console.error(email);
  if(!email){
    self.muestraMensaje('Ingrese un email valido');
  }else{
  auth.$sendPasswordResetEmail(email).then(function() {
  console.log('Password reset email sent successfully!');
  self.muestraMensaje('Password reset email sent successfully!');
}).catch(function(error) {
   console.log(error);
   self.muestraMensaje(error.message);

});

}
};

this.registrarUsuario=function(user){
     console.log(user);
     fb.setUserKey(user.uid);
     var u={};
     u.displayName=user.displayName;
     u.email=user.email;

    fb.setUser(u);
    // fb.setUser(firebaseUser.user.providerData[0]);
    // fb.setUser(firebaseUser.user);
};



  }]);

