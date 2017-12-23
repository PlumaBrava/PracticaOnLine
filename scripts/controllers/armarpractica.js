'use strict';

/**
 * @ngdoc function
 * @name practicaApp.controller:ArmarpracticaCtrl
 * @description
 * # ArmarpracticaCtrl
 * Controller of the practicaApp
 */
angular.module('practicaApp')
   .controller('ArmarpracticaCtrl', ['$scope','comandos','$uibModal','fb','$stateParams',function($scope,comandos,$uibModal,fb,$stateParams) {
   // .controller('ArmarpracticaCtrl', ['$scope','$uibModal','fb',function($scope,$uibModal,fb) {
    console.log('ArmarpracticaCtrl');


    var self=this;
   $scope.error="";
    $scope.models = {
        selected: null,

        templatesConetendores: [

            {type: 'container', id: 1, duracion:0,duracionHMS:'00:00:00', nombre:'nombre',columns: [[]], iconClass:'glyphicon glyphicon-object-align-vertical botonContainer'},//Se ejecutan tareas en serie
            {type: 'bloque', id: 2, duracion:0,duracionHMS:'00:00:00', nombre:'nombre',columns: [[]],iconClass:'glyphicon glyphicon-object-align-horizontal botonBloque'},         //Se ejecutan tareas en paralelo

        ],
        templates: [

            // {type: 'container', id: 1, duracion:0, columns: [[]], iconClass:'glyphicon glyphicon-object-align-vertical'},//Se ejecutan tareas en serie
            // {type: 'bloque', id: 2, duracion:0, nombre:'nombre',columns: [[]],iconClass:'glyphicon glyphicon-object-align-horizontal'},         //Se ejecutan tareas en paralelo
            {type: 'spotify', id: 3,search: 'track' , volumen:1,duracion:0,duracionHMS:'00:00:00',numeroTracks:0, tracks:[] , iconClass:'btn-spotify',iconSrc:'/images/Spotify_logo_without_text.svg' },        // Dipara musica de Spotify
             {type: 'youtube', id: 4,link:'t1wBwyS94xY',name:'jj',description:'',duracion:0,duracionHMS:'00:00:00',iconClass:'btn-youtube',iconSrc:'/images/YouTube_full-color_icon_(2017).svg'}, // link a you tube
            {type: 'audio', id: 5, link:'',volumen:1,name:'',duracion:0,duracionHMS:'00:00:00',iconClass:'btn-audio glyphicon glyphicon-music' },          // Reporduce audio
            {type: 'leer', id: 6, texto:'Texto de prueba',duracion:0,duracionHMS:'00:00:00',iconClass:'btn-leer glyphicon glyphicon-bullhorn'},           // Lee un texto
            {type: 'escribir', id: 7, texto:'Texto en Pantalla',duracion:0,duracionHMS:'00:00:00',iconClass:'btn-escribir glyphicon glyphicon-pencil'},           // Escribe un texto en Pantalla
            {type: 'imagen', id: 8,link:'',name:'',duracion:0,duracionHMS:'00:00:00', iconClass:'btn-imagen glyphicon glyphicon-picture'  },                           // Muestra Imagen
            {type: 'tick', id: 9, intervaloMs: 1000, volumen:1,duracion:6000,duracionHMS:'00:00:06',iconClass:'btn-tick glyphicon glyphicon-bell'},       // activa el cuenta timpo
            {type: 'cronometro', id: 10, digital:true, duracion:0,duracionHMS:'00:00:00', analogico:true,iconClass:'btn-cronometro glyphicon glyphicon-hourglass'},      // permite medir mi tiempo.
            {type: 'registro', id: 11,duracion:0,duracionHMS:'00:00:00',iconClass:'btn-registro glyphicon glyphicon-registration-mark' }        // permite tomar registo de tiempo o cantidades...
        ],
        propiedades:{nombre: 'nombre de la practica',descripcion:'description', usuarioCreador: {},fechaCreacion:'',fechaModicicacion:[],publica:false,cantidadSegidores:0,calificacion:100,duracion:0},        // permite tomar registo de tiempo o cantidades...
        dropzones: {
            'A': [
                {
                    'type': 'container',
                    'id': 1,
                    'columns': [
                        [
                            {
                                'type': 'item',
                                'id': '111'
                            },
                            {
                                'type': 'item',
                                'id': '222'
                            }
                        ],
                        [
                            {
                                'type': 'item',
                                'id': '333'
                            }
                        ]
                    ]
                },
                {
                    'type': 'item',
                    'id': '444'
                },
                {
                    'type': 'item',
                    'id': '5555'
                },
                {
                    'type': 'item',
                    'id': '6666'
                }
            ]
             // ,
            // 'B': [
            //     {
            //         'type': 'item',
            //         'id': 7
            //     }]
        }
    };


$scope.HMSdesdeMS=function(ms){
    return fb.msToDHMSMS(ms);
}



this.calculoDeDuracion=function(obj, level){
console.log('calculoDeDuracion');
console.log(obj);

level=level || 0;
var duracionBloque= 0; // Se ejecutan en paralelo Se guarda el máximo.
var duracionContainer= 0; // Se serie en paralelo Se guarda la suma de de las duraciones.
var objInterno=null;

// Si el objeto es tipo container o bloque asigno a ObjInterno las columnas para poder compartir el for al
// igualar las estructuras de datos.

switch(obj.type){
    case 'container':
          console.log('Container nivel:' +level+' - duracion container: '+ obj.duracion);
          objInterno=obj.columns[0];
          break;

          case 'bloque':
          console.log('Bloque nivel:' +level+' - duracion bloque: '+ obj.duracion);
          objInterno=obj.columns[0];
          break;

          default:
          console.log('default:' +level+' - duracion default: '+ obj.duracion);
          objInterno=obj;

}

          console.log('objInterno:');
          console.log(objInterno);

// recorro el objeto y calculo la duración del bloque y del container.
// asigno la duración total y retorno el objeto completo.


    for (var i=0;i<objInterno.length;i++){
      console.log('i :'+i);
      console.log(objInterno[i].type);
         switch (objInterno[i].type){
          case 'item':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;

          break;

          case 'container':
          console.log('level:' +level+' ' +objInterno[i].type +' - duracion: '+ objInterno[i].duracion);
          objInterno[i]=self.calculoDeDuracion(objInterno[i],++level);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case 'bloque':
          console.log('level:' +level+' ' +objInterno[i].type +' - duracion: '+ objInterno[i].duracion);
          objInterno[i]=self.calculoDeDuracion(objInterno[i],++level);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case 'spotify':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case 'audio':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case 'leer':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case 'imagen':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case 'tick':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case 'cronometro':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

        case 'leer':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
        break;

         case 'youtube':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case 'registro':
          console.log('level:' +level +' ' +objInterno[i].type+' - duracion: '+' :'+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;
          }// fin switch
    }//fin for

console.log(obj.type);
  obj.duracion=duracionContainer;
  obj.duracionHMS=fb.msToDHMSMS(duracionContainer);
switch(obj.type){
    case 'container':
          obj.duracion=duracionContainer;
          obj.duracionHMS=fb.msToDHMSMS(duracionContainer);
          console.log('level:' +level+' ' +obj.type +' - duracion container: '+ obj.duracion);

          break;

          case 'bloque':
          obj.duracion=duracionBloque;
          obj.duracionHMS=fb.msToDHMSMS(duracionBloque);
          console.log('level:' +level+' ' +obj.type +' - duracion container: '+ obj.duracion);
            break;

}

$scope.duracionPracticaHMS=fb.msToDHMSMS(duracionContainer);
$scope.duracion=(duracionContainer);
console.log('duracionPracticaHMS: '+ $scope.duracionPracticaHMS);
// retorno el objeto completo para que con la recursividad se ajusten todas las duraciones.

console.log('retorno:');
console.log(obj);
return obj;


};



var load=function(){
    console.log('load');
      console.log($stateParams);
      console.log($stateParams.param1)
      console.log($stateParams.param2);

self.userKey=$stateParams.userKey;
self.practicaKey=$stateParams.practicaKey;
      fb.leerPractica(self.userKey, self.practicaKey)
      .then(function(obj){
         console.log('then ');
         console.log(obj);
         // $scope.$apply(function () {
                $scope.models.dropzones=    obj.result.practica;
                $scope.models.propiedades=    obj.result.propiedades;
                $scope.nombrePractica=obj.result.propiedades.nombre;
                $scope.duracionPracticaHMS=obj.result.propiedades.duracionHMS;
                console.log($scope.models.dropzones);
                console.log($scope.models.propiedades);
            // });

      })
      .catch(function(error){
        $scope.error='error al leer Practica: '+error;
            console.log('error al leerPractica'+error);
      });
      // console.log(comandos.getModelAsJason());
      // console.log(comandos.getModelAsJason());

// if (!comandos.getModelAsJason()){
//     console.log('load undefined');

// }
//     else{
//     console.log('load no null');
//     console.log(comandos.getModelAsJason);
//     $scope.models.dropzones=    angular.fromJson(comandos.getModelAsJason());
// }
};




    $scope.$watch('models.dropzones', function(model) {
        console.log('evento watch model.dropzones');
        $scope.modelAsJson = angular.toJson(model, true);
            $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);
        }, true);
load();
$scope.save=function(){
    console.log('save');
    console.log('save: '+fb.getUserKey());
    comandos.setModelAsJason($scope.modelAsJson);
    $scope.models.propiedades.duracionHMS=$scope.duracionPracticaHMS;
    $scope.models.propiedades.duracion=$scope.duracion;
    fb.writeModificacionPractica(self.practicaKey,self.userKey, $scope.models.dropzones,$scope.models.propiedades);

};

  this.items = ['item1', 'item2', 'item3'];
  this.selected ={
    item: this.items[2]
  };
  this.animationsEnabled = true;

// callbacks de la lista

  $scope.dragoverCallback = function(index, external, type, callback) {
        $scope.logListEvent('evento dragged over', index, external, type);
        // Invoke callback to origin for container types.
        if (type === 'container' && !external) {
            console.log('Container being dragged contains ' + callback() + ' items');
        }
        return index < 10; // Disallow dropping in the third row.
    };

    $scope.dropCallback = function(event,index, item, external, type,list) {
      console.log('evento dropCallback');

        $scope.logListEvent('dropped at', index, external, type);
        // Return false here to cancel drop. Return true if you insert the item yourself.
          console.log(event);
          console.log(list);
          console.log(index);
          console.log(item);
          console.log(external);
          console.log(type);
        return item;
    };

     $scope.dropCallbackBloque = function(event,index, item, external, type) {
               console.log('evento CallbackBloque');
        $scope.logListEvent('dropped at', index, external, type);
        // Return false here to cancel drop. Return true if you insert the item yourself.
          console.log(event);
          console.log(index);
          console.log(item);
          console.log(external);
          console.log(type);
        return item;
    };

    $scope.logEvent = function(message) {
        console.log('eventbbo logEvent');
        console.log(message);
    };

    $scope.logListEvent = function(action, index, external, type) {
        console.log('evento logListEvent');
        var message = external ? 'External ' : '';
        message += type + ' element was ' + action + ' position ' + index;
        console.log(message);

    };


    $scope.onDragstart = function(list, event) {
        console.log('evento onDragstart');
        console.log(list);
        console.log(event);
       // list.dragging = true;
       // if (event.dataTransfer.setDragImage) {
       //   var img = new Image();
       //   img.src = 'framework/vendor/ic_content_copy_black_24dp_2x.png';
       //   event.dataTransfer.setDragImage(img, 0, 0);
       // }
    };


 $scope.open = function (size, parentSelector,item) {

    var parentElem = null;
    // var parentElem = parentSelector ?
    //   angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      // bindToController:true,
      templateUrl: 'views/modal_leer.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return   self.items;
        },
        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log('return:'+returnedItem);
        console.log(returnedItem);
        console.log(item);

        item.texto=returnedItem;
        item.duracion=0;
        item.duracionHMS='00:00:00';
        $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);
    }, function () {

        console.log('return dismissed:');
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

$scope.openTickModal = function (size, item) {

    var parentElem = null;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_tick.html',
      controller: 'ModalInstanceTick',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log('return:'+returnedItem);
        console.log(returnedItem);
        console.log(item);


        // item.texto=returnedItem;
        item.intervaloMs = returnedItem.intervaloMs;
        item.volumen = returnedItem.volumen;
        item.duracion = Number(returnedItem.duracion);
        item.duracionHMS=fb.msToDHMSMS(returnedItem.duracion);
        item.ascendente=returnedItem.ascendente;
        item.tipoDigital=returnedItem.tipoDigital;
        $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);

    }, function () {

        console.log('return dismissed:');
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openTimerModal = function (size, item) {

    var parentElem = null;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_timer.html',
      controller: 'ModalInstanceTimer',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log('return:'+returnedItem);
        console.log(returnedItem);
        console.log(item);


        // item.texto=returnedItem;
        // item.intervaloMs = returnedItem.intervaloMs;
        // item.volumen = returnedItem.volumen;
        item.duracion = Number(returnedItem.duracion);
        item.duracionHMS=fb.msToDHMSMS(returnedItem.duracion);
        $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);



    }, function () {

        console.log('return dismissed:');
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


$scope.openImagenModal = function (size, item) {

    var parentElem = null;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_imagen.html',
      controller: 'ModalInstanceImagen',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {

        item.link  = returnedItem.link;
        item.name  = returnedItem.name;
        item.duracion  = 0;
        item.duracionHMS='00:00:00';
        $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);




    }, function () {

        console.log('return dismissed:');

    });
  };

  $scope.openYoutubeModal = function (size, item) {

    var parentElem =null;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_youtube.html',
      controller: 'ModalInstanceYouTube',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {
    console.log('returnedItem');
    console.log(returnedItem);
        // item=returnedItem;
        item.link  = returnedItem.link;
        item.name  = returnedItem.name;
        item.duracion  = returnedItem.duracion;
        item.duracionHMS=returnedItem.duracionHMS;
        item.volumen  = returnedItem.volumen;
        item.titulo  = returnedItem.titulo;
        item.autor  = returnedItem.autor;

        $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);



       }, function () {

        console.log('return dismissed:');

    });
  };

$scope.openAudioModal = function (size, item) {

    var parentElem = null;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_audio.html',
      controller: 'ModalInstanceAudio',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log('return:'+returnedItem);
        console.log(returnedItem);
        console.log(item);


        // item.texto=returnedItem;
        item.link = returnedItem.link;
        item.name = returnedItem.name;
        if(returnedItem.duracion){
        item.duracion = returnedItem.duracion;
        item.duracionHMS=fb.msToDHMSMS(returnedItem.duracion);
        }else{
            item.duracion=0;
            item.duracionHMS='00:00:00';
        }




    }, function () {

        console.log('return dismissed:');
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

// }]);

$scope.openSpotifyModal = function (size, item) {

    var parentElem = null;

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',

      templateUrl: 'views/modal_spotify.html',
      controller: 'ModalInstanceSpotify',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {

        item:function(){
            return item;
        }
      }
    });

    modalInstance.result.then(function (returnedItem) {


        console.log('return:'+returnedItem);
        console.log(returnedItem);
        console.log(item);




        item.duracion = returnedItem.duracion;
        item.duracionHMS=fb.msToDHMSMS(returnedItem.duracion);
        item.numeroTracks=returnedItem.duracion;
        item.tracks=returnedItem.tracks;
        item.volumen=returnedItem.volumen;
        item.volumenText=returnedItem.volumen*100 +' %';

        $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);

    }, function () {

        console.log('return dismissed:');
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

}])

.controller('ModalInstanceCtrl', function ($uibModalInstance, items, item) {
  var $ctrl = this;
  $ctrl.itemq = item.texto;
  $ctrl.items = items;
  $ctrl.selected = {
    item: $ctrl.items[0]
  };
console.log('$uibModalInstance' );
console.log(items );
console.log($uibModalInstance );
console.log($ctrl );
  this.ok = function () {
     console.log('uibModalInstance.ok: ' );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log('uibModalInstance.cancel: ' );
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('ModalInstanceTick', ['$uibModalInstance','item', 'comandos', function ( $uibModalInstance,  item,comandos) {
  var $ctrl = this;
$ctrl.error=null;
  $ctrl.itemq = {

    intervaloMs : item.intervaloMs/1000,
    volumen : item.volumen,
    duracion : item.duracion/1000,
    tipoDigital:item.tipoDigital,
    ascendente:item.ascendente
  };
console.log('$uibModalInstance' );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
     $ctrl.testDisponible=true;
  this.test = function () {
     console.log('uibModalInstance.test: ' );
     if($ctrl.itemq.intervaloMs>=$ctrl.itemq.duracion){
        $ctrl.error='el intervalo debe ser menor que la duración';
        $ctrl.testDisponible=false;
     }
        else{
            $ctrl.testDisponible=false;
            comandos.startTick($ctrl.itemq.intervaloMs*1000,$ctrl.itemq.duracion*1000,$ctrl.itemq.volumen/100).then(function(retorno){
      $ctrl.testDisponible=true;
            });
            // $ctrl.tickDisplay=comandos.playTickConuter;
    };
  };

  this.ok = function () {
     console.log('uibModalInstance.ok: ' );
     if($ctrl.itemq.intervaloMs>=$ctrl.itemq.duracion){
        $ctrl.error='el intervalo debe ser menor que la duración';
     }
        else{
     $ctrl.itemq.duracion=$ctrl.itemq.duracion*1000;
     $ctrl.itemq.intervaloMs=$ctrl.itemq.intervaloMs*1000;
    $uibModalInstance.close($ctrl.itemq);
    };
  };

   this.cancel = function () {
     console.log('uibModalInstance.cancel: ' );
    $uibModalInstance.dismiss('cancel');
  };
}])

.controller('ModalInstanceTimer', function ($uibModalInstance,  item) {
  var $ctrl = this;


  $ctrl.itemq = {

    // intervaloMs : item.intervaloMs,
    // volumen : item.volumen,
    duracion : item.duracion,
    duracionSegundos:item.duracion/1000
  };
console.log('$uibModalInstance' );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
  this.ok = function () {
     console.log('uibModalInstance.ok: ' );
     $ctrl.itemq.duracion=$ctrl.itemq.duracionSegundos*1000;
    $uibModalInstance.close($ctrl.itemq);
  };

   this.cancel = function () {
     console.log('uibModalInstance.cancel: ' );
    $uibModalInstance.dismiss('cancel');
  };
})

  .controller('ModalInstanceImagen',['$scope','$uibModalInstance','item', 'subirarchivofb', function ($scope, $uibModalInstance,  item,subirArchivoFb) {

 console.log('ModalInstanceImagen');
  var $ctrl = this;
 $scope.imageSrc=item.link;
 $scope.name=item.name;
 $scope.okdisponible=false;

 $ctrl.itemq = {

    link : item.link,
    name: item.name

  };

    $scope.getFile = function () {
        $scope.progress = 0;

          // subirUrl:   $scope.file: archivo (nombre y datos con los que se guardara)
          //             $scople donde se expone el avance
          //             el path firebase sera.  'imagen'/userKey/fileName.

        subirArchivoFb.subirUrl($scope.file, $scope,'imagen')
                      .then(function(result) {
                        console.log('result Imagen');
                        console.log(result);
                          $scope.imageSrc = result.downloadURL;
                          $ctrl.itemq = {
                                link :result.downloadURL,
                                name:result.metadata.name
                              };
                          $scope.okdisponible=true;
                      },function(result) {
                      console.log('error Imagen');
                      console.log(result);
                      });
    };

    $scope.$on('fileProgress', function(e, progress) {

        $scope.progress = progress.loaded / progress.total;

    });


  this.ok = function () {
     console.log('uibModalInstance.ok: ' );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log('uibModalInstance.cancel: ' );
    $uibModalInstance.dismiss('cancel');
  };

 $ctrl.fileToUpload = null;
   $ctrl.onChange = function onChange(fileList) {
    $ctrl.fileToUpload = fileList[0];};

}])

// 'ngYoutubeEmbedService'

.controller('ModalInstanceYouTube',['$scope','$uibModalInstance','item', 'subirarchivofb','$http','fb','$rootScope',function ($scope, $uibModalInstance,  item,subirArchivoFb,$http,fb,$rootScope) {

 console.log('ModalInstanceYouTube');



  var $ctrl = this;


 $scope.theBestVideo =item.link;



 $scope.name=item.name;
 $scope.okdisponible=false;
 $scope.link=item.link;

 $scope.itemq = {

    link : item.link,
    name: item.name,
    duracion:item.duracion,
    volumen:item.volumen,
    duracionHMS:item.duracionHMS,
    titulo:item.titulo,
    autor:item.autor
  };
console.log('itemq');
console.log($scope.itemq );
console.log($scope );


 console.log('player');

  console.log($scope.player );
  console.log( window.onYouTubeIframeAPIReady );


  $rootScope.$on('youtubeIframeEmbedApiLoaded', function(event, videoId) {
console.log('youtubeIframeEmbedApiLoaded' );
console.log(event );
console.log(videoId );
  });

$rootScope.$on('addNewPlayer', function(event, videoId) {
console.log('addNewPlayer' );
console.log(event );
console.log(videoId );
  });

 $scope.$on('youtube.player.ended', function ($event, player) {
    console.log('ENDED' );
    console.log($event );
    console.log(player);

  });

 $scope.$on('youtube.player.ready', function ($event, player) {
    console.log('ready' );
    console.log($event );
    console.log(player);
      player.playVideo();

  });

 $scope.$on('youtube.player.ended', function ($event, player) {
    console.log('ENDED' );
    console.log($event );
    console.log(player);

  });

 $scope.$on('youtube.player.playing', function ($event, player) {
    console.log('playing' );
    console.log($event );
    console.log(player);
  console.log('Duracion: '+player.getDuration());
  console.log('Titulo: '+player.getVideoData().title);

     $scope.itemq = {

    link : $scope.link,
    name: $scope.name,

    duracion:player.getDuration()*1000,
    duracionHMS:fb.msToDHMSMS(Number(player.getDuration())*1000),
    volumen:player.getVolume(),
    titulo:player.getVideoData().title,
    autor:player.getVideoData().author

  };
        $scope.okdisponible=true;
  });

 $scope.$on('youtube.player.paused', function ($event, player) {
    console.log('paused' );
    console.log($event );
    console.log(player);

  });

 $scope.$on('youtube.player.buffering', function ($event, player) {
    console.log('buffering' );
    console.log($event );
    console.log(player);

  });


 $scope.$on('youtube.player.queued', function ($event, player) {
    console.log('queued' );
    console.log($event );
    console.log(player);

       player.playVideo();
    console.log('Duracion: '+player.getDuration());
  });

 $scope.$on('youtube.player.error', function ($event, player) {
    console.log('error' );
    console.log($event );
    console.log(player);

  });


 $scope.$on('youtube.player.paused', function ($event, player) {
    console.log('paused' );
    console.log($event );
    console.log(player);

  });


this.select=function(){
    console.log('youtubeselect' );
 $scope.theBestVideo =item.link;
$scope.bestPlayer.cueVideoById($scope.link);

 $scope.okdisponible=false;
    console.log($scope.bestPlayer );



};



this.getVideoProperties=function(){

var req = {
        // method: 'put',
        method: 'GET',
        // url: 'https://api.spotify.com/v1/me/player/play&device_id=c565f68c8ac24d000809da8f41c839cf68003510',
        url: 'https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=AIzaSyDvIgZ8FpDoSTJuSbHl8VJH0zacuN4Z_Fk'
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        //     // 'Accept-Encoding':'gzip, deflate, compress'
        //   },
        // data: {

        // 'id':'9bZkp7q19f0',
        // 'part': 'contentDetails',
        // 'key':'AIzaSyDvIgZ8FpDoSTJuSbHl8VJH0zacuN4Z_Fk'
        //  }
      };

      console.log('getVideoProperties http req');
      $http(req).then(function (response) {
        console.log('getVideoProperties Respuesta', response.data);
        console.log(response);

        // console.log('PlaySong name: '+song.name);
        // console.log('PlaySong duration: '+song.durationMs);

        // setTimeout(function() {
        // console.log('PlaySong  setTimeout: ' + song.durationMs);
        //     resolve({ value: 'PlaySong tiempo cumplido', result:song.durationMs});

        // }, song.durationMs);



        }).catch( function (error) {
          console.log('getVideoProperties http(req) an error occurred', error.data);
          // reject({ value: 'PlaySong Respuesta de la Promesa error', result: error.data});
      });


//https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=AIzaSyDvIgZ8FpDoSTJuSbHl8VJH0zacuN4Z_Fk;

};

  this.ok = function () {
     console.log('uibModalInstance.ok: ' );

      // var player = ngYoutubeEmbedService.getPlayerById("videoID");
    // console.log(player);
    //   console.log(player.getDuration());

    // console.log(player.getVolume());
     $scope.itemq = {

    link : $scope.link,
    name: $scope.name,

    duracion:$scope.bestPlayer.getDuration()*1000,
    duracionHMS:fb.msToDHMSMS(Number($scope.bestPlayer.getDuration())*1000),
    volumen:$scope.bestPlayer.getVolume(),
    titulo:$scope.bestPlayer.getVideoData().title,
    autor:$scope.bestPlayer.getVideoData().author


    //  duracion:5000,
    // duracionHMS:fb.msToDHMSMS(5*1000),
    // volumen:1,
    // titulo:'player.getVideoData().title',
    // autor:'jj'

  };
    $uibModalInstance.close($scope.itemq);
  };

  $ctrl.cancel = function () {
     console.log('uibModalInstance.cancel: ' );
    $uibModalInstance.dismiss('cancel');
  };


}])

 .controller('ModalInstanceAudio',['$scope','$uibModalInstance','item', 'subirarchivofb','recorderService', 'comandos', function ($scope, $uibModalInstance,  item,subirArchivoFb,recorderService,comandos) {
  // .controller('PerfilesCtrl' ,['$element', 'recorderService', 'recorderUtils', '$scope', '$timeout', '$interval', 'recorderPlaybackStatus', function ($element, recorderService, recorderUtils, $scope, $timeout, $interval, recorderPlaybackStatus) {

  // .controller(, function ($uibModalInstance,  item) {
  var $ctrl = this;
  $scope.nombre=item.name;
  $scope.path=item.link;
  $scope.duracion=item.duracion;
  $scope.duracionHMS=item.duracionHMS;

  $ctrl.itemq = {

    link: item.link,
    volumen:item.volumen,
    name:item.name,
    duracion : item.duracion,
    duracionHMS : item.duracionHMS
  };
console.log('ModalInstanceAudio' );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
console.log('recorderService' );
console.log(recorderService );

  this.ok = function () {
     console.log('uibModalInstance.ok: ' );
    $scope.subir();

  };

  $ctrl.cancel = function () {
     console.log('uibModalInstance.cancel: ' );
    $uibModalInstance.dismiss('cancel');
  };

  $scope.error=null;

    $scope.getFile = function () {
        $scope.progress = 0;
        $scope.error=null;
             $scope.$apply(function () {
            $scope.okdisponible=false;
            });

        if($scope.file){
        if($scope.file.type==='audio/mp3' ||$scope.file.type==='audio/wav' ){
             $scope.$apply(function () {
            $scope.okdisponible=true;
            $scope.nombre=$scope.file.name;
            $ctrl.duracionAudioFile();
            });

            }else{

            $scope.$apply(function () {
            $scope.error='tipo de Archivo incorrecto';
            });
        }
        }
};

this.playAudioFile=function(){
    console.log('playAudioFile');
    console.log($scope.path);
    comandos.playAudio($scope.path)
    .then(function(result){
        console.log('playAudioFile'+result);
    })
    .catch(function(error){
        $scope.$apply(function () {
            $scope.error=' Archivo incorrecto';
        });

        console.log('playAudioFile'+error);
    });
};



this.duracionAudioFile=function(){
    console.log('duracioAudioFile');
    console.log($scope.path);
    comandos.duracionAudio($scope.path).then(function(obj){
        console.log('playAudioFile:'+obj.result);
           $scope.$apply(function () {
        $scope.duracion=obj.result*1000;//El resultado esta en segundos
        $scope.duracionHMS=obj.result;//El resultado esta en segundos
    });
    }).catch(function(error){
        console.log('playAudioFile'+error);
    });
};

$scope.subir=function(){
          // subirUrl:   $scope.file: archivo (nombre y datos con los que se guardara)
          //             $scople donde se expone el avance
          //             el path firebase sera.  'audio'/userKey/fileName.
        subirArchivoFb.subirUrl($scope.file, $scope,'audio')
                      .then(function(result) {
                        console.log('result audio');
                        console.log(result);
                        console.log($scope.file);
                          $scope.imageSrc = result.downloadURL;
                          console.log('result audio');
                          console.log('result)');
                          $ctrl.itemq = {

                                link :result.downloadURL,
                                name:result.metadata.name,
                                duracion:$scope.duracion   //ya tiene el valor en ms
                              };

                           $uibModalInstance.close($ctrl.itemq);


                      },function(result) {
                      console.log('error audio');
                      console.log(result);
                      $scope.error=result;
                      });

};
    $scope.$on('fileProgress', function(e, progress) {

        $scope.progress = progress.loaded / progress.total;

    });

$ctrl.f1=function(a){
      console.log('f1');
      a.name=$scope.nombre;
      console.log(a);
      // console.log($scope);
      // console.log($scope.recorder);
      // console.log($scope.recorder.elapsedTime);

    subirArchivoFb.subirUrl(a, $scope,'audio')
                      .then(function(result) {
                        console.log('result Imagen');
                        console.log(result);
                          $scope.imageSrc = result.downloadURL;
                          $ctrl.itemq = {
      // link: result.downloadURL,
    volumen:item.volumen,
    // name:result.downloadURL,
    duracion : item.duracion,

                                link :result.downloadURL,
                                name:result.metadata.name
                              };
                          $scope.okdisponible=true;
                      },function(result) {
                      console.log('error audio');
                      console.log(result);
                      });


    };

}])

 .controller('ModalInstanceSpotify',['$scope','$uibModalInstance','item', 'Spotify','$http','fb','spotiService', function ($scope, $uibModalInstance,  item, Spotify,$http,fb,spotiService) {

  var self=this;
  var $ctrl = this;
  $ctrl.itemq = { //Tiene los valores originales que contiene el item.

    volumen:item.volumen,
    name:item.name,
    duracion : item.duracion,
    numeroTracks:item.numeroTracks,
    tracks:item.tracks

  };
$scope.devices=null//dipositivos Spotify conectados
$scope.okdisponible=false; // habilita el boton de ok
$scope.volumen=item.volumen;
// var accessToken;         // Tocken para acceder a Spotify


console.log('ModalInstanceSpotify' );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
// var spotifyUserId=null;   // Spotify User ID
// this.volumen=50;       Volumen;



this.setTracksformItem=function(item){
       console.log('setTracksformItem' );
       console.log(item );
  if(item){
  self.tracks=item.tracks;
  $scope.mVolumen=item.volumen;
  if(self.tracks){
  self.tracks.duracion=item.duracion;
    }
  }
};

this.setTracksformItem(item);

  this.ok = function () {
     console.log('uibModalInstance.ok: ' );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log('uibModalInstance.cancel: ' );
    $uibModalInstance.dismiss('cancel');
  };

if(!spotiService.isSpotifyReady()){
spotiService.inicializaSpotify().then(
  function(r){
  console.log('inicializado ok Spotify: ' );
  // accessToken=spotiService.getSpotifyAccessTocken();
  // self.spotifyUserId=spotiService.getSpotifyUserID();
  });
};
// revisar!!!
// this.spotifyUserId= spotiService.getSpotifyUserID();
// accessToken=spotiService.getSpotifyAccessTocken();
// console.log('accessToken '+accessToken);
// // Loggin a Spotify
// if(!accessToken){

//       Spotify.login().then(function (data) {
//       console.log('Loggin a Spotify 3');
//       console.log(data);
//       accessToken=data;
//        fb.setSpotifyAccessTocken(data);
//         self.getSpotifyUser();
//         self.getDevicesSpotify();

//     }).catch(function(error){
//       console.log('error');
//       console.log(error);
//     });

//   };
//     console.log(this);
// }  else if (!self.spotifyUserId) {
//         console.log(this);
//         self.getSpotifyUser();
//         self.getDevicesSpotify();
// } else {
//       console.log(this);
//         self.getDevicesSpotify();
// }

// get Spotify User

// this.getSpotifyUser=function(){
// Spotify.getCurrentUser().then(function (data) {
//   console.log('getSpotifyUser');
//   console.log(data);
//   fb.setSpotifyUserID(data);
//   self.spotifyUserId=data.data.id;
//   fb.setSpotifyUserID(data.data.id);
// self.getUserProfile();
//   // Spotify.getUser(data.data.id).then(function (data) {
//   //   console.log('getUser');
//   //   console.log(data);
//   // });

//   }).catch(function(error){
//     console.log('getSpotifyUser error');
//   console.log(error);
//   });

// };


$scope.mOption='MisListas'; // opcion de busqueda en modal_spotify

$ctrl.buscar=function(buscarTexto){
   // search: function (q, type, options) {
    // Spotify.search(buscarTexto,'album,artist,track,playlist',{'limit':10}).then(function(data){
    // Spotify.search(buscarTexto,'album',{'limit':10}).then(function(data){


  switch($scope.mOption){
//buscar UserPlay List
    case 'MisListas':
      Spotify.getUserPlaylists(spotiService.getSpotifyUserID(),{'limit':10}).then(function(data){
      console.log('search ok');
      var dataObj= angular.fromJson(data);
      // console.log('href '+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });
    break;

//buscar Artista
    case 'Artista':
  Spotify.search(buscarTexto,'artist',{'limit':10}).then(function(data){
      console.log('search ok');
      var dataObj= angular.fromJson(data);
      // console.log('href '+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });
    break;


//buscar Album
    case 'Album':
      Spotify.search(buscarTexto,'album',{'limit':10}).then(function(data){
      console.log('search ok');
      var dataObj= angular.fromJson(data);
      // console.log('href '+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });

    break;

//buscar Track
    case 'Track':
     Spotify.search(buscarTexto,'track',{'limit':10}).then(function(data){
      console.log('search ok');
      var dataObj= angular.fromJson(data);
      // console.log('href '+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });
    break;

//buscar PlayList
    case 'PlayList':
     Spotify.search(buscarTexto,'playlist',{'limit':10}).then(function(data){
      console.log('search ok');
      var dataObj= angular.fromJson(data);
      // console.log('href '+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });
    break;
  }


};



// Coloca en items el resultado de las busquedas para mostrar las canciones. Es el listado de albums, Artistas, misListas o Listas Publicas.
// En caso de buscar tracks, carga el resultado directamente en this.tracks.
this.setResult=function(data){
 console.log('setResult'+ data);
 console.log(data);

  switch($scope.mOption){
//set UserPlay Lists
    case 'MisListas':
      self.items=data.data.items;
    break;

//set Artistas
    case 'Artista':
      this.items=data.data.artists.items;
    break;
//set Albums
    case 'Album':
      this.items=data.data.albums.items;
    break;

//set Tracks
    case 'Track':
      this.setTracks(data.data.tracks.items);
    break;

//set PlayLists
    case 'PlayList':
      this.items=data.data.playlists.items;
    break;
  }

};

// Busca los tracks de un album y calcula su duracion

this.buscarAlbumTracks=function(albumId){
  self.clearTracks();
  // $scope.tracks=[];
  console.log('buscarAlbumTracks');
  Spotify.getAlbumTracks(albumId).then(function (data) {
  console.log(data);
  // self.tracks=data.data.items;
  var duracion=0;
    for(var i = 0; i<data.data.items.length; i++ ) {
    var track=data.data.items[i];
    var t={
        'artist': track.artists[0].name,
        'trackId':track.id,
        'name': track.name,
        'durationMs':track.duration_ms,
        'uri':track.uri};
      duracion+=track.duration_ms;
      self.tracks=self.tracks.concat(t);
  }
  // self.tracks.DuracionTotalMs=duracion;
  console.log('tracks ');
  console.log( self.tracks);
  });
};

// Busca los tracks de una Playlist  y calcula su duracion

this.buscarPlayListTracks=function(ownerId,playListId){
  self.clearTracks();
  console.log('buscarPlayListTracks');
  Spotify.getPlaylistTracks(ownerId,playListId).then(function (data) {
    console.log(data);
    var duracion=0;
      for(var i = 0; i<data.data.items.length; i++ ) {
      var track=data.data.items[i].track;
      var t={
        'artist': track.artists[0].name,
        'trackId':track.id,
        'name': track.name,
        'durationMs':track.duration_ms,
        'uri':track.uri};
      duracion+=track.duration_ms;
      self.tracks=self.tracks.concat(t);
      }
    // self.tracks.DuracionTotalMs=duracion;
    console.log('tracks ');
    console.log(self.tracks);
    });
 };

// Busca los tracks de un artista y calcula su duracion
// Se necesita el código de pais, en este caso cuando se llama la funciòn desde modal_spotify se pasa AR
// este código no figura en el usuario de spotify. Habria que buscar de donde sacarlo.

this.buscarArtistTracks=function(artistId,CountryCode){
  self.clearTracks();
  console.log('buscarArtistTracks');
  Spotify.getArtistTopTracks(artistId,CountryCode).then(function (data) {
    console.log(data);
    var duracion=0;
      for(var i = 0; i<data.data.tracks.length; i++ ) {
        var track=data.data.tracks[i];
        var t={
        'artist': track.artists[0].name,
        'trackId':track.id,
        'name': track.name,
        'durationMs':track.duration_ms,
        'uri':track.uri};
        duracion+=track.duration_ms;
        self.tracks=self.tracks.concat(t);
      }
    // self.tracks.DuracionTotalMs=duracion;
    console.log('tracks ');
    console.log(self.tracks);
  });
};

// Coloca en el objet Tracks los tracks resultados de las busquedas.
// de este modo se unifica el las propiedades para que se puedan listar con el mismo nombre.

this.setTracks=function(data){
  self.clearTracks();
  //set Tracks
 console.log(' set tracks ');
 console.log(data);
var duracion=0;
    for(var i = 0; i<data.length; i++ ) {
    var track=data[i];
console.log( 'duration'+track.duration_ms);
   var t={
    'artist': track.artists[0].name,
    'trackId':track.id,
    'name': track.name,
    'durationMs':track.duration_ms,
    'uri':track.uri};
    duracion+=track.duration_ms;

self.tracks=self.tracks.concat(t);


  }
// self.tracks.DuracionTotalMs=duracion;
 console.log('tracks ');
 console.log(self.tracks);

};

// Limplia la Tracks para que puedan mostrarse nuevos resultados.

this.clearTracks=function(){
   console.log('clearTracks: ');
  this.tracks=null;
  self.tracks=[];
};

// transforama un valor en milisegundos (ms) en horas, minutos y segundos.

this.msToDHMSMS = function(time){
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


// determina con que función se buscan los tracks mirando que opción se eligió para realizar la busqueda.
// se dispara desde el click del carrousel
this.buscarTracks=function(ownerId,id){
 console.log('setResult: '+ id);

 console.log('ownerId: '+ ownerId);


  switch($scope.mOption){
//buscar UserPlay List
    case 'MisListas':
      self.buscarPlayListTracks(ownerId,id);
    break;

//buscar Artista
    case 'Artista':
    self.buscarArtistTracks(id,'AR');//artistId,CountryCode
    break;
//buscar Album
    case 'Album':
      self.buscarAlbumTracks(id);
    break;

//buscar Track Esto no se usa por el click del carrousel
    case 'Track':
      // this.items=data.data.tracks.items;
    break;

//buscar PlayList
    case 'PlayList':
            self.buscarPlayListTracks(ownerId,id);
    break;
  }

};

// // Verifica si esta habierto spotify

// this.getDevicesSpotify=function(){

//   console.log('getDevicesSpotify');
// var reqDevices = {
//  method: 'GET',
//  url: 'https://api.spotify.com/v1/me/player/devices',
//  headers: {
//    'Accept': 'application/json',
//     'Content-Type': 'application/json'
//     }
// };
// reqDevices.headers.Authorization='Bearer ' +accessToken;
//   $http(reqDevices).then(function (response) {
//     console.log('reqDevices is good', response.data);
//     console.log(response);
//     $scope.devices=response.data.devices;
//     if($scope.devices.length==0){
//           alert('Debe abrir spotify para ejecutar canciones desde la application');
//          }else if(!$scope.devices[0].is_active){
//             alert('Spotify no esta activo. Ponga play a una cancion ');

//         }else{
//             console.log("volumen"+$scope.devices[0].volume_percent);
//             $scope.mVolumen=$scope.devices[0].volume_percent;
//         };


// }, function (error) {
//     console.log('reqDevices an error ', error.data);
// });
// };



// Modifica el volumen con el que se está repoduciendo en spotify

this.setVolumen=function(volumen){
  $scope.mVolumen=volumen;
  console.log('volumen' +  $scope.mVolumen);
var reqVolumen = {
 method: 'put',
 url: 'https://api.spotify.com/v1/me/player/volume?volume_percent='+volumen,
 headers: {
   'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
};
reqVolumen.headers.Authorization='Bearer ' +spotiService.getSpotifyAccessTocken();
  $http(reqVolumen).then(function (response) {
    console.log('all is good', response.data);
}, function (error) {
    console.log('an error occurred', error.data);
});
};

//Marca o libera todos los tracks que se muestran.

this.selectAllTracks=function(select){
  console.log('selectAllTracks '+select);
  var duracion=0;
  for(var i = 0; i<self.tracks.length; i++ ) {
    console.log('self.tracks.DuracionTotalMs '+self.tracks.DuracionTotalMs);
    console.log('self.tracks[i].durationMs '+self.tracks[i].durationMs);
    duracion=duracion+self.tracks[i].durationMs;
    self.tracks[i].selected=select;
  }
  self.tracks.DuracionTotalMs=duracion;
  if(!select){
    self.tracks.DuracionTotalMs=0;
  }

  console.log('self.tracks.DuracionTotalMs '+self.tracks.DuracionTotalMs);
  self.setItemq();
};

//Marca o libera un track para ser sumarlo a la lista de canciones que se van a reproducir

this.selectTracks=function(id,select){
  console.log('selectTracks '+select);
  console.log('selectTracks '+id);
  if(!self.tracks.DuracionTotalMs){
    self.tracks.DuracionTotalMs=0;
  }
  self.tracks[id].selected=select;
  console.log('self.tracks.DuracionTotalMs '+self.tracks.DuracionTotalMs);
  if(select){
    self.tracks.DuracionTotalMs=self.tracks.DuracionTotalMs+self.tracks[id].durationMs;
    console.log('self.tracks[id].durationMs'+self.tracks[id].durationMs);
    }
    else{
    self.tracks.DuracionTotalMs=self.tracks.DuracionTotalMs-self.tracks[id].durationMs;
    console.log('self.tracks[id].durationMs '+self.tracks[id].durationMs);
    }
    console.log('self.tracks.DuracionTotalMs '+self.tracks.DuracionTotalMs);
    self.setItemq();
};

// Set de Itemq que contiene los valores que retorna cuando se aprieta ok
this.setItemq=function(){
  self.itemq.tracks=self.tracks;
  self.itemq.duracion=self.tracks.DuracionTotalMs;
  self.itemq.numeroTracks=self.tracks.length;
  $scope.okdisponible=true;
  self.itemq.volumen=$scope.mVolumen;
};


$ctrl.playAlbum=function(albumUri){

  var req = {
  method: 'put',

  url: 'https://api.spotify.com/v1/me/player/play',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    // 'Accept-Encoding':'gzip, deflate, compress'
  },
  data: {
    'context_uri': albumUri,
    'offset': {
    'position': 0}
  }};

  console.log('albumUri', albumUri);
  console.log('accessToken', spotiService.getSpotifyAccessTocken());
  console.log('itemActual', self.itemActual);
  req.headers.Authorization='Bearer ' +spotiService.getSpotifyAccessTocken();
  $http(req).then(function (response) {
    console.log('playAlbum', response.data);
    console.log(response);
  }, function (error) {
    console.log('playAlbum an error occurred', error.data);
  });
};


this.playSong=function(songUri){
  if(spotiService.isSpotifyReady()){
  console.log('playSong');
  console.log(songUri);
  var req = {
    method: 'put',
    // url: 'https://api.spotify.com/v1/me/player/play&device_id=c565f68c8ac24d000809da8f41c839cf68003510',
     url: 'https://api.spotify.com/v1/me/player/play',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
        // 'Accept-Encoding':'gzip, deflate, compress'
      },
    data: {
     // 'context_uri': songUri,
    'uris':[songUri],
    'offset': {
    'position': 0
    }}
  };
  req.headers.Authorization='Bearer ' +spotiService.getSpotifyAccessTocken();
  $http(req).then(function (response) {
    console.log('playSong', response.data);
  }, function (error) {
    console.log('playSong an error occurred', error.data);
  });
};
};


// this.getUserProfile=function(){
//   console.log('getUserProfile');
//   // console.log(songUri);
//   var req = {
//     method: 'get',

//      url: 'https://api.spotify.com/v1/me',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//         // 'Accept-Encoding':'gzip, deflate, compress'
//       }
//       // ,
//     // data: {
//      // 'context_uri': songUri,
//     // 'uris':[songUri],
//     // 'offset': {
//     // 'position': 0
//     // }
//   // }
//   };
//   req.headers.Authorization='Bearer ' +accessToken;
//   $http(req).then(function (response) {
//     console.log('playAlbum', response.data);
//   }, function (error) {
//     console.log('playAlbum an error occurred', error.data);
//   });
// };

}]);

