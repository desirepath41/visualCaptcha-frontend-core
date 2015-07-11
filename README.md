[![Codacy](https://www.codacy.com/project/badge/aab082777ee24865b58faee9df952144)](https://www.codacy.com/app/bruno-bernardino/visualCaptcha-frontend-core)
[![Code Climate](https://codeclimate.com/github/emotionLoop/visualCaptcha-frontend-core/badges/gpa.svg)](https://codeclimate.com/github/emotionLoop/visualCaptcha-frontend-core)

# visualCaptcha-frontend-core

A JavaScript library for visualCaptcha front-end core files, for development and building the individual bower packages.


## Installation

You need Node.js installed with npm.

Install dependencies with
```
npm install
```


## Coding guidelines / Code style

View [http://jscode.org/readable](http://jscode.org/readable)


## Running the tests

```
grunt test
```


## Building the library

```
grunt build
```


## Usage

### Initialization 

1. Include the visualCaptcha front-end core JS library and CSS styles into the HTML page:

    ```html
    <!-- Somewhere inside the HEAD tag -->
    <link href="/path_to/visualcaptcha.css" media="all" rel="stylesheet">

    <!-- Somewhere inside the BODY tag, ideally at the bottom -->
    <script src="/path_to/visualcaptcha.js"></script>
    ```

2. Initialize the visualCaptcha object with the `visualCaptcha( options )` javascript function that _returns a visualCaptcha object_, where `options` is a JavaScript object with the visualCaptcha core options:

    ```javascript
    var captcha = visualCaptcha( {
        numberOfImages: 5,
        callbacks: {
            loading: function( captcha ){
                console.log( 'I am loading.', captcha );
            },
            loaded: function( captcha ){
                console.log( 'I am loaded.', captcha );
            }
        }
    } );
    ```


### visualCaptcha core options

The JavaScript object with the visualCaptcha core options can contain following parameters:

- `request` (default: `xhrRequest`) — function for sending an XHR request;
- `url` (default: `'http://localhost:8282'`) — url for back-end;
- `namespace` — the value of the parameter sent to the server for the namespace, if it's not set up, no namespace will be sent (using the default in the back-end);
- `namespaceFieldName` (default: `'namespace'`) — the name of the parameter sent to the server for the namespace;
- `routes` — object with the following endpoint routes:
    - `start` (default: `'/start'`) — route to generate common data (image field name, image name, image values and audio field name);
    - `image` (default: `'/image'`) — route to get generated image file by index;
    - `audio` (default: `'/audio'`) — route to get generated audio file;
- `isLoading` (default: `false`) — if it is `true` then visualCaptcha is actively loading;
- `hasLoaded` (default: `false`) — if it is `true` then visualCaptcha has loaded and is ready;
- `autoRefresh` (default: `true`) — if it is `true` it will load the data when visualCaptcha's ready (DOM ready);
- `numberOfImages` (default: `6`) — number of generated image options for visualCaptcha;
- `randomParam` (default: `'r'`) — name of random value parameter which is used for disabling cache;
- `callbacks` — object with the following callback functions:
    - `loading: function( captcha ) { /* ... */ }` — function that is called as soon as visualCaptcha starts loading data;
    - `loaded: function( captcha ) { /* ... */ }` — function that is called as soon as visualCaptcha finishes loading data.


### visualCaptcha object methods

All the following methods are available from the _visualCaptcha core object_, that will be returned by the `visualCaptcha( options )` function (as described above, in “Initialization”, step 2).

- `audioFieldName()` — returns the name of the accessibility (audio) input field;
- `audioUrl()` — returns the URL of audio file;
- `hasLoaded()` — returns `true` if visualCaptcha has loaded, otherwise returns `false`;
- `imageFieldName()` — returns the name of the image input field;
- `imageName()` — returns the textual name of the correct image (for the helper, to let the user know which image to select);
- `imageUrl( index )` — returns the URL of the image file at index `index` (number);
- `imageValue( index )` — returns the value of the image file at index `index` (number);
- `isLoading()` — returns `true` if visualCaptcha is loading, otherwise returns `false`;
- `isRetina()` — returns `true` if the current device has a `window.devicePixelRatio > 1`, otherwise returns `false`;
- `numberOfImages()` — returns the number of generated image options;
- `refresh()` — reloads visualCaptcha, sending a new request to the backend;
- `supportsAudio()` — returns `true` if the browser supports HTML5 Audio, otherwise returns `false`;


## License

View the [LICENSE](LICENSE) file.