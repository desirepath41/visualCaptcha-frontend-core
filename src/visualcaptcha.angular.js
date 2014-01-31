/*global define */

define( [
    'angular',
    'visualcaptcha.vanilla'
], function( angular, visualCaptcha ) {
    'use strict';

    angular
        .module( 'visualCaptcha', [] )
        .directive( 'captcha', function() {
            return {
                restrict: 'E',
                scope: {
                    'options': '='
                },
                link: function( scope, element ) {
                    visualCaptcha( element[ 0 ], scope.options );
                },
                template: '<div></div>',
                replace: true
            };
        } );
} );
