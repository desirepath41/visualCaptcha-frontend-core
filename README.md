visualCaptcha-frontend-core
===========================

A JavaScript library for visualCaptcha front-end core files, for development and building the bower packages


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

1. Include visualCaptcha front-end core library into the HTML page:

    ```html
    <script src="/path_to/visualcaptcha.js"></script>
    ```

2. Initialize captcha object with the `visualCaptcha( options )` javascript function that _returns visualCaptcha object_, where `options` is a JSON object of the visualCaptcha core options:

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


### VisualCaptcha core options

JSON object of the visualCaptcha core options can contain next parameters:

- `request` (default: `xhrRequest`) — function for sending request;
- `url` (default: `'http://localhost:8282'`) — url for back-end;
<!-- !FIXME - `path` (default: `''`) — is the url prefix; -->
<!-- !FIXME - `autoRefresh` (default: `true`) — if it is `true` it will load the data when it's constructed; -->
- `numberOfImages` (default: `6`) — number of generated images for visualCaptcha;
- `routes` — object with next endpoint routes:
    - `start` (default: `'/start'`) — route to generate common data (image field name, image name, image values and audio field name);
    - `image` (default: `'/image'`) — route to get generated image file by index;
    - `audio` (default: `'/audio'`) — route to get generated audio file;
- `callbacks` — object with next callback functions:
    - `loading: function( captcha ) { /* ... */ }` — function that calls on loading data;
    - `loaded: function( captcha ) { /* ... */ }` — function that calls when visualCaptcha data is loaded.


### VisualCaptcha object methods

All next methods are available from _VisualCaptcha core object_ that will be returned by `visualCaptcha( options )` funciton (as it was described above, in “Initialization”, step 2).

- `audioFieldName()` — returns field name of accessibility (audio) captcha;
- `audioUrl()` — returns URL of audio file;
- `hasLoaded()` — returns `true` if VisualCaptcha is loaded, else returns `false`;
- `imageFieldName()` — returns field name of image captcha;
- `imageName()` — name of the image object for pass visualCaptcha correct;
- `imageUrl( index )` — returns URL of image file by index, index is number;
- `imageValue( index )` — returns value of image file by index, index is number;
- `isLoading()` — returns `true` if VisualCaptcha is loading, else returns `false`;
- `isRetina()` — returns `true` for devises with retina display, else returns `false`;
- `numberOfImages()` — returns number of generated images;
- `refresh()` — reloads visual captcha, sends new request to the back-end;
- `supportsAudio()` — returns `true` if browser supports HTML 5 Audio, else returns `false`;


## License

The MIT License (MIT)

Copyright (c) 2014 emotionLoop

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
