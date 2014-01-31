/*global require, define */

if ( typeof require === 'function' && require.config ) {
    require.config( {
        baseUrl: '../src',
        paths: {
            'jquery': '../libs/jquery/jquery.min',
            'visualcaptcha.jquery': './visualcaptcha.jquery'
        }
    } );

    if ( location.href.indexOf( '-dist' ) !== -1 ) {
        require.config( {
            paths: {
                'jquery': '../libs/jquery/jquery.min',
                'visualcaptcha.jquery': '../dist/visualcaptcha.jquery'
            }
        } );
    }
}

(function( root, factory ) {
    'use strict';

    if ( typeof define === 'function' && define.amd ) {
        define([ 'jquery', 'visualcaptcha.jquery' ], factory );
    } else {
        factory( root.$ );
    }
}( this, function( $ ) {
    'use strict';

    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
       module(name, {[setup][ ,teardown]})
       test(name, callback)
       expect(numberOfAssertions)
       stop(increment)
       start(decrement)
     Test assertions:
       ok(value, [message])
       equal(actual, expected, [message])
       notEqual(actual, expected, [message])
       deepEqual(actual, expected, [message])
       notDeepEqual(actual, expected, [message])
       strictEqual(actual, expected, [message])
       notStrictEqual(actual, expected, [message])
       throws(block, [expected], [message])
    */

    test( 'validate functions', function() {
        expect( 2 );

        equal( typeof $.fn === 'object', true );

        equal( typeof $.fn.visualCaptcha === 'function', true );
    } );
} ));