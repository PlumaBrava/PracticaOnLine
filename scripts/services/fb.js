'use strict';

/**
 * @ngdoc service
 * @name practicaApp.fb
 * @description
 * # fb
 * Service in the practicaApp.
 */
angular.module('practicaApp')
  // .service('fb',['$localStorage','$firebaseObject','$firebaseArray','$firebaseStorage', function (localStorage,$firebaseObject,$firebaseArray,$firebaseStorage) {
  .service('fb',['$localStorage','$firebaseObject','$firebaseArray', function (localStorage,$firebaseObject,$firebaseArray) {
  // .service('fb',['$localStorage', function (localStorage) {
    // AngularJS will instantiate a singleton by calling 'new' on this function
    var self=this;
    this.userKey=null;
    this.user=null;
      this.setUserKey=function(key){
         console.log('fb-user key');
         console.log(key);
       self.userKey=key;
         localStorage.userKey=key;

    };

    this.setUser=function(user){
         console.log('fb-user ');
         console.log(user);
        localStorage.user=user;
        self.user=user;
    };



  this.getUserKey=function(){
         console.log('gettUserKey:'+self.userKey);
            if(self.isUserLog){
          return localStorage.userKey;
        }
        else{
       return self.userKey;
        }
    };

    this.getUser=function(){
        console.log('getUser');
        console.log(self.user);
          if(self.isUserLog){
                    return localStorage.user;
                  }
                  else{

                return   self.user;
          }
    };

this.isUserLog=function(){
if(localStorage.userKey&&localStorage.empresaKey)
  { console.log('log');
    return true;
  }
    else{
       console.log('Is not log');
      return false;}
};

//  Firebase



this.writeNuevaPractica=function(userKey, model,propiedades) {
  console.log('writePractica');
  console.log(userKey);
  // console.log(model);
  console.log(propiedades);
  // Get a key for a new Post.

// var misPracticasRef = firebase.database().ref('Mispracticas/' + userKey+'/lista');
// misPracticasRef.once('value', function(snapshotMisPracticas) {
//   console.log('snapshotMisPracticas');
//   console.log(snapshotMisPracticas);




  var ref = firebase.database().ref();
  var newPracticaKey= ref.child('practicas').child(userKey);
  var a={practica:JSON.parse( model),propiedades:propiedades};

 var list = $firebaseArray(newPracticaKey);
            list.$add(a).then(function(ref) {
                  console.log(ref);
            var id = ref.key;
            console.log('added record with id ' + id);
            console.log('list index ' + list.$indexFor(id));
            self.addPracticaMisPracticas(ref.key,userKey, model,propiedades);

            }).catch(function(error) {
                  console.log(error);});



};

this.linkMisPracticas=function(userKey) {
     console.log('leerMisPracticas');
      var ref = firebase.database().ref();
  var newPracticaKey= ref.child('Mispracticas').child(userKey);

 var list = $firebaseArray(newPracticaKey);
 console.log(list);
 return list;

};

this.cargarMisPracticas=function(userKey) {
     console.log('cargarMisPracticas');

return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa cargarMisPracticas');

      var ref = firebase.database().ref();
  var newPracticaKey= ref.child('Mispracticas').child(userKey);

 var list = $firebaseArray(newPracticaKey);
 list.$loaded(
  function() {
    // x === list; // true
    console.log('cargarMisPracticas exito');
    console.log(list);
   resolve({ value: 'retorno cargarMisPracticas', result: list});

  }, function(error) {
    console.error('Error:', error);
    reject({ value: 'error cargarMisPracticas', result: error});
  });


});
};



this.addPracticaMisPracticas=function(practicaKey,userKey, model,propiedades) {
  console.log('addPracticaMisPracticas');
  console.log(userKey);
  // console.log(model);
  console.log(propiedades);
  // Get a key for a new Post.

// var misPracticasRef = firebase.database().ref('Mispracticas/' + userKey+'/lista');
// misPracticasRef.once('value', function(snapshotMisPracticas) {
//   console.log('snapshotMisPracticas');
//   console.log(snapshotMisPracticas);




  var ref = firebase.database().ref();
  var newPracticaKey= ref.child('Mispracticas').child(userKey).child(practicaKey);
  console.log(newPracticaKey);
  var obj = $firebaseObject(newPracticaKey);
  // obj.practica=JSON.parse( model);
  obj.propiedades=propiedades;

    obj.$save().then(function(ret) {
                console.log(ret);
              // ref.key === obj.$id; // true
            }, function(error) {
              console.log('Error:', error);
            });

};


this.writeModificacionPractica=function(practicaKey,userKey, model,propiedades) {
  console.log('addPracticaMisPracticas');
  console.log(userKey);
  console.log(model);
  console.log(propiedades);
  // Get a key for a new Post.


  var ref = firebase.database().ref();
  var newPracticaKey= ref.child('practicas').child(userKey).child(practicaKey);
  console.log(newPracticaKey);
  var obj = $firebaseObject(newPracticaKey);
  // obj.practica=JSON.parse( model);
  obj.propiedades=propiedades;
  // obj.practica=JSON.parse( model);
  obj.practica= model;

    obj.$save().then(function(ret) {
                console.log(ret);
            self.addPracticaMisPracticas(practicaKey,userKey, model,propiedades);
            }, function(error) {
              console.log('Error:', error);
            });
};

this.borrarPrac=function(userKey, practicaKey) {
     console.log('borrar Practica');
      var r = firebase.database().ref();
  var ref= r.child('practicas').child(userKey).child(practicaKey);

var obj = $firebaseObject(ref);
obj.$remove().then(function(ref) {
  console.log(ref);// data has been deleted locally and in the database
}, function(error) {
  console.log('Error:', error);
});
};

this.leerPractica=function(userKey, practicaKey) {
     console.log('leerPractica');
     console.log(userKey);
     console.log(practicaKey);
     return new Promise(function (resolve, reject){
     console.log(userKey);
     console.log(practicaKey);
      var r = firebase.database().ref();
  var ref= r.child('practicas').child(userKey).child(practicaKey);

var obj = $firebaseObject(ref);
obj.$loaded().then(function(ref) {
   console.log(ref);
 resolve({ value: 'retorno leerPractica', result: ref});

}).catch( function(error) {
  console.log('Error:', error);
   reject({ value: 'error lleerPractica', result: error});
});

});
};


this.getDate=function(){
  console.log('getDate');
  console.log(firebase.database.ServerValue.TIMESTAMP);
  return firebase.database.ServerValue.TIMESTAMP;
};

// transforama un valor en milisegundos (ms) en horas, minutos y segundos.

this.msToDHMSMS = function(time){


   console.log(time);
  var hours = Math.floor( time / 3600000 );
  var minutes = Math.floor( (time % 3600000) / 60000 );
  var seconds = Math.floor( ( (time % 3600000) % 60000 ) / 1000);

//Anteponiendo un 0 a los minutos si son menos de 10
  minutes = minutes < 10 ? '0' + minutes : minutes;

//Anteponiendo un 0 a los segundos si son menos de 10
  seconds = seconds < 10 ? '0' + seconds : seconds;
  var result = hours + ':' + minutes + ':' + seconds;

  return result;

};

 }]);