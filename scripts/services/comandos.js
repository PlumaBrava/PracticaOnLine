'use strict';

/**
 * @ngdoc service
 * @name practicaApp.comandos
 * @description
 * # comandos
 * Service in the practicaApp.
 */
angular.module('practicaApp')
   .service('comandos',['$localStorage', '$interval','Spotify','$http',function (localStorage,interval, Spotify,$http)  {


    var self=this;
    this.modelAsJson;
    // this.user;
    // this.empresaKey;
    // this.empresa;

//     var access_token;         // Tocken para acceder a Spotify

  this.setModelAsJason=function(model){
         console.log('console-setModelAsJason ');
         // console.log(model);
        localStorage.modelAsJson=model;
        self.modelAsJson=model;
    };

      this.getModelAsJason=function(){
        // console.log('getModelAsJason');
        // console.log(localStorage.modelAsJson);
      return   localStorage.modelAsJson;
    };


// this.indice= new Array();
// this.valoresGlobal;
// this.arr={};
// this.execute=function(){
//      console.log('execute ');
//      // this.indice.push(0);
//      // this.play(JSON.parse(this.getModelAsJason()),0);
//      // this.valoresGlobal=JSON.parse(this.getModelAsJason());
//     // this.listaPropiedades(JSON.parse(this.getModelAsJason(),0));
//     self.leerJsonToArray(JSON.parse(this.getModelAsJason()));
//     self.ejecturarSerie(self.arr[0]);
//     // self.ejecutar(self.arr[0]);
//     // self.ejecutaSiguiente(0);
// };

// this.leerJsonToArray=function(obj){
//      self.arr = Object.keys(obj).map(function(k) { return obj[k] })
// };

// this.play=function(valores){
//      console.log('play');
//       console.log(valores);

//       return new Promise(function (fulfill, reject){

//       if(valores==null){
//           alert('Sin datos para ejecutar')
//       }
//       else{
//             switch (valores.type){

//             case 'tick':
//             console.log('case tick');
//             self.startTick(valores.intervalo_ms,valores.duracion).then(function(obj){
//               console.log('Play-Retorno Promesa Tick');
//               console.log(obj);
//             fulfill({ value: 'Retorno Promesa Tick', result: 'Retorno Promesa Tick result' });

//             }).catch(function(error){
//               console.log('Play-error tick');
//               console.log(error);
//             });
//             break;

//             case 'leer':
//             console.log('case leer');
//             self.leer(valores.texto).then(function(obj){
//               console.log('Play-Retorno Promesa leer');
//               console.log(obj);
//             fulfill({ value: 'Retorno Promesa Tick', result: 'Retorno Promesa Tick result' });

//             }).catch(function(error){
//               console.log('Play-error leer');
//               console.log(error);
//             });
//             break;

//              case 'imagen':
//             console.log('case imagen');
//             self.imagen(valores).then(function(obj){
//               console.log('Play-Retorno Promesa imagen');
//               console.log(obj);
//             fulfill({ value: 'Retorno Promesa imagen', result: 'Retorno Promesa imagen result' });

//             }).catch(function(error){
//               console.log('Play-error imagen');
//               console.log(error);
//             });
//             break;

//             case 'spotify':
//             console.log('case Spotify');
//             // self.playSong(valores.tracks[0].uri).then(function(obj){
//             self.playSongArray(valores.tracks).then(function(obj){
//               console.log('Play -Retorno Promesa Spotify');
//               console.log(obj);
//             fulfill({ value: 'Retorno Promesa Spotify', result: 'Retorno Promesa Spotify result' });

//             }).catch(function(error){
//               console.log('Play- error Spotify');
//               console.log(error);
//             reject({ value: 'Retorno Promesa Spotify Errror', result: 'Retorno Promesa Spotify error' });

//             });
//             break;

//             case 'bloque':
//             console.log('case bloque');

//                self.ejecturarParalelo(valores.columns[0]).then(function(obj){
//                 console.log('Retorno Promesa bloque');
//                 console.log(obj);
//                  fulfill({ value: 'Retorno Promesa bloque', result: 'Retorno Promesa bloque result ok' });

//             }).catch(function(error){
//               console.log('Retorno promesa de bloque');
//               console.log(error);
//               reject({ value: 'Retorno Promesa bloque error', result: 'Retorno Promesa bloque result error' });
//             });
//             break;

//             case 'container':
//             console.log('case container');
//             console.log(valores);
//             self.ejecturarSerie(valores.columns[0]).then(function(obj){
//                 console.log('Retorno Promesa container');
//                 console.log(obj);
//                  fulfill({ value: 'Retorno Promesa container', result: 'Retorno Promesa container result' });

//             }).catch(function(error){
//               console.log('error container');
//               console.log(error);
//             }
//               );
//             break;


//             default:
//            console.log('default');
//                  fulfill({ value: 'Retorno Promesa default', result: 'Retorno Promesa default result' });

//         };//fin del switch


//         };//fin del else
//         });// fin del return de la promesa
// };


//   this.executeArray=[];
// // for (let i=0; i <4; i++) {
// //    this.executeArray.push([]);
// // }
// // this.indiceNivel=0
// // this.indiceEjecucion=[0];
// // this.bloque=[];
// // this.indiceBloques=[0];


// // this.paralelos=[];
// // this.arrBackup=[];

// this.ejecturarSerie=function(actividades){

//   console.log('ejecturarSerie');
//   console.log(actividades);

// return new Promise(function (resolve, reject){
//     console.log('Construccion de la promesa ejecturarSerie');



//   actividades.reduce(
//     function (sequence, value) {
//        console.log('reduce');
//        console.log(value);

//         return sequence.then(function() {

//             return self.play(value);

//         }).then(function(obj) {
//             console.log('END execution with value =', obj.value,
//                         'and result =', obj.result);
//         }).catch(function(obj){
//            console.log('END execution with value error =', obj.value,
//                         'and result =', obj.result);
//         });
//     },
//     Promise.resolve()
//   ).then(function() {
//     console.log('COMPLETED ejecucion serie');
//        resolve({ value: 'fin EjecuionSerie', result: 'fin EjecuionSerie'});
//     });
//   });
// };



// this.ejecturarParalelo=function(actividades){

//   console.log('ejecturarParalelo');
//   console.log(actividades);

// return new Promise(function (resolve, reject){
//     console.log('Construccion de la promesa ejecturarParalelo');

// var p = [];
// for (var n = 0; n < actividades.length; n++) {
//     p.push(self.play(actividades[n]));
// }

//     console.log(p);
//    Promise.all(p)
//         .then(function(obj) {
//           console.log(obj);
//             console.log('END ejecturarParalelo with value =', obj.value,
//                         'and result =', obj.result);
//             console.log(obj);
//             resolve({ value: 'fin ejecturarParalelo', result: 'fin EjecuionParalelo, se cumpleron tadas'});
//         })
//         .catch(function(obj){
//            console.log('END ejecturarParalelo with value error  =', obj.value,
//                         'and result =', obj.result);
//           reject({ value: 'fin ejecturarParalelo ith value error', result: 'fin EjecuionParalelo, fallo alguna promesa'});
//         });


// });
// };


// this.ejecutar=function(obj){

//  console.log('ejecutar:');
//       console.log(obj);
//             console.log(this.arr[0]);
//       // this.indiceNivel = level || 0;

//        console.log('length: '+this.arr[0].length);
//       console.log('indiceNivel: '+this.indiceNivel);
//        console.log('indiceEjecucion: '+this.indiceEjecucion[this.indiceNivel]);


//       if (this.indiceEjecucion[this.indiceNivel]<this.arr[0].length){
//             console.log(this.arr[0][this.indiceEjecucion[this.indiceNivel]]);
//             console.log(this.arr[0][this.indiceEjecucion[this.indiceNivel]].type);
//         if(  this.arr[0][this.indiceEjecucion[this.indiceNivel]].type=='container'){
//           self.arrBackup[this.indiceNivel]=obj;
//           self.indiceNivel++;
//           self.indiceEjecucion[self.indiceNivel]=0;
//           self.ejecutar(obj.columns[0]);
//         }else{
//         self.play(this.arr[0][this.indiceEjecucion[this.indiceNivel]]);
//         // self.nextItemRaiz()
//         };


//     };
// };







// // Tick

// this.startTick=function(timeMs,duracion){
//   console.log('startTick: '+timeMs);
//   self.tick=interval( self.playTick,timeMs);
//   console.log(self.tick);
// return new Promise(function (resolve, reject){
//     console.log('Construccion de la promesa Tick');
//     setTimeout(function() {
//             self.stopTick();
//             console.log('Resolve ok Tick: '+ duracion);
//             resolve({ value: 'fin tick', result: duracion});
//         }, duracion);
//     });

// };

// this.stopTick=function(){
//   console.log('stopTick');
//   console.log('Tick angular.isDefined(self.tick): '+angular.isDefined(self.tick));
//   // console.log('angular.isDefined(self.StopTick):'+angular.isDefined(self.StopTick));
//   // if (angular.isDefined(self.tick) && angular.isDefined(self.StopTick)) {
//   if (angular.isDefined(self.tick) ) {
//             interval.cancel(self.tick);
//             // interval.cancel(self.stopTick);
//             // stop = undefined;
//           }

// };

// this.playTick=function(){

//    // console.log('tick-HOWL6');
//    // console.log('mp3 codecs ogg: '+  Howler.codecs('mp3'));

//    Howler.mobileAutoEnable = true;

//     var sound = new Howl({
//       src: ['/audio/flap.mp3'],
//       format: ['mp3'],
//       html5: true

//     });



//     // Clear listener after first call.
//   sound.once('load', function(){
//         // console.log('once..load');
//         // console.log(sound);
//     sound.play();
//   });

// // Fires when the sound finishes playing.
//     sound.on('end', function(){
//       console.log('Finished!');
//       sound.unload();
//     });



// };


// // Leer


// this.leer=function(texto){

// if ('speechSynthesis' in window) {
//  // Synthesis support. Make your web apps talk!
//  console.log('Synthesis support. Make your web apps talk!');
// }

// if ('SpeechRecognition' in window) {
//   // Speech recognition support. Talk to your apps!
//   console.log(' Speech recognition support. Talk to your apps!');
// }

//  var msg = new SpeechSynthesisUtterance(texto);
// // wait on voices to be loaded before fetching list
// window.speechSynthesis.onvoiceschanged = function() {
//       var voices = window.speechSynthesis.getVoices();
//     console.log('voices');
//     console.log(voices);


//   msg.voice= voices.filter(function(voice) { return voice.name == 'Google español'; })[0];;

//   console.log('texto: '+texto);

//   console.log(msg);
//   console.log(window.speechSynthesis);


// };

//  window.speechSynthesis.speak(msg);



//   return new Promise(function (resolve, reject){
//      console.log('Construccion de la promesa');
//         msg.addEventListener('end', function(e) {
//         console.log('lectura completa: evento'+e.toString());
//         resolve({ value: 'fin Leer ok', result: texto});

//     });
//             msg.addEventListener('offline', function(e) {
//         console.log('lectura offline: evento'+e.toString());
//       reject({ value: 'Leer offline', result: texto});

//     });
//                 // msg.addEventListener('error', function(e)
// msg.onError=function(e)
//                  {
//         console.log('Lectura error: '+e.toString());
//         reject({ value: 'fin Leer error', result: e});

//     };
//   });

//   // msg.addEventListener('end', function(e) {
//   //       console.log('voices end:'+e.toString());
//   //       self.next();
//   //       // window.setTimeout(() => {
//   //       //     speak(list.slice(1));
//   //       });

// };


// //Imagen

// this.imagen=function(link){


//   return new Promise(function (resolve, reject){

//       console.log('Construccion de la promesa Imagen');
//       if(link){
//           console.log('imagen link no nulo');
//           resolve({ value: 'fin Leer ok', result: link});
//       }else {
//         console.log('imagen link  nulo')
//         reject({ value: 'imagen link nulo', result: link});

//       };
//     });
//   };




// // Spotify
// this.playSongArray=function(array){

//   console.log('playSongArray');
//   console.log(array);
//   return new Promise(function (res, rej){
//     console.log('Construccion de la promesa playSongArray');
//   //   setTimeout(function() {
//   //           self.stopTick();
//   //           resolve({ value: 'fin tick', result: duracion});
//   //       }, duracion);


//   array.reduce(
//     function (sequence, value) {
//        console.log('playSongArray reduce');
//        console.log(value);

//         return sequence.then(function() {

//             return self.playSong(value);

//         }).then(function(obj) {
//             console.log('playSongArray END  execution ok with value =', obj.value,
//                         'and result =', obj.result);
//         }).catch(function(obj){
//            console.log('playSongArray END  error execution with value error =', obj.value,
//                         'and result =', obj.result);
//           console.log(obj);
//         });
//     },
//     Promise.resolve()
//   ).then(function() {
//     console.log('playSongArray res COMPLETED ejecucion serie');
//        res({ value: 'playSongArray fin EjecuionSerie', result: 'fin EjecuionSerie'});
//     }).catch(function(obj){
//            console.log('playSongArray END  error execution with value error =', obj.value+
//                         'and result =', obj.result);
//       rej({ value: 'playSongArray fin EjecuionSerie', result: 'fin EjecuionSerie'});
//       });
//   });
//    };






// this.playSong=function(song){
//   console.log('playSong');
//   console.log(song);

//   return new Promise(function (resolve, reject){
//     console.log('Construccion de la promesa playSong');
//     self.getAccessTocken().then(function(data){
//       console.log('playSong retorno de getAccessTocken');
//       console.log(data);
//       self.access_token=data.result;
//       console.log('playSong access_token');

//       console.log(self.access_token);

//       var req = {
//         method: 'put',
//         // url: 'https://api.spotify.com/v1/me/player/play&device_id=c565f68c8ac24d000809da8f41c839cf68003510',
//         url: 'https://api.spotify.com/v1/me/player/play',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//             // 'Accept-Encoding':'gzip, deflate, compress'
//           },
//         data: {
//         // 'context_uri': songUri,
//         'uris':[song.uri],
//         'offset': {
//         'position': 0
//         }}
//       };
//       req.headers.Authorization='Bearer ' +self.access_token;
//       console.log('playSong construye http req');
//       $http(req).then(function (response) {
//         console.log('PlaySong Respuesta', response.data);
//         console.log(response);

//         console.log('PlaySong name: '+song.name);
//         console.log('PlaySong duration: '+song.duration_ms);

//         setTimeout(function() {
//         console.log('PlaySong  setTimeout: ' + song.duration_ms);
//             resolve({ value: 'PlaySong tiempo cumplido', result:song.duration_ms});

//         }, song.duration_ms);



//         }).catch( function (error) {
//           console.log('PlaySong  http(req) an error occurred', error.data);
//           reject({ value: 'PlaySong Respuesta de la Promesa error', result: error.data});
//       });

// }).catch(function(error){
//   console.log('Playa Song catch retorno de getAccessTocken con error');
//   console.log(error);
//   reject({ value: 'PlaySong Respuesta de la Promesa error', result: error.data});
//   });




//   });

// };


// //Loggin a Spotify

// this.getAccessTocken=function(){
//    console.log('getAccessTocken');
//    console.log(self.access_token);

// return new Promise(function (resolve, reject){
//     console.log('getAccessTocken Construccion Promesa');
//     console.log(self.access_token);
//       if (self.access_token){
//          console.log('getAccessTocken Tocekn existe');
//         resolve({ value: 'getAccessTocken Respuesta de la Promesa correcto tocken existente', result: self.access_token});
//       } else{
//         console.log('getAccessTocken else: access_token no existe');
//         console.log(Spotify);
//         Spotify.login().then(function (data) {
//               console.log('getAccessTocken exitoso');
//               self.access_token=data;
//               console.log(data);
//               resolve({ value: 'getAccessTocken Respuesta de la Promesa correcto consigue tocken', result: self.access_token});
//           }).catch(function(error){
//               console.log('getAccessTocken Tocekn error');
//               reject({ value: 'getAccessTocken Respuesta de la Promesa error', result: error});
//           });
//       };

//     });//fin de la promesa
// }; // fin de la funcion get AccessTocken


// Play Audio

this.playAudio=function(link){
  console.log('playAudio: '+link);
  console.log(link);
  // self.tick=interval( self.playTick,timeMs);
  // console.log(self.tick);
return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa playAudio');
    //  console.log('$scope.estado: '+$scope.estado);
    // if($scope.estado==ESTADO_STOP){
    //          console.log('$scope.estado: ESTADO_STOP'+$scope.estado);
    //     // self.stopTick();
    // }
    // else{


   Howler.mobileAutoEnable = true;

    var sound = new Howl({
      src: [link],
      format: ['mp3'],
      html5: true

    });



    // Clear listener after first call.
  sound.once('load', function(){
        console.log('playAudio..load');
        console.log(sound);
    sound.play();
  });

// Fires when the sound finishes playing.
    sound.on('end', function(){


            console.log('playAudio end: ');
            resolve({ value: 'playAudio', result: 'end playAudio'});
      sound.unload();
    });

    sound.on('error', function(){


            console.log('playAudio error: ');
            reject({ value: 'playAudioError', result: 'Error playAudio'});

    });

});


};


// Play Audio

this.duracionAudio=function(link){
  console.log('duracionAudio: '+link);
  console.log(link);

return new Promise(function (resolve, reject){
    console.log('Construccion de la promesa duracionAudio');

   Howler.mobileAutoEnable = true;

    var sound = new Howl({
      src: [link],
      format: ['mp3'],
      html5: true

    });



    // Clear listener after first call.
  sound.once('load', function(){
        console.log('duracion Audio..load');
        console.log(sound);
        console.log(sound._duration);
        resolve({ value: 'duracionAudioOK', result: sound._duration});
  });

  // sound.on('error', function(){


  //           console.log('duracionAudio error: ');
  //           reject({ value: 'duracionAudioError', result: 'Error duracionAudio'});

  //   });

});


};



  }]);

