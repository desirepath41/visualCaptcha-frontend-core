/*global define */

define( function( require ) {
    'use strict';

    var core = require( 'visualcaptcha/core' ),
        config = require( 'visualcaptcha/config' );

    return function( options ) {
        options = options || {};

        return core( config( options ) );
    };
} );