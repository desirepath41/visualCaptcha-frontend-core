'use strict';

module.exports = function( grunt ) {
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'visualcaptcha.json' ),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        clean: {
            src: ['dist']
        },
        usebanner: {
            taskName: {
                options: {
                    position: 'top' ,
                    banner: '<%= banner %>',
                    linebreak: true
                },
                files: {
                    src: ['dist/**/*.js', 'dist/**/*.css']
                }
            }
        },
        requirejs: {
            'visualcaptcha': {
                options: {
                    almond: true,
                    baseUrl: 'src',
                    paths: {
                        'visualcaptcha': './visualcaptcha'
                    },
                    include: ['visualcaptcha'],
                    out: 'dist/visualcaptcha.js',
                    wrap: {
                        startFile: 'wrap/wrap.start',
                        endFile: 'wrap/wrap.end'
                    }
                }
            },
            'visualcaptcha.vanilla': {
                options: {
                    almond: true,
                    baseUrl: 'src',
                    paths: {
                        'visualcaptcha.vanilla': './visualcaptcha.vanilla'
                    },
                    include: ['visualcaptcha.vanilla'],
                    out: 'dist/visualcaptcha.vanilla.js',
                    wrap: {
                        startFile: 'wrap/wrap.vanilla.start',
                        endFile: 'wrap/wrap.vanilla.end'
                    }
                }
            },
            'visualcaptcha.jquery': {
                options: {
                    almond: true,
                    baseUrl: 'src',
                    paths: {
                        'jquery': '../libs/jquery/jquery.min',
                        'visualcaptcha.jquery': './visualcaptcha.jquery'
                    },
                    include: ['visualcaptcha.jquery'],
                    exclude: ['jquery'],
                    out: 'dist/visualcaptcha.jquery.js',
                    wrap: {
                        startFile: 'wrap/wrap.jquery.start',
                        endFile: 'wrap/wrap.jquery.end'
                    }
                }
            },
            'visualcaptcha.angular': {
                options: {
                    almond: true,
                    baseUrl: 'src',
                    paths: {
                        'angular': '../libs/angular/angular.min',
                        'visualcaptcha.angular': './visualcaptcha.angular'
                    },
                    include: ['visualcaptcha.angular'],
                    exclude: ['angular'],
                    out: 'dist/visualcaptcha.angular.js',
                    wrap: {
                        startFile: 'wrap/wrap.angular.start',
                        endFile: 'wrap/wrap.angular.end'
                    }
                }
            }
        },
        less: {
            compile: {
                options: {
                    path: ['less'],
                    cleancss: true
                },
                files: {
                    'dist/visualcaptcha.css': 'less/visualcaptcha.less'
                }
            }
        },
        qunit: {
            test: ['test/index!(-dist)*.html'],
            dist: ['test/index-dist-*.html']
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit:test']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit:test']
            },
            less: {
                files: 'less/**/*.less',
                tasks: ['less']
            }
        }

    } );

    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-qunit' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-requirejs' );
    grunt.loadNpmTasks( 'grunt-banner' );

    grunt.registerTask( 'default', ['test'] );
    grunt.registerTask( 'test', ['jshint', 'qunit:test'] );
    grunt.registerTask( 'build', ['test', 'clean', 'less', 'requirejs', 'usebanner', 'qunit:dist'] );
};