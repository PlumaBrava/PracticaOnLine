'use strict';

/**
 * @ngdoc service
 * @name practicaApp.subirarchivofb
 * @description
 * # subirarchivofb
 * Factory in the practicaApp.
 */
angular.module('practicaApp')

  .factory('subirarchivofb',["$q", "$log",'fb','$firebaseStorage', function ($q,$log,fb,$firebaseStorage) {

     var self=this;
    //  var getUploadTask=function(deferred, scope){

    // var uploadTask=$firebaseStorage;
    // uploadTask.$progress=$progress(uploadTask, scope);
    //        // uploadTask.$complete=$complete(uploadTask, deferred, scope);
    // uploadTask.$complete(function(snapshot) {
    //           console.log("getUploadTask complete");
    //           console.log(snapshot);
    //           console.log(snapshot.downloadURL);
    // });
    // uploadTask.$error=$error(uploadTask, deferred, scope);
    //           return uploadTask;
    // };

    this.modal_scope=null
    this.deferred=null;

        // Subir Url funcion que carga en firebase un archivo
        // File: contiene el archivo que se subirImagenFb
        // scope: es el modal o controller en donde se expone el avance
        // path:como se graba en firebase
        //  en fire base será:   path/userkey/filenam




    var subirUrl = function (file, scope,path) {

    self.deferred = $q.defer();
    self.modal_scope=scope;
  // create a Storage reference for the $firebaseStorage binding
  console.log("path+'/'+fb.getUserKey+'/'+file.name");
  console.log(path+'/'+fb.getUserKey()+'/'+file.name);
  var storageRef = firebase.storage().ref(path+'/'+fb.getUserKey()+'/'+file.name);
  var storage = $firebaseStorage(storageRef);

  var uploadTask = storage.$put(file);
  uploadTask.$progress(function(snapshot) {

      self.modal_scope.$broadcast("fileProgress",
                    {
                        total: snapshot.totalBytes,
                        loaded: snapshot.bytesTransferred
                    });
      var percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentUploaded);
  });

  uploadTask.$complete(function(snapshot) {
      console.log("complete");
      console.log(snapshot);
      self.modal_scope.$evalAsync(function () {
      self.deferred.resolve(snapshot);
      });
  });

  uploadTask.$error(function(error) {
      console.log("error");
      console.log(error);
      self.modal_scope.$evalAsync(function () {
      self.deferred.reject(error);
      });
  });

return self.deferred.promise;


        };

        return {
            subirUrl: subirUrl
        };




  }]);
