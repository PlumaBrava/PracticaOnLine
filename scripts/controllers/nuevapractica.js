'use strict';

/**
 * @ngdoc function
 * @name practicaApp.controller:NuevapracticaCtrl
 * @description
 * # NuevapracticaCtrl
 * Controller of the practicaApp
 */
angular.module('practicaApp')
 .controller('NuevapracticaCtrl', ['$scope','fb','$state','$stateParams',function ($scope,fb,$state,$stateParams) {

    console.log('$stateParams');
    console.log($stateParams);
    if($stateParams.param1){
        $scope.descripcion=$stateParams.param1.propiedades.descripcion;
        $scope.nombre=$stateParams.param1.propiedades.nombre;
        $scope.publico=$stateParams.param1.propiedades.publico;
        $scope.userCreador=$stateParams.param1.propiedades.usuarioCreador;
        $scope.fechaCreacion=$stateParams.param1.propiedades.fechaCreacion;
        $scope.modificacion=true;
    } else{
    $scope.fechaCreacion = fb.getDate();
    $scope.userCreador = fb.getUser().displayName;
    $scope.modificacion=false;
    }

    $scope.savePractica=function(nombre, descripcion,publico){
    console.log('savePractica');

    console.log(nombre);
    console.log(descripcion);
    console.log(publico);
    $scope.error=null;
        if(!nombre){
         $scope.error='Ingrese el monbre de la Practica';
        } else  if(!descripcion){
         $scope.error='Ingrese el descripcion de la Practica';
        }else  if(publico===undefined){
         $scope.error='Ingrese el monbre si es publico o Privada';
        } else{
            // var userKey=fb.getUserKey();

            // var ref = firebase.database().ref();
            // var objRef = ref.child('practica').push();
            // var propiedades = $firebaseObject(objRef);
            // propiedades.nombre=nombre;
            var propiedades={};
            propiedades.nombre=nombre;
            propiedades.descripcion=descripcion;
            propiedades.publico=publico;
            propiedades.fechaCreacion=$scope.fechaCreacion;

            propiedades.userCreador=fb.getUser().displayName;
            // propiedades.fechaCreacion=currentDate;


            var dropzones= {'A': [
                {duracion: 0, iconClass: "glyphicon glyphicon-object-align-vertical", id: 1, nombre: "nombre", type: "container", columns:[[
                    {type: 'spotify', id: 3,search: 'track' , volumen:1,duracion:0,numeroTracks:0, tracks:[] , iconClass:'btn-spotify',iconSrc:'/images/Spotify_logo_without_text.svg' }
                ]]},
                {duracion: 0, iconClass: "glyphicon glyphicon-object-align-horizontal", id: 2, nombre: "nombre", type: "bloque", columns:[[
                    {type: 'spotify', id: 3,search: 'track' , volumen:1,duracion:0,numeroTracks:0, tracks:[] , iconClass:'btn-spotify',iconSrc:'/images/Spotify_logo_without_text.svg' }
                ]]}
                ]};

            // {
                //
                // 'A': [
                //  {
                //     'type': 'container',
                //     'id': 1,
                //     'columns': [
                //         [
                //             {
                //                 'type': 'item',
                //                 'id': '1'
                //             },
                //             {
                //                 'type': 'item',
                //                 'id': '2'
                //             }
                //         ],
                //         [
                //             {
                //                 'type': 'item',
                //                 'id': '3'
                //             }
                //         ]
                //     ]
                // },
                // {
                //     'type': 'item',
                //     'id': '4'
                // },
                // {
                //     'type': 'item',
                //     'id': '5'
                // },
                // {
                //     'type': 'item',
                //     'id': '6'
                // }

                //  ]
                // };
            var model=angular.toJson(dropzones, true);

            if($scope.modificacion){
                fb.writeModificacionPractica($stateParams.param1.$id,fb.getUserKey(), model,propiedades);
            }else {
                fb.writeNuevaPractica(fb.getUserKey(), model,propiedades);
            }

            $state.go('mispracticas');







        }

    };

$scope.armarPractica=function(){
    console.log('armarpractica');
    $state.go('armarpractica',{userKey:fb.getUserKey(),practicaKey:$stateParams.param1.$id});

};


  }]);
