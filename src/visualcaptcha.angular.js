/*global define */

define( [
    'angular',
    'visualcaptcha.vanilla',
    'visualcaptcha/deep-extend'
], function( angular, visualCaptcha, deepExtend ) {
    'use strict';

    angular
        .module( 'visualCaptcha', [] )
        .directive( 'captcha', [ '$http', function( $http ) {
            var _request = function( url, callback ) {
                $http({
                    method: 'GET',
                    url: url,
                    withCredentials: true
                }).success( callback );
            };
            return {
                restrict: 'A',
                scope: {
                    'options': '='
                },
                link: function( scope, element ) {
                    visualCaptcha( element[ 0 ], deepExtend( scope.options, {
                        captcha: {
                            request: _request
                        }
                    } ) );
                }
            };
        }] );
} );
