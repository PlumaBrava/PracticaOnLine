'use strict';

/**
 * @ngdoc function
 * @name practicaApp.controller:SoptifycallbackCtrl
 * @description
 * # SoptifycallbackCtrl
 * Controller of the practicaApp
 */
angular.module('practicaApp')
.config(['SpotifyProvider',function (SpotifyProvider) {
     console.log("Spotify config");
     console.log(SpotifyProvider);


/*
    Configuracion de Spotify para respnder a consultas.

    1) configuración de Console de Spotify

     https://developer.spotify.com/my-applications/  (console de Spotify)

     Website : de donde nos conectamos para solicitar información
          desarrollo:http://localhost:9000/#!/productos
          web: www.mabecar.com

    Redirect URIs: a donde dirige el callback con el token para poder acceder a Spotiy
          desarrollo:http://localhost:9000/#!/spotifycallback/
          web: http://mabecar.com/#!/spotifycallback/

    2) configurar Spotfy provider para hacer las solicitudes a la Spotify

      SetRedirectUri()
         desarrollo: SpotifyProvider.setRedirectUri('http://localhost:9000/#!/spotifycallback/');
         web: SpotifyProvider.setRedirectUri('http://mabecar.com/#!/spotifycallback/');

      SetClientId() Colocar el cliente que se obtiene de console.
      setScope    Se especifica que información estaremos solicitando.

*/



  SpotifyProvider.setClientId('3e2c31f33d594af695b1edcbe39a3e40');
  // SpotifyProvider.setRedirectUri('http://mabecar.com/#!/spotifycallback/');
  SpotifyProvider.setRedirectUri('http://localhost:9000/#!/spotifycallback/');
  // SpotifyProvider.setScope('user-modify-playback-state user-read-private playlist-read-private playlist-modify-private playlist-modify-publicuser-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // SpotifyProvider.setScope('user-modify-playback-state');
  SpotifyProvider.setScope('user-read-email streaming user-modify-playback-state user-read-playback-state user-read-recently-played playlist-read-private user-read-private user-read-email user-read-birthdate');


  // If you already have an auth token
  // SpotifyProvider.setAuthToken('BQAQibVONBSdf0DUumNBDN96x0rnypUGwFs2PMviXcbQYIk_1lAIJq5IhV7pMC1NVTDVhORVXIO_Dc_UbfeAkY5eck0HLHDWVzRhVnd46KaZlYjKlPFeNmGWLXOqt_YXjGCP54Q9i0P1sv-qBN0sgRsY2s6nzkbjX2mZ5yz-CJ-aSi6RdZ9RO_zcsuhemIgViBH5vV1F7w7WXCGnSv8r110cTkEUHCcMkDUGtk3-OmMPX3MZlzBIJu-Aq8c8msvi_3sIjIQwfSKzLkG5UOtQxL');
  // SpotifyProvider.setAuthToken('b8a31ca85006417a824e6c5a2b04552c');
  console.log(SpotifyProvider);
}])
  .controller('SpotifycallbackCtrl',['$stateParams', '$state','$location', function (stateParams, state,location) {
    console.log(" Spotify callback");
    console.log(" stateParams");
    this.access_token=stateParams.access_token;
    this.expires_in=stateParams.expires_in;
    this.token_type=stateParams.token_type;
    console.log(stateParams);
    console.log(" state");
    console.log(state.current.name);
    console.log("location");
    console.log(location.path());


    this.error="";
    var self=this;



    window.onload = function () {
        var hash = window.location.hash;
        console.log("hash "+hash);

      if (window.location.search.substring(1).indexOf("error") !== -1) {
        console.log("ERROR en Sotify callback");
        $.allbackId.append('<p>'+error+'</p>');
        self.error="err";


      } else if (hash) {
        // login success
        self.tocken = window.location.hash.split('&')[0].split('=')[1];
        // $.callbackId.append('<p>'+tocken+'</p>');


        localStorage.setItem('spotify-token', self.tocken);
        window.close();
      }
    }
  }]);
