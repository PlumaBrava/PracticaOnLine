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

            {type: 'container', id: 1, duracion:0, nombre:'nombre',columns: [[]], iconClass:'glyphicon glyphicon-object-align-vertical'},//Se ejecutan tareas en serie
            {type: 'bloque', id: 2, duracion:0, nombre:'nombre',columns: [[]],iconClass:'glyphicon glyphicon-object-align-horizontal'},         //Se ejecutan tareas en paralelo

        ],
        templates: [

            // {type: 'container', id: 1, duracion:0, columns: [[]], iconClass:'glyphicon glyphicon-object-align-vertical'},//Se ejecutan tareas en serie
            // {type: 'bloque', id: 2, duracion:0, nombre:'nombre',columns: [[]],iconClass:'glyphicon glyphicon-object-align-horizontal'},         //Se ejecutan tareas en paralelo
            {type: 'spotify', id: 3,search: 'track' , volumen:1,duracion:0,numeroTracks:0, tracks:[] , iconClass:'btn-spotify',iconSrc:'/images/Spotify_logo_without_text.svg' },        // Dipara musica de Spotify
             {type: 'youtube', id: 4,link:'t1wBwyS94xY',name:'jj',description:'',duracion:0,iconClass:'btn-youtube',iconSrc:'/images/YouTube_full-color_icon_(2017).svg'}, // link a you tube
            {type: 'audio', id: 5, link:'',volumen:1,name:'',iconClass:'btn-audio glyphicon glyphicon-music' },          // Reporduce audio
            {type: 'leer', id: 6, texto:'Texto de prueba',iconClass:'btn-leer glyphicon glyphicon-bullhorn'},           // Lee un texto
            {type: 'escribir', id: 7, texto:'Texto en Pantalla',iconClass:'btn-escribir glyphicon glyphicon-pencil'},           // Escribe un texto en Pantalla
            {type: 'imagen', id: 8,link:'',name:'', iconClass:'btn-imagen glyphicon glyphicon-picture'  },                           // Muestra Imagen
            {type: 'tick', id: 9, intervaloMs: 1000, volumen:1,duracion:6000,iconClass:'btn-tick glyphicon glyphicon-bell'},       // activa el cuenta timpo
            {type: 'cronometro', id: 10, digital:true, analogico:true,iconClass:'btn-cronometro glyphicon glyphicon-hourglass'},      // permite medir mi tiempo.
            {type: 'registro', id: 11,iconClass:'btn-registro glyphicon glyphicon-registration-mark' }        // permite tomar registo de tiempo o cantidades...
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
            ]  ,
            'B': [
                {
                    'type': 'item',
                    'id': 7
                }]


                // ,
            //     {
            //         'type': 'item',
            //         'id': '8'
            //     },
            //     {
            //         'type': 'container',
            //         'id': '2',
            //         'columns': [
            //             [
            //                 {
            //                     'type': 'item',
            //                     'id': '9'
            //                 },
            //                 {
            //                     'type': 'item',
            //                     'id': '10'
            //                 },
            //                 {
            //                     'type': 'item',
            //                     'id': '11'
            //                 }
            //             ],
            //             [
            //                 {
            //                     'type': 'item',
            //                     'id': '12'
            //                 },
            //                 {
            //                     'type': 'container',
            //                     'id': '3',
            //                     'columns': [
            //                         [
            //                             {
            //                                 'type': 'item',
            //                                 'id': '13'
            //                             }
            //                         ],
            //                         [
            //                             {
            //                                 'type': 'item',
            //                                 'id': '14'
            //                             }
            //                         ]
            //                     ]
            //                 },
            //                 {
            //                     'type': 'item',
            //                     'id': '15'
            //                 },
            //                 {
            //                     'type': 'item',
            //                     'id': '16'
            //                 }
            //             ]
            //         ]
            //     },
            //     {
            //         'type': 'item',
            //         'id': 16
            //     }
            // ],

            // 'c': [
            //     {
            //         'type': 'item',
            //         'id': 7
            //     },
            //     {
            //         'type': 'item',
            //         'id': '8'
            //     }
            //     ]
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
switch(obj.type){
    case 'container':
          obj.duracion=duracionContainer;
          console.log('level:' +level+' ' +obj.type +' - duracion container: '+ obj.duracion);

          break;

          case 'bloque':
          obj.duracion=duracionBloque;
          console.log('level:' +level+' ' +obj.type +' - duracion container: '+ obj.duracion);
            break;

}


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
         $scope.$apply(function () {
                $scope.models.dropzones=    obj.result.practica;
                $scope.models.propiedades=    obj.result.propiedades;
                $scope.nombrePractica=obj.result.propiedades.nombre;
                console.log($scope.models.dropzones);
                console.log($scope.models.propiedades);
            });

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
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
load();
$scope.save=function(){
    console.log('save');
    console.log('save: '+fb.getUserKey());
    comandos.setModelAsJason($scope.modelAsJson);

    fb.writeModificacionPractica(self.practicaKey,self.userKey, $scope.models.dropzones,$scope.models.propiedades);

};

  this.items = ['item1', 'item2', 'item3'];
  this.selected ={
    item: this.items[2]
  };
  this.animationsEnabled = true;

// callbacks de la lista

  $scope.dragoverCallback = function(index, external, type, callback) {
        $scope.logListEvent('dragged over', index, external, type);
        // Invoke callback to origin for container types.
        if (type === 'container' && !external) {
            console.log('Container being dragged contains ' + callback() + ' items');
        }
        return index < 10; // Disallow dropping in the third row.
    };

    $scope.dropCallback = function(event,index, item, external, type,list) {
      console.log('CallbackBloqueRaiz');
      $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);
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
               console.log('CallbackBloque');
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
        console.log(message);
    };

    $scope.logListEvent = function(action, index, external, type) {
        var message = external ? 'External ' : '';
        message += type + ' element was ' + action + ' position ' + index;
        console.log(message);
    };


    $scope.onDragstart = function(list, event) {
        console.log('onDragstart');
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
        }else{
            item.duracion=0;
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
.controller('ModalInstanceTick', function ($uibModalInstance,  item) {
  var $ctrl = this;
     // {type: 'tick', id: 8, intervaloMs: 1000, volumen:1,duracion:6000},       // activa el cuenta timpo

  $ctrl.itemq = {

    intervaloMs : item.intervaloMs,
    volumen : item.volumen,
    duracion : item.duracion
  };
console.log('$uibModalInstance' );
console.log(item );
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


.controller('ModalInstanceYouTube',['$scope','$uibModalInstance','item', 'subirarchivofb','ngYoutubeEmbedService','$http','fb',function ($scope, $uibModalInstance,  item,subirArchivoFb,ngYoutubeEmbedService,$http,fb) {

 console.log('ModalInstanceYouTube');
  var $ctrl = this;
  // $scope.videoID=item.link;
 $scope.videoURL=item.link;
 $scope.name=item.name;
 $scope.okdisponible=false;
 $scope.link=item.link;
// $ctrl.itemq=item;
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
console.log(ngYoutubeEmbedService );


// this.p=null;



this.select=function(){
    console.log('select' );
    $scope.okdisponible=true;
    $scope.videoURL=$scope.link;



      // var player3 = ngYoutubeEmbedService.getVideoIdByUrl($scope.videoURL);

//         var player3 = ngYoutubeEmbedService.getPlayerById($scope.link);
// console.log(player3);
// player3.clearVideo();
// player3.cueVideoById($scope.link);
// player3.nextVideo();
// player3.playVideo();

// console.log(player3.getCurrentTime());
//     // var player4 = ngYoutubeEmbedService.getVideoIdByUrl($scope.link);
//     //     console.log(player4);

//       ngYoutubeEmbedService.setReadyState();



//       // ngYoutubeEmbedService.

//     var videoData=player3.getVideoData();
//     console.log(videoData);
//         // $scope.$apply(function () {
//         $scope.itemq = {

//          duracion:player3.getDuration(),
//          duracion:player3.getDuration(),
//          duracionHMS:fb.msToDHMSMS(player3.getDuration()),
//             volumen:player3.getVolume(),
//             titulo:videoData.title,
//             autor:videoData.author
//         };
// });

};




this.showVideoInfo = function() {
    var player = ngYoutubeEmbedService.getPlayerById('myvideo');
    console.log(player);
      console.log(player.getDuration());
    // console.log(player.showVideoInfo());

    console.log(player.getVideoData());
    console.log(player.getVolume());
  };

 $scope.stateChanged = function(e) {
    console.log('stateChanged');
    console.log(e);
  };

 // Gets fired when the iframe player has finished loading
    $scope.playerReady = function(event) {
        console.log('playerReady'); // Event data logged
        console.log(event); // Event data logged
        // this.myPlayer
    };

    // Gets fired when the state of the iframe player changes
    $scope.playerStateChanged = function(event) {
        console.log('playerStateChanged'); // Event data logged
        console.log(event); // Event data logged
            console.log('player.getVideoData()');
            var player1 = ngYoutubeEmbedService.getPlayerById('videoID');
    console.log(player1);
    console.log(player1.getDuration());
    console.log(fb.msToDHMSMS(player1.getDuration()*1000));
    var videoData=player1.getVideoData();
    console.log(videoData);
    console.log(videoData);
        $scope.$apply(function () {
        $scope.itemq = {
         duracion:player1.getDuration(),
         duracionHMS:fb.msToDHMSMS(player1.getDuration()*1000),
            volumen:player1.getVolume(),
            titulo:videoData.title,
            autor:videoData.author
        };
    });
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

 // Gets fired when the iframe player has finished loading
    $scope.playerReady = function(event) {
        console.log('playerReady'); // Event data logged
        console.log(event); // Event data logged
      //   var player = ngYoutubeEmbedService.getPlayerById('myvideo'); // Returns the iframe player instance
      // console.log('Player');
      // console.log(player);
    };


  this.ok = function () {
     console.log('uibModalInstance.ok: ' );

      var player = ngYoutubeEmbedService.getPlayerById("videoID");
    console.log(player);
      console.log(player.getDuration());

    console.log(player.getVolume());
     $scope.itemq = {

    link : $scope.link,
    name: $scope.name,

    duracion:player.getDuration(),
    duracionHMS:fb.msToDHMSMS(player.getDuration()*1000),
    volumen:player.getVolume(),
    titulo:player.getVideoData().title,
    autor:player.getVideoData().author

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

  $ctrl.itemq = {

    link: item.link,
    volumen:item.volumen,
    name:item.name,
    duracion : item.duracion
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
        if($scope.file.type==='audio/mp3'){
             $scope.$apply(function () {
            $scope.okdisponible=true;
            $scope.nombre=$scope.file.name;
            $ctrl.duracionAudioFile();
            });

            }else{

            $scope.$apply(function () {
            $scope.error='tipo de Archivo incorrercto';
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
        console.log('playAudioFile'+error);
    });
};



this.duracionAudioFile=function(){
    console.log('duracioAudioFile');
    console.log($scope.path);
    comandos.duracionAudio($scope.path).then(function(obj){
        console.log('playAudioFile:'+obj.result);
           $scope.$apply(function () {
        $scope.duracion=obj.result;
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
                                duracion:$scope.duracion
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
                      console.log('error Imagen');
                      console.log(result);
                      });


    };

}])

 .controller('ModalInstanceSpotify',['$scope','$uibModalInstance','item', 'Spotify','$http', function ($scope, $uibModalInstance,  item, Spotify,$http) {

  var self=this;
  var $ctrl = this;
  $ctrl.itemq = { //Tiene los valores originales que contiene el item.

    volumen:item.volumen,
    name:item.name,
    duracion : item.duracion,
    numeroTracks:item.numeroTracks,
    tracks:item.tracks

  };

$scope.okdisponible=false; // habilita el boton de ok
$scope.volumen=item.volumen;
var accessToken;         // Tocken para acceder a Spotify


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

//Loggin a Spotify
console.log('Loggin a Spotify 4');
      Spotify.login().then(function (data) {
        console.log('Loggin a Spotify 4');
        accessToken=data;
        console.log(data);
        // alert('You are now logged in');
        self.getSpotifyUser();
});


// get Spotify User

this.getSpotifyUser=function(){
Spotify.getCurrentUser().then(function (data) {
  console.log('getSpotifyUser');
  console.log(data);
  self.spotifyUserId=data.data.id;
self.getUserProfile();
  // Spotify.getUser(data.data.id).then(function (data) {
  //   console.log('getUser');
  //   console.log(data);
  // });

  });

};


$scope.mOption='MisListas'; // opcion de busqueda en modal_spotify

$ctrl.buscar=function(buscarTexto){
   // search: function (q, type, options) {
    // Spotify.search(buscarTexto,'album,artist,track,playlist',{'limit':10}).then(function(data){
    // Spotify.search(buscarTexto,'album',{'limit':10}).then(function(data){


  switch($scope.mOption){
//buscar UserPlay List
    case 'MisListas':
      Spotify.getUserPlaylists(self.spotifyUserId,{'limit':10}).then(function(data){
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
  self.tracks.DuracionTotalMs=duracion;
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
    self.tracks.DuracionTotalMs=duracion;
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
    self.tracks.DuracionTotalMs=duracion;
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
self.tracks.DuracionTotalMs=duracion;
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
reqVolumen.headers.Authorization='Bearer ' +accessToken;
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
  console.log('accessToken', accessToken);
  console.log('itemActual', self.itemActual);
  req.headers.Authorization='Bearer ' +accessToken;
  $http(req).then(function (response) {
    console.log('playAlbum', response.data);
    console.log(response);
  }, function (error) {
    console.log('playAlbum an error occurred', error.data);
  });
};


this.playSong=function(songUri){
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
  req.headers.Authorization='Bearer ' +accessToken;
  $http(req).then(function (response) {
    console.log('playAlbum', response.data);
  }, function (error) {
    console.log('playAlbum an error occurred', error.data);
  });
};


this.getUserProfile=function(){
  console.log('getUserProfile');
  // console.log(songUri);
  var req = {
    method: 'put',

     url: 'https://api.spotify.com/v1/me',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
        // 'Accept-Encoding':'gzip, deflate, compress'
      }
      // ,
    // data: {
     // 'context_uri': songUri,
    // 'uris':[songUri],
    // 'offset': {
    // 'position': 0
    // }
  // }
  };
  req.headers.Authorization='Bearer ' +accessToken;
  $http(req).then(function (response) {
    console.log('playAlbum', response.data);
  }, function (error) {
    console.log('playAlbum an error occurred', error.data);
  });
};

}]);

