/*global define */

define( [
    'jquery',
    'visualcaptcha',
    'visualcaptcha/templates',
    'visualcaptcha/language'
], function( $, visualCaptcha, templates, language ) {
    'use strict';

    var _request,
        _loading,
        _loaded,
        _toggleAccessibility,
        _chooseImage,
        _refreshCaptcha,
        _getCaptchaData;

    // Request function using jQuery's $.get
    _request = function( url, callback ) {
        $.get( url, callback, 'json' );
    };

    // callback on loading
    _loading = function() {};

    // callback on loaded
    _loaded = function( config, element, captcha ) {
        var captchaHTML;

        captchaHTML =
            // Add audio element, if supported
            templates.accessibility( captcha, config.language ) +
            // Add image elements
            templates.images( captcha, config.language ) +
            // Add refresh and accessibility buttons
            templates.buttons( captcha, config.language, config.imgPath );

        // Actually add the HTML
        element.html( captchaHTML );
    };

    // Toggle accessibility option
    _toggleAccessibility = function() {
        var captchaElement = $( this ).closest( '.visualCaptcha' ),
            accessibilityWrapper = captchaElement.find( '.visualCaptcha-accessibility-wrapper' ),
            possibilitiesWrapper = captchaElement.find( '.visualCaptcha-possibilities' ),
            explanation = captchaElement.find( '.visualCaptcha-explanation' ),
            audio = accessibilityWrapper.find( 'audio' ),
            audioInputHTML;

        if ( accessibilityWrapper.hasClass( 'visualCaptcha-hide' ) ) {
            // Hide images and explanation
            possibilitiesWrapper.toggleClass( 'visualCaptcha-hide' );
            explanation.toggleClass( 'visualCaptcha-hide' );

            // Reset selected images and input value
            possibilitiesWrapper.find( '.img' ).removeClass( 'visualCaptcha-selected' );
            explanation.find( 'input' ).val( '' );

            // Build the input HTML
            audioInputHTML = templates.audioInput( captchaElement.data( 'captcha' ) );

            // Add the input before the audio element
            $( audioInputHTML ).insertBefore( audio );

            // Show the accessibility wrapper
            accessibilityWrapper.toggleClass( 'visualCaptcha-hide' );

            // Play the audio
            audio[ 0 ].load();
            audio[ 0 ].play();
        } else {
            // Stop audio, delete input element, show images
            audio[ 0 ].pause();

            // Hide the accessibility wrapper
            accessibilityWrapper.toggleClass( 'visualCaptcha-hide' );

            // Delete the input element
            accessibilityWrapper.find( 'input' ).remove();

            // Show images and explanation
            explanation.toggleClass( 'visualCaptcha-hide' );
            possibilitiesWrapper.toggleClass( 'visualCaptcha-hide' );
        }
    };

    // Choose image
    _chooseImage = function() {
        var image = $( this ),
            captchaElement = image.closest( '.visualCaptcha' ),
            possibilitiesWrapper = captchaElement.find( '.visualCaptcha-possibilities' ),
            explanation = captchaElement.find( '.visualCaptcha-explanation' ),
            imageIndex,
            imageInput,
            imageInputHTML;

        // Check if an input element already exists
        imageInput = explanation.find( 'input' );

        if ( imageInput ) {
            // Remove it if so
            imageInput.remove();

            // Remove selected class from selected image
            possibilitiesWrapper.find( '.img' ).removeClass( 'visualCaptcha-selected' );
        }

        // Add selected class to image
        image.addClass( 'visualCaptcha-selected' );

        // Get the image index
        imageIndex = image.find( 'img' ).data( 'index' );

        // Build the input HTML
        imageInputHTML = templates.imageInput( captchaElement.data( 'captcha' ), imageIndex );

        // Append the input
        explanation.append( $( imageInputHTML ) );
    };

    // Refresh the captcha
    _refreshCaptcha = function() {
        var captchaElement = $( this ).closest( '.visualCaptcha' );

        captchaElement.data( 'captcha' ).refresh();
    };

    _getCaptchaData = function( element ) {
        var image = element.find( '.imageField' ),
            audio = element.find( '.audioField' ),
            valid = !! ( image.val() || audio.val() );

        return valid ? {
            valid: valid,
            name:  image.val() ? image.attr( 'name' )  : audio.attr( 'name' ),
            value: image.val() ? image.val() : audio.val()
        } : {
            valid: valid
        };
    };

    $.fn.visualCaptcha = function( options ) {
        var config;

        config = $.extend( {
            imgPath: '/',
            language: language,
            captcha: {
                request: _request
            }
        }, options );

        this
            // Add visualCaptcha class to element
            .addClass( 'visualCaptcha' )
            // Bind accessibility button
            .on( 'click', '.visualCaptcha-accessibility-button', _toggleAccessibility )
            // Bind refresh button
            .on( 'click', '.visualCaptcha-refresh-button', _refreshCaptcha )
            // Bind images
            .on( 'click', '.visualCaptcha-possibilities .img', _chooseImage );

        return this.each( function() {
            var element = $( this ),
                captcha;

            captcha = visualCaptcha(
                $.extend( config.captcha, {
                    callbacks: {
                        loading: _loading.bind( null, config, element ),
                        loaded: _loaded.bind( null, config, element )
                    }
                } )
            );

            captcha.getCaptchaData = _getCaptchaData.bind( null, element );

            // Initialize visualCaptcha
            element.data( 'captcha', captcha );
        } );
    };
} );