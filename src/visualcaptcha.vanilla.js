/*global define */

define( [
    'visualcaptcha',
    'visualcaptcha/deep-extend',
    'visualcaptcha/helpers',
    'visualcaptcha/templates',
    'visualcaptcha/language'
], function( visualCaptcha, deepExtend, helpers, templates, language ) {
    'use strict';

    var _loading,
        _loaded,
        _toggleAccessibility,
        _chooseImage,
        _refreshCaptcha,
        _getCaptchaData;

    // callback on loading
    _loading = function() {};

    // callback on loaded
    _loaded = function( element, captcha ) {
        var config = element.config,
            captchaHTML,
            selected;

        captchaHTML =
            // Add namespace input, if present
            templates.namespaceInput( captcha ) +
            // Add audio element, if supported
            templates.accessibility( captcha, config.language ) +
            // Add image elements
            templates.images( captcha, config.language ) +
            // Add refresh and accessibility buttons
            templates.buttons( captcha, config.language, config.imgPath );

        // Actually add the HTML
        element.innerHTML = captchaHTML;

        // Bind accessibility button
        selected = helpers.findByClass( element, 'visualCaptcha-accessibility-button', true );
        helpers.bindClick( selected, _toggleAccessibility.bind( null, element, captcha ) );

        // Bind refresh button
        selected = helpers.findByClass( element, 'visualCaptcha-refresh-button', true );
        helpers.bindClick( selected, _refreshCaptcha.bind( null, element, captcha ) );

        // Bind images
        selected = helpers.findByClass( element, 'visualCaptcha-possibilities', true );
        helpers.bindClick( helpers.findByClass( selected, 'img' ), _chooseImage.bind( null, element, captcha ) );
    };

    // Toggle accessibility option
    _toggleAccessibility = function( element, captcha ) {
        var accessibilityWrapper = helpers.findByClass( element, 'visualCaptcha-accessibility-wrapper', true ),
            possibilitiesWrapper = helpers.findByClass( element, 'visualCaptcha-possibilities', true ),
            explanation = helpers.findByClass( element, 'visualCaptcha-explanation', true ),
            audio = helpers.findByTag( accessibilityWrapper, 'audio', true ),
            images,
            imageInput,
            audioInput,
            audioInputHTML;

        if ( helpers.hasClass( accessibilityWrapper, 'visualCaptcha-hide' ) ) {
            // Hide images and explanation
            helpers.addClass( possibilitiesWrapper, 'visualCaptcha-hide' );
            helpers.addClass( explanation, 'visualCaptcha-hide' );

            // Reset selected images and input value
            images = helpers.findByClass( possibilitiesWrapper, 'img' );
            helpers.removeClass( images, 'visualCaptcha-selected' );

            imageInput = helpers.findByTag( explanation, 'input', true );
            if ( imageInput !== undefined ) {
                imageInput.value = '';
            }

            // Build the input HTML
            audioInputHTML = templates.audioInput( captcha );

            // Add the input before the audio element
            accessibilityWrapper.innerHTML = accessibilityWrapper.innerHTML.replace( '<audio', audioInputHTML + '<audio' );

            // Show the accessibility wrapper
            helpers.removeClass( accessibilityWrapper, 'visualCaptcha-hide' );

            // Play the audio
            audio.load();
            audio.play();
        } else {
            // Stop audio, delete input element, show images
            audio.pause();

            // Hide the accessibility wrapper
            helpers.addClass( accessibilityWrapper, 'visualCaptcha-hide' );

            // Delete the input element
            audioInput = helpers.findByTag( accessibilityWrapper, 'input', true );
            accessibilityWrapper.removeChild( audioInput );

            // Show images and explanation
            helpers.removeClass( explanation, 'visualCaptcha-hide' );
            helpers.removeClass( possibilitiesWrapper, 'visualCaptcha-hide' );
        }
    };

    // Choose image
    _chooseImage = function( element, captcha, event ) {
        var image = event.currentTarget,
            possibilitiesWrapper = helpers.findByClass( element, 'visualCaptcha-possibilities', true ),
            explanation = helpers.findByClass( element, 'visualCaptcha-explanation', true ),
            imgElement,
            images,
            imageIndex,
            imageInput,
            imageInputHTML;

        // Check if an input element already exists
        imageInput = helpers.findByTag( explanation, 'input', true );

        if ( imageInput ) {
            // Remove it if so
            explanation.removeChild( imageInput );

            // Remove selected class from selected image
            images = helpers.findByClass( possibilitiesWrapper, 'img' );
            helpers.removeClass( images, 'visualCaptcha-selected' );
        }

        // Add selected class to image
        helpers.addClass( image, 'visualCaptcha-selected' );

        // Get the image index
        imgElement = helpers.findByTag( image, 'img', true );
        imageIndex = parseInt( imgElement.getAttribute( 'data-index' ), 10 );

        // Build the input HTML
        imageInputHTML = templates.imageInput( captcha, imageIndex );

        // Append the input
        explanation.innerHTML += imageInputHTML;
    };

    // Refresh the captcha
    _refreshCaptcha = function( element, captcha ) {
        captcha.refresh();
    };

    _getCaptchaData = function( element ) {
        var image = helpers.findByClass( element, 'imageField', true ) || {},
            audio = helpers.findByClass( element, 'audioField', true ) || {},
            valid = !! ( image.value || audio.value );

        return valid ? {
            valid: valid,
            name:  image.value ? image.name  : audio.name,
            value: image.value ? image.value : audio.value
        } : {
            valid: valid
        };
    };

    return function( element, options ) {
        var config,
            captcha,
            captchaConfig;

        config = deepExtend( {
            imgPath: '/',
            language: language,
            captcha: {}
        }, options );

        element = ( typeof element === "string" ) ? document.getElementById( element ) : element;
        element.config = config;

        // Add visualCaptcha class to element
        helpers.addClass( element, 'visualCaptcha' );

        // Store captcha config
        captchaConfig = deepExtend( config.captcha, {
            callbacks: {
                loading: _loading.bind( null, element ),
                loaded: _loaded.bind( null, element )
            }
        } );

        // Load namespace from data-namespace attribute
        if ( typeof element.getAttribute( 'data-namespace' ) !== 'undefined' ) {
            captchaConfig.namespace = element.getAttribute( 'data-namespace' );
        }

        // Initialize visualCaptcha
        captcha = visualCaptcha( captchaConfig );

        captcha.getCaptchaData = _getCaptchaData.bind( null, element );

        if ( typeof config.init === "function" ) {
            config.init.call( null, captcha );
        }

        return captcha;

    };
} );