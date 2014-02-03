/*global require, define */

if ( typeof require === 'function' && require.config ) {
    require.config( {
        baseUrl: '../src',
        paths: {
            'visualcaptcha': './visualcaptcha'
        }
    } );

    if ( location.href.indexOf( '-dist' ) !== -1 ) {
        require.config( {
            paths: {
                'visualcaptcha': '../dist/visualcaptcha'
            }
        } );
    }
}

(function( root, factory ) {
    'use strict';

    if ( typeof define === 'function' && define.amd ) {
        define([ 'visualcaptcha' ], factory );
    } else {
        factory( root.visualCaptcha );
    }
}( this, function( visualCaptcha ) {
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
        var captcha = visualCaptcha( {
            autoRefresh: false
        } );

        expect( 15 );

        equal( typeof captcha === 'object', true );

        equal( typeof captcha.refresh === 'function', true );
        equal( typeof captcha.isLoading === 'function', true );
        equal( typeof captcha.hasLoaded === 'function', true );
        equal( typeof captcha.numberOfImages === 'function', true );
        equal( typeof captcha.imageName === 'function', true );
        equal( typeof captcha.imageValue === 'function', true );
        equal( typeof captcha.imageUrl === 'function', true );
        equal( typeof captcha.audioUrl === 'function', true );
        equal( typeof captcha.imageFieldName === 'function', true );
        equal( typeof captcha.audioFieldName === 'function', true );
        equal( typeof captcha.namespace === 'function', true );
        equal( typeof captcha.namespaceFieldName === 'function', true );
        equal( typeof captcha.isRetina === 'function', true );
        equal( typeof captcha.supportsAudio === 'function', true );
    } );

    asyncTest( 'check loading and loaded callbacks', function() {
        var _loading,
            _loaded;

        expect( 6 );

        _loading = function( captcha ) {
            // Should be loading and not loaded
            equal( captcha.isLoading(), true );
            notEqual( captcha.hasLoaded(), true );
        };

        _loaded = function( captcha ) {
            // Should be loaded and not loading
            equal( captcha.isLoading(), false );
            notEqual( captcha.hasLoaded(), false );
            start();
        };

        var captcha = visualCaptcha( {
            autoRefresh: false,
            callbacks: {
                loading: _loading,
                loaded: _loaded
            }
        } );

        // Shouldn't be loading or loaded
        equal( captcha.isLoading(), false );
        equal( captcha.hasLoaded(), false );

        captcha.refresh();
    } );

    asyncTest( 'numberOfImages must match', function() {
        var _loaded;

        expect( 1 );

        _loaded = function( captcha ) {
            equal( captcha.numberOfImages(), 7 );
            start();
        };

        visualCaptcha( {
            numberOfImages: 7,
            callbacks: { loaded: _loaded }
        } );
    } );

    asyncTest( 'imageName should be present', function() {
        var _loaded;

        expect( 1 );

        _loaded = function( captcha ) {
            notEqual( captcha.imageName(), '' );
            start();
        };

        visualCaptcha( {
            callbacks: { loaded: _loaded }
        } );
    } );

    asyncTest( 'imageValue should be present', function() {
        var _loaded;

        expect( 2 );

        _loaded = function( captcha ) {
            notEqual( captcha.imageValue( 0 ), '' );
            equal( captcha.imageValue( 1 ), '' );
            start();
        };

        visualCaptcha( {
            numberOfImages: 1,
            callbacks: { loaded: _loaded }
        } );
    } );

    asyncTest( 'imageUrl should be present', function() {
        var _loaded;

        expect( 2 );

        _loaded = function( captcha ) {
            notEqual( captcha.imageUrl( 0 ), '' );
            equal( captcha.imageUrl( 1 ), '' );
            start();
        };

        visualCaptcha( {
            numberOfImages: 1,
            callbacks: { loaded: _loaded }
        } );
    } );

    asyncTest( 'audioUrl should be present', function() {
        var _loaded;

        expect( 2 );

        _loaded = function( captcha ) {
            notEqual( captcha.audioUrl( false ), '' );
            notEqual( captcha.audioUrl( true ), '' );
            start();
        };

        visualCaptcha( {
            callbacks: { loaded: _loaded }
        } );
    } );

    asyncTest( 'imageFieldName should be present', function() {
        var _loaded;

        expect( 1 );

        _loaded = function( captcha ) {
            notEqual( captcha.imageFieldName(), '' );
            start();
        };

        visualCaptcha( {
            callbacks: { loaded: _loaded }
        } );
    } );

    asyncTest( 'audioFieldName should be present', function() {
        var _loaded;

        expect( 1 );

        _loaded = function( captcha ) {
            notEqual( captcha.audioFieldName(), '' );
            start();
        };

        visualCaptcha( {
            callbacks: { loaded: _loaded }
        } );
    } );

    asyncTest( 'create a dummy request function', function() {
        var _request,
            _loaded;

        expect( 2 );

        _request = function( url, callback ) {
            ok( 'request called' );
            callback( { audioFieldName: 'hello moto' } );
        };

        _loaded = function( captcha ) {
            equal( captcha.audioFieldName(), 'hello moto' );
            start();
        };

        visualCaptcha( {
            request: _request,
            callbacks: { loaded: _loaded }
        } );
    } );
} ));