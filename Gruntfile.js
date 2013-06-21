module.exports = function(grunt) {
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     
    // **
    // Default paths
    // **

    // Build path
    src_path: 'src',
    build_path: 'build',
    // App JS
    js_src_path: 'src/js',
    js_build_path: 'build/js',
    // JS Lib path
    // Only libs with minified versions provided by vendor exist here (No minification/concatenation required)
    js_lib_src_path: 'src/js/libs',
    js_lib_build_path: 'build/js/libs',
    // CSS path
    css_src_path: 'src/css',
    css_build_path: 'build/css',
    // Icons
    ico_src_path: 'src/ico',
    ico_build_path: 'build/ico',
    // Images
    img_src_path: 'src/img',
    img_build_path: 'build/img',
 
    // **
    // Grunt tasks
    // **

    // Wipe build directory clean
    clean: ['<%= build_path %>'],
    targethtml: {
      options: {
        curlyTags: {
          rlsdate: '<%= grunt.template.process("v" + pkg.version) %>'
        }
      },
      build: {
        files: {
          '<%= build_path %>/index.html': '<%= src_path %>/index.html'
        }
      }
    },
    // Copy files to the build directory
    copy: {
      main: {
        files: [
          // Icons
          { expand: true, cwd: '<%= ico_src_path %>/', src: '*.{png,ico}', dest: '<%= ico_build_path %>/', filter: 'isFile' },
          // JS libs - Only libs with pre-minified versions from vendor (E.g. jQuery or Modernizer)
          { expand: true, cwd: '<%= js_lib_src_path %>/', src: '*.min.js', dest: '<%= js_lib_build_path %>/', filter: 'isFile' },
          // Copy images - Optimsed later
          { expand: true, cwd: '<%= img_src_path %>/', src: '**/*.{png,jpg,gif}', dest: '<%= img_build_path %>/'},
        ]
      },
      build: {
        files: [
          // Copy images - Optimsed later
          { expand: true, cwd: '<%= img_src_path %>/', src: '**/*.{png,jpg,gif}', dest: '<%= img_build_path %>/'},
        ]
      }
    },
    // Optimise images in the /img build directory
    imageoptim: {
      main: {
        files: [
          // Imageoptim expects a directory
          { expand: true, cwd: '<%= build_path %>/', src: 'img' },
          { expand: true, cwd: '<%= img_build_path %>/', src: '**/*', filter: 'isDirectory' },
        ],
        options: {
          // also run images through ImageAlpha.app before ImageOptim.app
          // imageAlpha: true,
          // also run images through JPEGmini.app after ImageOptim.app
          // jpegMini: true,
          quitAfter: true
        }
      }
    },
    // Concat the app js but not libraries such as jQuery or Modernizer
    concat: {
      options:{
        separator: ';'
      },
      js: {
        src: ['<%= js_src_path %>/*.js'],
        dest: '<%= js_build_path %>/app.js'
      }
    },
    // Mash up the concat js 
    uglify: {
      options:{
        mangle: true,
        banner: '/*! <%= pkg.name || pkg.title %> - v<%= pkg.version + "\\n" %>' +
        '* <%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '* <%= pkg.homepage + "\\n" %>' + 
        '* Copyright (c) <%= grunt.template.today("yyyy") %> - <%= pkg.name %> */ <%= "\\n" %>'
      },
      js: {
        src: '<%= concat.js.dest %>',
        dest:'<%= js_build_path %>/app.min.js'
      }
    },
    // Minify and concat css
    cssmin: {
      options:{
        banner: '/*! <%= pkg.name || pkg.title %> - v<%= pkg.version + "\\n" %>' +
        '* <%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' +
        '* <%= pkg.homepage + "\\n" %>' + 
        '* Copyright (c) <%= grunt.template.today("yyyy") %> - <%= pkg.name %> */ <%= "\\n" %>'
      },
      css: {
        src: ['<%= css_src_path %>/normalize.css', '<%= css_src_path %>/base.css', '<%= css_src_path %>/utils.css', '<%= css_src_path %>/components.css', '<%= css_src_path %>/site.css', '<%= css_src_path %>/mq.css', '<%= css_src_path %>/print.css'],
        dest:'<%= css_build_path %>/app.min.css'
      }
    },
    // Lint the JS - lint is run on src not build
    jshint: {
      all: ['Gruntfile.js', 'src/js/**.js']
    },
    // Lint the CSS - lint is run on src not build
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['src/css/**/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['src/css/**/*.css']
      }
    }
  });

  // Load modules to use
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // Default tasks
  grunt.registerTask('default', ['clean', 'targethtml', 'copy', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('lint', ['jshint', 'csslint']);
  grunt.registerTask('compressimages', ['copy:build', 'imageoptim']);
};