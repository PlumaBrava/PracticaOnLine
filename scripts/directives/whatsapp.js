'use strict';

/**
 * @ngdoc directive
 * @name practicaApp.directive:whatsApp
 * @description
 * # whatsApp
 */
angular.module('practicaApp')
  // .directive('whatsApp', function () {
  //   return {
  //     template: '<div></div>',
  //     restrict: 'E',
  //     link: function postLink(scope, element, attrs) {
  //       element.text('this is the whatsApp directive');
  //     }
  //   };
  // });
 .directive('whatsApp', function (){
    return{
        link: function (scope, elem, $attr){
            elem.on('click', function (){
                var text = $attr.text;
                var url = $attr.whatsApp;
                var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
                console.log(message);
                var whatsapp_url = "whatsapp://send?text=" + message;
                window.location.href = whatsapp_url;

            });
        }
    }
});