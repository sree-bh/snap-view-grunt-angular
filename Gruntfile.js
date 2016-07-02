/*jslint node: true */
'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: ['src/viewer/*.js', 'src/app.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    copy: {
      dist: {
        files: [{
          cwd: 'src/resources/gallery',
          src: ['*'],
          dest: 'dist/gallery',
          flatten: true,
          expand: true
        }, {
          cwd: 'src/resources/icons',
          src: ['*'],
          dest: 'dist/icons',
          flatten: true,
          expand: true
        }, {
          cwd: 'src',
          src: ['index.html'],
          dest: 'dist',
          flatten: true,
          expand: true
        }]
      }
    },

    concat: {
        basic_and_extras: {
          options: {
            separator: "\n",
          },
          files: {
            'dist/js/app.min.js': [
              'src/viewer/snService.js',
              'src/viewer/snController.js',
              'src/viewer/snDirective.js',
              'src/app.js'
            ],
            'dist/js/libs.js': ['src/libs/angular/angular.min.js']
          }
        }
    },

    ngAnnotate: {
        all: {
            files: {
                'tmp/app.js' : ['tmp/app.js']
            }
        }
    },

    uglify: {
      dist: {
        files: {
          // 'dist/js/app.min.js': [
          //   'src/viewer/snService.js',
          //   'src/viewer/snController.js',
          //   'src/viewer/snDirective.js',
          //   'src/app.js'
          // ]
        },
        options: {
          mangle: false,
          compress: {
            negate_iife: false
          }
        }
      }
    },

    cssmin: {
      absolute: {
        files: [{
          src: [
            'src/resources/css/*.css'
          ],
          dest: 'dist/css/app.css'
        }]
      }
    },

    clean: {
      temp: {
        src: [ 'tmp' ]
      }
    },

    watch: {
      js: {
        files: ['src/viewer/*.js', 'src/app.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    // configure nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon']
    },


    bower: {
      install: {
        options: {
          install: true,
          copy: false,
          targetDir: 'src/libs',
          cleanTargetDir: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-nodemon');
  // grunt.loadNpmTasks('grunt-concurrent');
  // grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask('default', ['jshint', 'cssmin', 'copy', 'concat', 'ngAnnotate', 'uglify', 'clean']); 
};