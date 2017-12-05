'use strict';

/**
 * @ngdoc function
 * @name practicaApp.controller:ArmarpracticaCtrl
 * @description
 * # ArmarpracticaCtrl
 * Controller of the practicaApp
 */
angular.module('practicaApp')
   .controller("ArmarpracticaCtrl", ['$scope','comandos','$uibModal','fb',function($scope,comandos,$uibModal,fb) {
   // .controller("ArmarpracticaCtrl", ['$scope','$uibModal','fb',function($scope,$uibModal,fb) {
    console.log("ArmarpracticaCtrl");


    var self=this;

    $scope.models = {
        selected: null,

        templatesConetendores: [

            {type: "container", id: 1, duracion:0, nombre:"nombre",columns: [[]], iconClass:"glyphicon glyphicon-object-align-vertical"},//Se ejecutan tareas en serie
            {type: "bloque", id: 2, duracion:0, nombre:"nombre",columns: [[]],iconClass:"glyphicon glyphicon-object-align-horizontal"},         //Se ejecutan tareas en paralelo

        ],
        templates: [

            // {type: "container", id: 1, duracion:0, columns: [[]], iconClass:"glyphicon glyphicon-object-align-vertical"},//Se ejecutan tareas en serie
            // {type: "bloque", id: 2, duracion:0, nombre:"nombre",columns: [[]],iconClass:"glyphicon glyphicon-object-align-horizontal"},         //Se ejecutan tareas en paralelo
            {type: "spotify", id: 3,search: "track" , volumen:1,duracion:0,numeroTracks:0, tracks:[] , iconClass:"fa fa-spotify " },        // Dipara musica de Spotify
             {type: "youtube", id: 4,link:"",name:"jj",description:"",duracion:0,iconClass:"fa fa-youtube"}, // link a you tube
            {type: "audio", id: 5, link:"",volumen:1,name:"",iconClass:"glyphicon glyphicon-music" },          // Reporduce audio
            {type: "leer", id: 6, texto:"Texto de prueba",iconClass:"glyphicon glyphicon-bullhorn"},           // Lee un texto
            {type: "escribir", id: 7, texto:"Texto en Pantalla",iconClass:"glyphicon glyphicon-pencil"},           // Escribe un texto en Pantalla
            {type: "imagen", id: 8,link:"",name:"", iconClass:"glyphicon glyphicon-picture"  },                           // Muestra Imagen
            {type: "tick", id: 9, intervalo_ms: 1000, volumen:1,duracion:6000,iconClass:"glyphicon glyphicon-bell"},       // activa el cuenta timpo
            {type: "cronometro", id: 10, digital:true, analogico:true,iconClass:"glyphicon glyphicon-hourglass"},      // permite medir mi tiempo.
            {type: "registro", id: 11,iconClass:"glyphicon glyphicon-glyphicon-picture" }        // permite tomar registo de tiempo o cantidades...
        ],
        propiedades:{nombre: "nombre de la practica",descripcion:"description", usuarioCreador: {},fechaCreacion:"",fechaModicicacion:[],publica:false,cantidadSegidores:0,calificacion:100,duracion:0},        // permite tomar registo de tiempo o cantidades...
        dropzones: {
            "A": [
                {
                    "type": "container",
                    "id": 1,
                    "columns": [
                        [
                            {
                                "type": "item",
                                "id": "1"
                            },
                            {
                                "type": "item",
                                "id": "2"
                            }
                        ],
                        [
                            {
                                "type": "item",
                                "id": "3"
                            }
                        ]
                    ]
                },
                {
                    "type": "item",
                    "id": "4"
                },
                {
                    "type": "item",
                    "id": "5"
                },
                {
                    "type": "item",
                    "id": "6"
                }
            ]
            ,
            "B": [
                {
                    "type": "item",
                    "id": 7
                }]


                // ,
            //     {
            //         "type": "item",
            //         "id": "8"
            //     },
            //     {
            //         "type": "container",
            //         "id": "2",
            //         "columns": [
            //             [
            //                 {
            //                     "type": "item",
            //                     "id": "9"
            //                 },
            //                 {
            //                     "type": "item",
            //                     "id": "10"
            //                 },
            //                 {
            //                     "type": "item",
            //                     "id": "11"
            //                 }
            //             ],
            //             [
            //                 {
            //                     "type": "item",
            //                     "id": "12"
            //                 },
            //                 {
            //                     "type": "container",
            //                     "id": "3",
            //                     "columns": [
            //                         [
            //                             {
            //                                 "type": "item",
            //                                 "id": "13"
            //                             }
            //                         ],
            //                         [
            //                             {
            //                                 "type": "item",
            //                                 "id": "14"
            //                             }
            //                         ]
            //                     ]
            //                 },
            //                 {
            //                     "type": "item",
            //                     "id": "15"
            //                 },
            //                 {
            //                     "type": "item",
            //                     "id": "16"
            //                 }
            //             ]
            //         ]
            //     },
            //     {
            //         "type": "item",
            //         "id": 16
            //     }
            // ],

            // "c": [
            //     {
            //         "type": "item",
            //         "id": 7
            //     },
            //     {
            //         "type": "item",
            //         "id": "8"
            //     }
            //     ]
        }
    };





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
    case "container":
          console.log("Container nivel:" +level+" - duracion container: "+ obj.duracion);
          objInterno=obj.columns[0];
          break;

          case "bloque":
          console.log("Bloque nivel:" +level+" - duracion bloque: "+ obj.duracion);
          objInterno=obj.columns[0];
          break;

          default:
          console.log("default:" +level+" - duracion default: "+ obj.duracion);
          objInterno=obj;

};

          console.log("objInterno:");
          console.log(objInterno);

// recorro el objeto y calculo la duración del bloque y del container.
// asigno la duración total y retorno el objeto completo.


    for (var i=0;i<objInterno.length;i++){
      console.log("i :"+i);
      console.log(objInterno[i].type);
         switch (objInterno[i].type){
          case "item":
          console.log("level:" +level +" " +objInterno[i].type+" - duracion: "+" :"+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;

          break;

          case "container":
          console.log("level:" +level+" " +objInterno[i].type +" - duracion: "+ objInterno[i].duracion);
          objInterno[i]=self.calculoDeDuracion(objInterno[i],++level);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case "bloque":
          console.log("level:" +level+" " +objInterno[i].type +" - duracion: "+ objInterno[i].duracion);
          objInterno[i]=self.calculoDeDuracion(objInterno[i],++level);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case "spotify":
          console.log("level:" +level +" " +objInterno[i].type+" - duracion: "+" :"+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case "audio":
          console.log("level:" +level +" " +objInterno[i].type+" - duracion: "+" :"+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case "leer":
          console.log("level:" +level +" " +objInterno[i].type+" - duracion: "+" :"+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case "imagen":
          console.log("level:" +level +" " +objInterno[i].type+" - duracion: "+" :"+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case "tick":
          console.log("level:" +level +" " +objInterno[i].type+" - duracion: "+" :"+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case "cronometro":
          console.log("level:" +level +" " +objInterno[i].type+" - duracion: "+" :"+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;

          case "registro":
          console.log("level:" +level +" " +objInterno[i].type+" - duracion: "+" :"+ objInterno[i].duracion);
          if(duracionBloque<objInterno[i].duracion){
            duracionBloque=objInterno[i].duracion;
          }
          duracionContainer=duracionContainer+objInterno[i].duracion;
          break;
          };// fin switch
    };//fin for

console.log(obj.type);
  obj.duracion=duracionContainer;
switch(obj.type){
    case "container":
          obj.duracion=duracionContainer;
          console.log("level:" +level+" " +obj.type +" - duracion container: "+ obj.duracion);

          break;

          case "bloque":
          obj.duracion=duracionBloque;
          console.log("level:" +level+" " +obj.type +" - duracion container: "+ obj.duracion);
            break;

};


// retorno el objeto completo para que con la recursividad se ajusten todas las duraciones.

console.log("retorno:");
console.log(obj);
return obj;


};



var load=function(){
    console.log("load");
      console.log(comandos.getModelAsJason());
if (!comandos.getModelAsJason()){
    console.log("load undefined");

}
    else{
    console.log("load no null");
    console.log(comandos.getModelAsJason);
    $scope.models.dropzones=    angular.fromJson(comandos.getModelAsJason());
};
};


load();

    $scope.$watch('models.dropzones', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

$scope.save=function(){
    console.log("save");
    console.log("save: "+fb.getUserKey());
    comandos.setModelAsJason($scope.modelAsJson);
    fb.writePractica(fb.getUserKey(), $scope.modelAsJson, $scope.models.propiedades);
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
        if (type == 'container' && !external) {
            console.log('Container being dragged contains ' + callback() + ' items');
        }
        return index < 10; // Disallow dropping in the third row.
    };

    $scope.dropCallback = function(event,index, item, external, type,list) {
      console.log("CallbackBloqueRaiz");
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
               console.log("CallbackBloque");
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
        console.log("onDragstart");
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

    var parentElem = undefined;
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


        console.log("return:"+returnedItem);
        console.log(returnedItem);
        console.log(item);

        item.texto=returnedItem;

    }, function () {

        console.log("return dismissed:");
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

$scope.openTickModal = function (size, item) {

    var parentElem = undefined;

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


        console.log("return:"+returnedItem);
        console.log(returnedItem);
        console.log(item);


        // item.texto=returnedItem;
        item.intervalo_ms = returnedItem.intervalo_ms,
        item.volumen = returnedItem.volumen,
        item.duracion = Number(returnedItem.duracion);
        $scope.models.dropzones.A=self.calculoDeDuracion($scope.models.dropzones.A,0);

    }, function () {

        console.log("return dismissed:");
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

$scope.openImagenModal = function (size, item) {

    var parentElem = undefined;

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

        console.log("return dismissed:");

    });
  };

  $scope.openYoutubeModal = function (size, item) {

    var parentElem = undefined;

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

        item.link  = returnedItem.link;
        item.name  = returnedItem.name;


    }, function () {

        console.log("return dismissed:");

    });
  };

$scope.openAudioModal = function (size, item) {

    var parentElem = undefined;

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


        console.log("return:"+returnedItem);
        console.log(returnedItem);
        console.log(item);


        // item.texto=returnedItem;
        item.link = returnedItem.link,
        item.name = returnedItem.name
        item.duracion = returnedItem.duracion


    }, function () {

        console.log("return dismissed:");
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

// }]);

$scope.openSpotifyModal = function (size, item) {

    var parentElem = undefined;

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


        console.log("return:"+returnedItem);
        console.log(returnedItem);
        console.log(item);



        item.link = returnedItem.link,
        item.name = returnedItem.name
        item.duracion = returnedItem.duracion
        item.numeroTracks=returnedItem.duracion;
        item.tracks=returnedItem.tracks;
        item.volumen=returnedItem.volumen;


    }, function () {

        console.log("return dismissed:");
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
console.log("$uibModalInstance" );
console.log(items );
console.log($uibModalInstance );
console.log($ctrl );
  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  };
})
.controller('ModalInstanceTick', function ($uibModalInstance,  item) {
  var $ctrl = this;
     // {type: "tick", id: 8, intervalo_ms: 1000, volumen:1,duracion:6000},       // activa el cuenta timpo

  $ctrl.itemq = {

    intervalo_ms : item.intervalo_ms,
    volumen : item.volumen,
    duracion : item.duracion
  };
console.log("$uibModalInstance" );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  }
})

  .controller('ModalInstanceImagen',["$scope","$uibModalInstance","item", "subirarchivofb", function ($scope, $uibModalInstance,  item,subirArchivoFb) {

 console.log("ModalInstanceImagen");
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
          //             el path firebase sera.  "imagen"/userKey/fileName.

        subirArchivoFb.subirUrl($scope.file, $scope,"imagen")
                      .then(function(result) {
                        console.log("result Imagen");
                        console.log(result);
                          $scope.imageSrc = result.downloadURL;
                          $ctrl.itemq = {
                                link :result.downloadURL,
                                name:result.metadata.name
                              };
                          $scope.okdisponible=true;
                      },function(result) {
                      console.log("error Imagen");
                      console.log(result);
                      });
    };

    $scope.$on("fileProgress", function(e, progress) {

        $scope.progress = progress.loaded / progress.total;

    });


  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  };

 $ctrl.fileToUpload = null;
   $ctrl.onChange = function onChange(fileList) {
    $ctrl.fileToUpload = fileList[0];};

}])


.controller('ModalInstanceYouTube',["$scope","$uibModalInstance","item", "subirarchivofb",'ngYoutubeEmbedService',function ($scope, $uibModalInstance,  item,subirArchivoFb,ngYoutubeEmbedService) {

 console.log("ModalInstanceYouTube");
  var $ctrl = this;
$scope.videoURL=item.link;
 $scope.name=item.name;
 $scope.okdisponible=false;
 $scope.link="https://www.youtube.com/watch?v=cKzK88y3o1Q";


this.select=function(){
 console.log("select" );
 console.log($scope );
 $scope.videoURL= $scope.link;
//     $scope.scrYouTube=function() {
//     return $sce.getTrustedResourceUrl("https://www.youtube.com/embed/"+$scope.link);
//   };
// console.log($scope.scrYouTube );
$scope.okdisponible=true;
     var player = ngYoutubeEmbedService.getPlayerById('myvideo'); // Returns the iframe player instance
      console.log("Player");
      console.log(ngYoutubeEmbedService);
      console.log(player);
};

 $ctrl.itemq = {

    link : item.link,
    name: item.name

  };

 // Gets fired when the iframe player has finished loading
    $scope.playerReady = function(event) {
        console.log("playerReady"); // Event data logged
        console.log(event); // Event data logged
        var player = ngYoutubeEmbedService.getPlayerById('myvideo'); // Returns the iframe player instance
      console.log("Player");
      console.log(player);
    };


  this.ok = function () {
     console.log("uibModalInstance.ok: " );
     $ctrl.itemq = {

    link : $scope.link,
    name: $scope.name

  };
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  };

 $ctrl.fileToUpload = null;
   $ctrl.onChange = function onChange(fileList) {
    $ctrl.fileToUpload = fileList[0];};

}])

 .controller('ModalInstanceAudio',["$scope","$uibModalInstance","item", "subirarchivofb","recorderService", function ($scope, $uibModalInstance,  item,subirArchivoFb,recorderService) {
  // .controller('PerfilesCtrl' ,['$element', 'recorderService', 'recorderUtils', '$scope', '$timeout', '$interval', 'recorderPlaybackStatus', function ($element, recorderService, recorderUtils, $scope, $timeout, $interval, recorderPlaybackStatus) {

  // .controller(, function ($uibModalInstance,  item) {
  var $ctrl = this;
  $scope.nombre="nombre";

  $ctrl.itemq = {

    link: item.link,
    volumen:item.volumen,
    name:item.name,
    duracion : item.duracion
  };
console.log("ModalInstanceAudio" );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
console.log("recorderService" );
console.log(recorderService );

  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  }


    $scope.getFile = function () {
        $scope.progress = 0;


          // subirUrl:   $scope.file: archivo (nombre y datos con los que se guardara)
          //             $scople donde se expone el avance
          //             el path firebase sera.  "imagen"/userKey/fileName.


        subirArchivoFb.subirUrl($scope.file, $scope,"audio")
                      .then(function(result) {
                        console.log("result audio");
                        console.log(result);
                        console.log($scope.file);
                          $scope.imageSrc = result.downloadURL;
                          console.log("result audio");
                          console.log("result)");
                          $ctrl.itemq = {

                                link :result.downloadURL,
                                name:result.metadata.name
                              };
                          $scope.okdisponible=true;
        //                   var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
        // recorderService.$html5AudioProps.audioInput= $scope.file;
        // recorderService.isReady=true;

                      },function(result) {
                      console.log("error Imagen");
                      console.log(result);
                      });
    };

    $scope.$on("fileProgress", function(e, progress) {

        $scope.progress = progress.loaded / progress.total;

    });

$ctrl.f1=function(a){
      console.log('f1');
      a.name=$scope.nombre;
      console.log(a);
      // console.log($scope);
      // console.log($scope.recorder);
      // console.log($scope.recorder.elapsedTime);

    subirArchivoFb.subirUrl(a, $scope,"audio")
                      .then(function(result) {
                        console.log("result Imagen");
                        console.log(result);
                          $scope.imageSrc = result.downloadURL;
                          $ctrl.itemq = {
      link: result.downloadURL,
    volumen:item.volumen,
    name:result.downloadURL,
    duracion : item.duracion,

                                link :result.downloadURL,
                                name:result.metadata.name
                              };
                          $scope.okdisponible=true;
                      },function(result) {
                      console.log("error Imagen");
                      console.log(result);
                      });


    };

}])

 .controller('ModalInstanceSpotify',["$scope","$uibModalInstance","item", 'Spotify','$http', function ($scope, $uibModalInstance,  item, Spotify,$http) {

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
$scope.volumen;
var access_token;         // Tocken para acceder a Spotify


console.log("ModalInstanceSpotify" );
console.log(item );
console.log($uibModalInstance );
console.log($ctrl );
var spotifyUserId=null;   // Spotify User ID
// this.volumen=50;       Volumen;



this.setTracksformItem=function(item){
  if(item){
  self.tracks=item.tracks;
  $scope.mVolumen=item.volumen;
  self.tracks.duracion=item.duracion;
};
};

this.setTracksformItem(item);

  this.ok = function () {
     console.log("uibModalInstance.ok: " );
    $uibModalInstance.close($ctrl.itemq);
  };

  $ctrl.cancel = function () {
     console.log("uibModalInstance.cancel: " );
    $uibModalInstance.dismiss('cancel');
  }

//Loggin a Spotify
console.log('Loggin a Spotify 4');
      Spotify.login().then(function (data) {
        console.log('Loggin a Spotify 4');
        access_token=data;
        console.log(data);
        // alert("You are now logged in");
        self.getSpotifyUser();
});


// get Spotify User

this.getSpotifyUser=function(){
Spotify.getCurrentUser().then(function (data) {
  console.log("getSpotifyUser");
  console.log(data);
  self.spotifyUserId=data.data.id;
self.getUserProfile();
  // Spotify.getUser(data.data.id).then(function (data) {
  //   console.log("getUser");
  //   console.log(data);
  // });

  });

};


$scope.mOption="MisListas"; // opcion de busqueda en modal_spotify

$ctrl.buscar=function(buscarTexto){
   // search: function (q, type, options) {
    // Spotify.search(buscarTexto,"album,artist,track,playlist",{"limit":10}).then(function(data){
    // Spotify.search(buscarTexto,"album",{"limit":10}).then(function(data){


  switch($scope.mOption){
//buscar UserPlay List
    case 'MisListas':
      Spotify.getUserPlaylists(self.spotifyUserId,{"limit":10}).then(function(data){
      console.log("search ok");
      var dataObj= angular.fromJson(data);
      // console.log("href "+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });
    break;

//buscar Artista
    case 'Artista':
  Spotify.search(buscarTexto,"artist",{"limit":10}).then(function(data){
      console.log("search ok");
      var dataObj= angular.fromJson(data);
      // console.log("href "+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });
    break;


//buscar Album
    case 'Album':
      Spotify.search(buscarTexto,"album",{"limit":10}).then(function(data){
      console.log("search ok");
      var dataObj= angular.fromJson(data);
      // console.log("href "+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });

    break;

//buscar Track
    case 'Track':
     Spotify.search(buscarTexto,"track",{"limit":10}).then(function(data){
      console.log("search ok");
      var dataObj= angular.fromJson(data);
      // console.log("href "+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });
    break;

//buscar PlayList
    case 'PlayList':
     Spotify.search(buscarTexto,"playlist",{"limit":10}).then(function(data){
      console.log("search ok");
      var dataObj= angular.fromJson(data);
      // console.log("href "+dataObj.data.albums.items[0].name);
      console.log(dataObj);
        self.setResult(angular.fromJson(data));
      }, function (error) {
      console.log('search an error occurred', error.data);
      });
    break;
  };


};



// Coloca en items el resultado de las busquedas para mostrar las canciones. Es el listado de albums, Artistas, misListas o Listas Publicas.
// En caso de buscar tracks, carga el resultado directamente en this.tracks.
this.setResult=function(data){
 console.log("setResult"+ data);
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
  };

};

// Busca los tracks de un album y calcula su duracion

this.buscarAlbumTracks=function(albumId){
  self.clearTracks();
  // $scope.tracks=[];
  console.log('buscarAlbumTracks');
  Spotify.getAlbumTracks(albumId).then(function (data) {
  console.log(data);
  self.tracks=data.data.items;
  var duracion=0;
    for(var i = 0; i<data.data.items.length; i++ ) {
    var track=data.data.items[i];
    duracion+=track.duration_ms;
  };
  self.tracks.duracionTotal_ms=duracion;
  console.log("tracks ");
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
        "artist": track.artists[0].name,
        "trackId":track.id,
        "name": track.name,
        "duration_ms":track.duration_ms,
        "uri":track.uri};
      duracion+=track.duration_ms;
      self.tracks=self.tracks.concat(t);
      };
    self.tracks.duracionTotal_ms=duracion;
    console.log("tracks ");
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
        "artist": track.artists[0].name,
        "trackId":track.id,
        "name": track.name,
        "duration_ms":track.duration_ms,
        "uri":track.uri};
        duracion+=track.duration_ms;
        self.tracks=self.tracks.concat(t);
      };
    self.tracks.duracionTotal_ms=duracion;
    console.log("tracks ");
    console.log(self.tracks);
  });
};

// Coloca en el objet Tracks los tracks resultados de las busquedas.
// de este modo se unifica el las propiedades para que se puedan listar con el mismo nombre.

this.setTracks=function(data){
  self.clearTracks();
  //set Tracks
 console.log(" set tracks ");
 console.log(data);
var duracion=0;
    for(var i = 0; i<data.length; i++ ) {
    var track=data[i];

   var t={
    "artist": track.artists[0].name,
    "trackId":track.id,
    "name": track.name,
    "duration_ms":track.duration_ms,
    "uri":track.uri};
    duracion+=track.duration_ms;

self.tracks=self.tracks.concat(t);


  };
self.tracks.duracionTotal_ms=duracion;
 console.log("tracks ");
 console.log(self.tracks);

};

// Limplia la Tracks para que puedan mostrarse nuevos resultados.

this.clearTracks=function(){
   console.log("clearTracks: ");
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
  var result = hours + ":" + minutes + ":" + seconds;

  return result;

};


// determina con que función se buscan los tracks mirando que opción se eligió para realizar la busqueda.

this.buscarTracks=function(ownerId,id){
 console.log("setResult: "+ id);

 console.log("ownerId: "+ ownerId);


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

//buscar Track
    case 'Track':
      this.items=data.data.tracks.items;
    break;

//buscar PlayList
    case 'PlayList':
            self.buscarPlayListTracks(ownerId,id);
    break;
  };

};

// Modifica el volumen con el que se está repoduciendo en spotify

this.setVolumen=function(volumen){
  $scope.mVolumen=volumen;
  console.log('volumen' +  $scope.mVolumen);
var reqVolumen = {
 method: 'put',
 url: 'https://api.spotify.com/v1/me/player/volume?volume_percent='+volumen,
 headers: {
   "Accept": "application/json",
    "Content-Type": "application/json"
    }
};
reqVolumen.headers.Authorization="Bearer " +access_token;
  $http(reqVolumen).then(function (response) {
    console.log('all is good', response.data);
}, function (error) {
    console.log('an error occurred', error.data);
});
};

//Marca o libera todos los tracks que se muestran.

this.selectAllTracks=function(select){
  console.log("selectAllTracks "+select);
  var duracion=0;
  for(var i = 0; i<self.tracks.length; i++ ) {
    console.log("self.tracks.duracionTotal_ms "+self.tracks.duracionTotal_ms);
    console.log("self.tracks[i].duration_ms "+self.tracks[i].duration_ms);
    duracion=duracion+self.tracks[i].duration_ms;
    self.tracks[i].selected=select;
  };
  self.tracks.duracionTotal_ms=duracion;
  if(!select){
    self.tracks.duracionTotal_ms=0;
  };

  console.log("self.tracks.duracionTotal_ms "+self.tracks.duracionTotal_ms);
  self.setItemq();
};

//Marca o libera un track para ser sumarlo a la lista de canciones que se van a reproducir

this.selectTracks=function(id,select){
  console.log("selectTracks "+select);
  console.log("selectTracks "+id);
  self.tracks[id].selected=select;
  console.log("self.tracks.duracionTotal_ms "+self.tracks.duracionTotal_ms);
  if(select){
    self.tracks.duracionTotal_ms=self.tracks.duracionTotal_ms+self.tracks[id].duration_ms;
    console.log("self.tracks[id].duration_ms"+self.tracks[id].duration_ms);
    }
    else{
    self.tracks.duracionTotal_ms=self.tracks.duracionTotal_ms-self.tracks[id].duration_ms;
    console.log("self.tracks[id].duration_ms "+self.tracks[id].duration_ms);
    }
    console.log("self.tracks.duracionTotal_ms "+self.tracks.duracionTotal_ms);
    self.setItemq();
};

// Set de Itemq que contiene los valores que retorna cuando se aprieta ok
this.setItemq=function(){
  self.itemq.tracks=self.tracks;
  self.itemq.duracion=self.tracks.duracionTotal_ms;
  self.itemq.numeroTracks=self.tracks.length;
  $scope.okdisponible=true;
  self.itemq.volumen=$scope.mVolumen;
};


$ctrl.playAlbum=function(albumUri){

  var req = {
  method: 'put',

  url: 'https://api.spotify.com/v1/me/player/play',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
    // "Accept-Encoding":"gzip, deflate, compress"
  },
  data: {
    "context_uri": albumUri,
    "offset": {
    "position": 0}
  }};

  console.log('albumUri', albumUri);
  console.log('access_token', access_token);
  console.log('itemActual', self.itemActual);
  req.headers.Authorization="Bearer " +access_token;
  $http(req).then(function (response) {
    console.log('playAlbum', response.data);
    console.log(response);
  }, function (error) {
    console.log('playAlbum an error occurred', error.data);
  });
};


this.playSong=function(songUri){
  console.log("playSong");
  console.log(songUri);
  var req = {
    method: 'put',
    // url: 'https://api.spotify.com/v1/me/player/play&device_id=c565f68c8ac24d000809da8f41c839cf68003510',
     url: 'https://api.spotify.com/v1/me/player/play',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
        // "Accept-Encoding":"gzip, deflate, compress"
      },
    data: {
     // "context_uri": songUri,
    "uris":[songUri],
    "offset": {
    "position": 0
    }}
  };
  req.headers.Authorization="Bearer " +access_token;
  $http(req).then(function (response) {
    console.log('playAlbum', response.data);
  }, function (error) {
    console.log('playAlbum an error occurred', error.data);
  });
};


this.getUserProfile=function(){
  console.log("getUserProfile");
  // console.log(songUri);
  var req = {
    method: 'put',

     url: 'https://api.spotify.com/v1/me',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
        // "Accept-Encoding":"gzip, deflate, compress"
      }
      // ,
    // data: {
     // "context_uri": songUri,
    // "uris":[songUri],
    // "offset": {
    // "position": 0
    // }
  // }
  };
  req.headers.Authorization="Bearer " +access_token;
  $http(req).then(function (response) {
    console.log('playAlbum', response.data);
  }, function (error) {
    console.log('playAlbum an error occurred', error.data);
  });
};

}]);

