bojangles
---------------

> Using Grunt.js for build automation concatenation, minification, and optimisation. There will also be watch tasks, linting and live-reload.

Preview of src and build output
-----------

* src html preview: [here] [3]
* build html preview [here] [4]

Setup
-----------

To get Grunt.js up and running follow the instructions on the site: [Gruntjs - Getting started] [1], then proceed with the following steps via Terminal:


```
cd bojangles
```
```
npm install
```
```
grunt
```
```
grunt compressimages
```
<hr>
That should install all the Grunt dependencies, generate the build directory and compress the sample images. [ImageOptim.app] [2] will need to be installed for image optimisation. Fire up <b>src/index.html</b> in your browser to see more details and explanations and then have a dig around in <b>/build</b>.
<hr>
Todo
-----------

* Watch tasks for linting etc..
* Watch task for live re-load
* Task to fire up a basic localhost


Modules used
-----------
* clean
* targethtml
* copy
* concat
* uglify
* cssmin
* jshint
* csslint
* imageoptim

[1]: http://gruntjs.com/getting-started
[2]: http://imageoptim.com
[3]: http://dan.ms/examples/bojangles/src/index.html
[4]: http://dan.ms/examples/bojangles/build/index.html
