/// <binding BeforeBuild='default' />
var projectBanner = '' +
'/*'                                                                            +'\n'+
' * Copyright 2015, Multiple autors'                                            +'\n'+
' *'                                                                            +'\n'+
' * Licensed under the Apache License, Version 2.0 (the "License");'            +'\n'+
' * you may not use this file except in compliance with the License.'           +'\n'+
' * You may obtain a copy of the License at'                                    +'\n'+
' * http://www.apache.org/licenses/LICENSE-2.0'                                 +'\n'+
' *'                                                                            +'\n'+
' * For more information about the used libraries, licenses, '                  +'\n'+
' * authors and contributors see:'                                              +'\n'+
' * https://github.com/Marvin-Brouwer/QR-Redirect#credits'                      +'\n'+
' *'                                                                            +'\n'+
' */';
var libFiles = [
    // QrDecode
    'Scripts/lib/grid.js',
    'Scripts/lib/version.js',
    'Scripts/lib/detector.js',
    'Scripts/lib/formatinf.js',
    'Scripts/lib/errorlevel.js',
    'Scripts/lib/bitmat.js',
    'Scripts/lib/datablock.js',
    'Scripts/lib/bmparser.js',
    'Scripts/lib/datamask.js',
    'Scripts/lib/rsdecoder.js',
    'Scripts/lib/gf256poly.js',
    'Scripts/lib/gf256.js',
    'Scripts/lib/decoder.js',
    'Scripts/lib/qrcode.js',
    'Scripts/lib/findpat.js',
    'Scripts/lib/alignpat.js',
    'Scripts/lib/databr.js',
    // SWF Object
    'Scripts/lib/swfobject.js'
];
var jsFiles = [
    // IOC
    'Scripts/SIOCC-TS/SIOCC-TS.js',
    // Application
    'Strict.js',
    'Constants.js',
    'Helpers/*.js',
    'Extensions/*.js',
    'ImageProcessors/*.js',
    'DataProcessors/*.js',
    'Facades/*.js',
    'Managers/*.js',
    'Views/*.js', 
    'Application.js'
];

module.exports = function (grunt) {
    var rootFolder = process.cwd().replace(/\\/g, '/');
    var solutionFolder = rootFolder// one level up
        .substr(0, rootFolder.lastIndexOf('/'));
    solutionFolder = solutionFolder// two levels up
        .substr(0, solutionFolder.lastIndexOf('/'));
    
    // Load the plugins.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-less');
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['**/*.ts', '!node_modules/**/*.*', '!wwwroot/**/*.*'],
                //options: (grunt.file.readJSON('tsconfig.json').compilerOptions)
                options: {// none of these options work :S
                    target: 'es6',// todo: fix with babel (I want to use the newest Typescript options)
                    //module: 'es2015',
                    noImplicitAny: false,
                    removeComments: false,
                    preserveConstEnums: true,
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    //outDir: 'bin', <-- not working
                    sourceMap: true,
                    noResolve: true,
                    jsx: 'preserve'
                }
            }
        },
        concat: {
            lib: {
                options: {
                    stripBanners: false,
                    sourceMap: true
                },
                src: libFiles,
                dest: 'bin/Content/Library.js'
            },
            app: {
                options: {
                    stripBanners: false,
                    sourceMap: true
                },
                src: jsFiles,
                dest: 'bin/Content/Bundle.js'
            },
            main: {
                options: {
                    stripBanners: false,
                    sourceMap: true
                },
                src: [ 'bin/Content/Library.js','bin/Content/Babel.js'],
                dest: 'bin/Content/Application.js'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: {
                    'bin/Content/Babel.js': 'bin/Content/Bundle.js'
                }
            }
        },
        htmlmin: {
            default: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    'wwwroot/index.html': ['Static/index.html']
                }, {
                    'wwwroot/ror.xml': ['Static/ror.xml']
                }, {
                    'wwwroot/sitemap.xml': ['Static/sitemap.xml']
                }]
            }
        },
        cssmin: {
            target: {
                options: {
                    banner: projectBanner // <-- This doesn't work, why U no work???
                },
                files: [{
                    expand: false,
                    src: ['Static/Content/Application.css'],
                    dest: 'wwwroot/Content/Application.css',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            release: {
                options: {
                    banner: projectBanner,
                    enclose: true,
                    wrap: true,
                    mangle: {
                        'sort': true,
                        'toplevel': true
                    },
                    compressor: {
                        'drop_console': true
                    }
                },
                files: {
                    '../../Publish/Content/Application.js': ['wwwroot/Content/Application.js']
                }
            }
        },
        copy: {
            default: {
                files: [
                    {
                        expand: true,
                        cwd: 'Static/',
                        src: ['**'],
                        flatten: false,
                        dest: 'wwwroot/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        src: ['bin/Content/Application.js'],
                        flatten: true,
                        dest: 'wwwroot/Content/',
                        filter: 'isFile'
                    }
                ]
            },
            release: {
                files: [
                    {
                        expand: true,
                        cwd: 'wwwroot/',
                        src: ['**'],
                        flatten: false,
                        dest: '../../Publish/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        less:{
            default: {
                options: {
                    compress: true,
                    // todo: research
                    //plugins: [
                    //  new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] }),
                    //  new (require('less-plugin-clean-css'))(cleanCssOptions)
                    //],
                    banner: projectBanner
                },
                files: {
                    "wwwroot/Content/Application.css": 'Layout/*.less'
                }
            }
        }
    });
    
    // Default task(s).
    grunt.registerTask('release', ['default', 'copy:release', 'uglify']);
    grunt.registerTask('default',
        ['typescript', 'concat:lib', 'concat:app', 'babel',
            'concat:main', 'copy:default', 'less', 'htmlmin']);

};