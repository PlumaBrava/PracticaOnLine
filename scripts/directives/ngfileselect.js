'use strict';

/**
 * @ngdoc directive
 * @name practicaApp.directive:ngFileSelect
 * @description
 * # ngFileSelect
 */
angular.module('practicaApp')
 .directive('ngFileSelect', function () {

return {
    link: function($scope,el){

      el.bind('change', function(e){
        console.log('ngFileSelect');
        console.log(e);
        console.log($scope);
        $scope.file = (e.srcElement || e.target).files[0];
        try{
          console.log('try');
          var tmppath = URL.createObjectURL(e.target.files[0]);
          console.log(tmppath);
          $scope.$apply(function () {
            $scope.path = (tmppath);
          });
        }catch(err){
          console.log('catch al buscar URL de archivo nulo');
          console.log(err);
          $scope.$apply(function () {
            $scope.path = null;
          });
        }

        $scope.getFile();
      });

    }

  };


  });

