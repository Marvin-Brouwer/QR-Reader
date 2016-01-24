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
    'node_modules/siocc-ts/SIOCC-TS/SIOCC-TS.js',
    // Application
    'Strict.js',
    'Constants/*.js',
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
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-file-append');
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        tslint: {
            default: { 
                options: {
                    formatter: 'json',
                    configuration:  grunt.file.readJSON(solutionFolder + '/tslint.json'),
                    rulesDirectory: 'customRules/', // can be an array of directories 
                    formattersDirectory: 'customFormatters/'
                },
                files: {
                    src: ['**/*.ts', '!Extensions/**/*.*', '!Scripts/**/*.*', '!node_modules/**/*.*', '!wwwroot/**/*.*']
                }
            }
        },
        typescript: {
            base: {
                src: ['**/*.ts', '!node_modules/**/*.*', '!wwwroot/**/*.*'],
                //options: (grunt.file.readJSON('tsconfig.json').compilerOptions)
                options: {
                    // none of these options work :S
                    target: 'es6',
                    //module: 'es2015',
                    noImplicitAny: false,
                    removeComments: false,
                    preserveConstEnums: true,
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    //outDir: 'bin', <-- not working
                    sourceMap: true,
                    noResolve: true,
                    fast: 'never'
                }
            }
        },
        concat: {
            lib: {
                options: {
                    stripBanners: false,
                    sourceMap: true,
                    sourceMapStyle: 'embed',
                    separator: '\n'
                },
                src: libFiles,
                dest: 'bin/Content/Library.js'
            },
            app: {
                options: {
                    stripBanners: false,
                    separator: '\n',
                    sourceMap: true,
                    sourceMapStyle: 'embed'
                },
                src: jsFiles,
                dest: 'bin/Content/Bundle.js'
            },
            main: {
                options: {
                    stripBanners: false,
                    separator: '\n;\n\n',
                    sourceMap: true,
                    sourceMapStyle: 'embed'
                },
                src: ['bin/Content/Library.js', 'bin/Content/Babel.js'],
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
                files: [
                    {
                        'wwwroot/index.html': ['Static/index.html']
                    }, {
                        'wwwroot/ror.xml': ['Static/ror.xml']
                    }, {
                        'wwwroot/sitemap.xml': ['Static/sitemap.xml']
                    }
                ]
            }
        },
        cssmin: {
            target: {
                options: {
                    banner: projectBanner // <-- This doesn't work, why U no work???
                },
                files: [
                    {
                        expand: false,
                        src: ['Static/Content/Application.css'],
                        dest: 'wwwroot/Content/Application.css',
                        ext: '.css'
                    }
                ]
            }
        },
        uglify: {
            release: {
                options: {
                    banner: projectBanner,
                    enclose: true,
                    wrap: true,
                    squeeze: {dead_code: true},
                    codegen: {quote_keys: true},
                    mangle: {
                        'sort': true,
                        'toplevel': true
                    },
                    compress: {
                        'drop_console': true
                    }
                },
                files: {
                    //'../../Publish/Content/Application.js': ['wwwroot/Content/Application.js']
                    // To check if uglify doesn't break:
                    'wwwroot/Content/Application.js': ['wwwroot/Content/Application.js']
                }
            }
        },
        copy: {
            lib: {
                files: [
                    {
                        expand: true,
                        src: ['node_modules/siocc-ts/SIOCC-TS/SIOCC-TS.d.ts'],
                        flatten: true,
                        dest: 'Scripts/typings',
                        filter: 'isFile'
                    },
                ]
            },
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
        less: {
            default: {
                options: {
                    compress: true,
                    // todo: research
                    //plugins: [
                    //  new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] }),
                    //  new (require('less-plugin-clean-css'))(cleanCssOptions)
                    //],
                    banner: projectBanner // todo: find out why this doesn't work
                },
                files: {
                    "wwwroot/Content/Application.css": 'Layout/*.less'
                }
            }
        },
        obfuscator_node: {
            default: {
                options: {
                    strings: true,
                    compressor: {
                        conditionals: true,
                        evaluate: true,
                        booleans: true,
                        loops: true,
                        unused: true,
                        hoist_funs: true
                    }
                },
                files: [{
                    src: ['bin/Content/Application.js'],
                    dest: 'bin/Content/Obfuscated.js',
                    expand: false
                }]
            }
        },
        file_append: {
            fix_eof: {
                files: [
                  {
                      append: '\n//#eof\n',
                      input: 'bin/Content/Application.js',
                      output: 'bin/Content/Application.js'
                }
            ]
        }
    }
});
    
// Default task(s).
grunt.registerTask('release', ['default', 'copy:release', 'uglify']);
grunt.registerTask('default',
    ['tslint','copy:lib', 'typescript', 'concat:lib', 'concat:app', 'babel',
        'concat:main', 'file_append:fix_eof', 'copy:default', 'less', 'htmlmin']);

};