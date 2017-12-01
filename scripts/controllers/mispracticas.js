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
  .controller('MispracticasCtrl', ['$scope','$state','fb',function ($scope,$state,fb) {

   // var self=this;
     $scope.lista=fb.leerMisPracticas(fb.getUserKey());

 console.log($scope.lista);

//     var setData=function(){
//         console.log("MispracticasCtrl getUserKey()");
//         console.log(fb.getUserKey());
//     fb.leerMisPracticas(fb.getUserKey()).then(function(data){
//         console.log("MispracticasCtrl leerMisPracticas them");
//         console.log(data);
//          $scope.$apply(function () {
//             $scope.lista=data.result;
//             console.log($scope.lista);
//      });
//     }).catch(function(data){
//         console.log("MispracticasCtrl leerMisPracticas catch");
//         console.log(data);
//     });
// };


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
console.log("borrarPractica");
$scope.lista.$remove(item).then(function(ref) {
    console.log(ref);
  // ref.key === item.$id; // true
});

};

}]);