/*global define */

define( function() {
    'use strict';

    var _refresh,
        _startUrl,
        _imageUrl,
        _audioUrl,
        _imageValue,
        _isRetina,
        _supportsAudio;

    _refresh = function( config ) {
        var core = this,
            startURL;

        // Set loading state
        config.applyRandomNonce();
        config.isLoading = true;

        // URL must be loaded after nonce is applied
        startURL = _startUrl( config );

        if ( config.callbacks.loading ) {
            config.callbacks.loading( core );
        }

        config.request( startURL, function( response ) {
            // We need now to set the image and audio field names
            if ( response.audioFieldName ) {
                config.audioFieldName = response.audioFieldName;
            }

            if ( response.imageFieldName ) {
                config.imageFieldName = response.imageFieldName;
            }

            // Set the correct image name
            if ( response.imageName ) {
                config.imageName = response.imageName;
            }

            // Set the correct image values
            if ( response.values ) {
                config.imageValues = response.values;
            }

            // Set loaded state
            config.isLoading = false;
            config.hasLoaded = true;

            if ( config.callbacks.loaded ) {
                config.callbacks.loaded( core );
            }
        } );
    };

    _startUrl = function( config ) {
        return config.url + config.routes.start + '/' + config.numberOfImages + '?r=' + config.randomNonce;
    };

    _imageUrl = function( config, i ) {
        if ( i >= 0 && i < config.numberOfImages ) {
            return config.url + config.routes.image + '/' + i + '?' + (_isRetina() ? 'retina=1&' : '') + 'r=' + config.randomNonce;
        }

        return '';
    };

    _audioUrl = function( config, ogg ) {
        return config.url + config.routes.audio + (ogg ? '/ogg' : '') + '?r=' + config.randomNonce;
    };

    _imageValue = function( config, i ) {
        if ( i >= 0 && i < config.numberOfImages ) {
            return config.imageValues[ i ];
        }

        return '';
    };

    //
    // Check for device/browser capabilities
    //
    _isRetina = function() {
      // Check if the device is retina-like
      return ( window.devicePixelRatio !== undefined && window.devicePixelRatio > 1 );
    };

    // Check if the device supports the HTML5 audio element, for accessibility
    // I'm using an IIFE just because I don't want audioElement to be in the rest of the scope
    _supportsAudio = function() {
        var audioElement,
            support = false;

        try {
            audioElement = document.createElement( 'audio' );
            if ( audioElement.canPlayType ) {
                support = true;
            }
        } catch( e ) {}

        return support;
    };

    return function( config ) {
        var core,
            refresh,
            isLoading,
            hasLoaded,
            numberOfImages,
            imageName,
            imageValue,
            imageUrl,
            audioUrl,
            imageFieldName,
            audioFieldName;

        refresh = function() {
            return _refresh.call( this, config );
        };

        isLoading = function() {
            return config.isLoading;
        };

        hasLoaded = function() {
            return config.hasLoaded;
        };

        numberOfImages = function() {
            return config.imageValues.length;
        };

        imageName = function() {
            return config.imageName;
        };

        imageValue = function( index ) {
            return _imageValue.call( this, config, index );
        };

        imageUrl = function( index ) {
            return _imageUrl.call( this, config, index );
        };

        audioUrl = function( ogg ) {
            return _audioUrl.call( this, config, ogg );
        };

        imageFieldName = function() {
            return config.imageFieldName;
        };

        audioFieldName = function() {
            return config.audioFieldName;
        };

        core = {
            refresh: refresh,
            isLoading: isLoading,
            hasLoaded: hasLoaded,
            numberOfImages: numberOfImages,
            imageName: imageName,
            imageValue: imageValue,
            imageUrl: imageUrl,
            audioUrl: audioUrl,
            imageFieldName: imageFieldName,
            audioFieldName: audioFieldName,
            isRetina: _isRetina,
            supportsAudio: _supportsAudio
        };

        // Load the data if auto refresh is enabled
        if ( config.autoRefresh ) {
            core.refresh();
        }

        return core;
    };
} );