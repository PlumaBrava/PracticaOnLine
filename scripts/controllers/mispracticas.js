'use strict';

/**
 * @ngdoc function
 * @name practicaApp.controller:MispracticasCtrl
 * @description
 * # MispracticasCtrl
 * Controller of the practicaApp
 */
angular.module('practicaApp')
  // .controller('MispracticasCtrl', function () {
  .controller('MispracticasCtrl', ['$scope','$state','fb','$copyToClipboard', function ($scope,$state,fb,$copyToClipboard) {

    $scope.myUserID=fb.getUserKey();
   // var self=this;
     fb.cargarMisPracticas(fb.getUserKey()).then(function(lista){

      console.log('retorno promesa');
      console.log(lista);
       $scope.$apply(function () {
      $scope.lista=lista.result;});
     });

    console.log($scope.lista);

$scope.configurar=function(datosPractica){

    console.log(datosPractica);
    fb.leerUnaPractica(datosPractica).then(function(res){
        console.log(res);
        // comandos.setModelAsJason(res.result);
        $state.go('dadlist');
    });

    //
};
$scope.crearPractica=function(data){

    $state.go('nuevapractica',{param1: data});
};

    // setData();

$scope.borrarPractica=function(item)   {
console.log('borrarPractica');
console.log(item);
$scope.lista.$remove(item).then(function(ref) {
    console.log(ref);
  fb.borrarPrac(fb.getUserKey(),ref.key);
  // ref.key === item.$id; // true
});

};

$scope.practicar=function(data)   {
console.log('ejecutarPracticar');
console.log(data);
 $state.go('practicar',{userKey:fb.getUserKey(),practicaKey:data.$id,param1: data});
};


   $scope.copyHrefToClipboard = function(e,practica) {
          console.log(e);

            $copyToClipboard.copy('http://localhost:9000/#!/practicarlink?userKey='+fb.getUserKey()+'&practicaKey='+practica.$id).then(function () {
                //show some notification
            });
};

  $scope.$on('$destroy', function() {
     // $scope.lista=fb.leerMisPracticas(fb.getUserKey());
     console.log('$destroy');
    });

}]);
