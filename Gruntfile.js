'use strict';
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        'angular-builder': {
            options: {
                mainModule: 'angApp',
                externalModules: ['ngRoute', 'ngSanitize']
            },
            app: {
                src: 'client/src/**/*.js',
                dest: 'dist/public/main.js'
            }
        },

        bower_concat: {
            all: {
                dest: {
                    'js': 'dist/public/bower/bower.js',
                    'css': 'dist/public/bower/bower.css'
                },
                exclude: [],
                dependencies: {},
                bowerOptions: {
                    relative: false
                }
            }
        },

        clean: {
            app: ['dist/*']
        },

        copy: {
            dev: {
                files: [{
                    cwd: 'client/assets/images/',
                    src: '*',
                    dest: 'dist/public/assets/images',
                    expand: true
                }]
            }
        },

        express: {
            options: {},
            dev: {
                options: {
                    script: 'server/app.js'
                }
            }
        },

        ngtemplates: {
            angApp: {
                src: 'client/src/*/**/*.html',
                dest: 'dist/public/templates.js',
            }
        },

        includeSource: {
            options: {
                basePath: 'dist/',
                baseUrl: '',
                ordering: 'top-down'
            },
            myTarget: {
                files: {
                    'dist/index.html': 'client/src/index.html'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'client/src/**/*.js', 'server/**/*']
        },

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/public/main.css': 'client/src/app.scss'
                }
            }

        },

        sass_import: {
            options: {},
            dist: {
                files: {
                    'client/src/app.scss': ['client/src/*/**/*.scss']
                }
            }
        },

        svgstore: {
            options: {
                // prefix: 'shape-', // This will prefix each <g> ID
            },
            default: {
                files: {
                    'dist/public/svg-sprites.svg': ['client/assets/svg/*.svg'],
                }
            }
        },

        watch: {
            client: {
                files: ['client/src/**/*.js', 'client/src/**/*.scss', 'client/src/**/*.html', 'client/assets/**/*'],
                tasks: ['client']
            },
            server: {
                files: ['server/**/*'],
                tasks: ['express:dev'],
                options: {
                    nospawn: true
                }
            },
            includeSource: {
                // Watch for added and deleted scripts to update index.html
                files: 'client/src/**/*.js',
                tasks: ['includeSource'],
                options: {
                    event: ['added', 'deleted']
                }
            }
        },

        wiredep: {
            task: {
                src: ['client/index.html']
            }
        }

    });

    // Default task.
    grunt.registerTask('default', [], function () {
        grunt.task.run('clean', 'jshint', 'client');
        grunt.task.run('express:dev');
    });

    grunt.registerTask('client', 'Client building...', function () {
        grunt.task.run(['sass_import', 'svgstore', 'copy:dev']);
        grunt.task.run(['ngtemplates', 'wiredep', 'angular-builder', 'sass', 'bower_concat', 'svgstore']);
        grunt.task.run('includeSource');
    });

    grunt.registerTask('serve', ['default', 'watch']);

};