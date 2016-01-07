/// <binding BeforeBuild='default' />
var projectBanner =
    '/* A disclaimer will be written down here' + '\n' +
    ' * stating the origin of the project and where the list of respective creits can be found.' + '\n' +
    ' * Also: safety disclaimer.' + '\n' +
    ' */';
var jsFiles = [
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
    'Scripts/lib/swfobject.js',
    // Application
    'Extensions/*.js',
    'ImageProcessors/*.js',
    'DataProcessors/*.js',
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
    grunt.loadNpmTasks('grunt-typescript');
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['**/*.ts', '!node_modules/**/*.*', '!wwwroot/**/*.*'],
                //options: (grunt.file.readJSON('tsconfig.json').compilerOptions)
                options: {// none of these options work :S
                    //target: 'es2015','// todo: fix with babel (I want to use the newest Typescript options)
                    //module: 'es2015',
                    noImplicitAny: false,
                    removeComments: false,
                    preserveConstEnums: true,
                    //outDir: 'bin', <-- not working
                    sourceMap: true
                }
            }
        },
        concat: {
            default: {
                options: {
                    stripBanners: false,
                    sourceMap: true
                },
                src: jsFiles,
                dest: 'bin/Content/Application.js'
            }
            //release: {
            //    options: {
            //        stripBanners: false,
            //        sourceMap: true
            //    },
            //    src: jsFiles,
            //    dest: 'bin/Content/Concat.js'
            //}
        },
        htmlmin: {
            default: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                   'wwwroot/index.html' : 'Static/index.html',
                }
            },
        },
        uglify: {
            //release: {
            //    options: {
            //        banner: projectBanner,
            //        enclose: true,
            //        wrap: true,
            //        mangle: {
            //            'sort': true,
            //            'toplevel': true
            //        },
            //        compressor: {
            //            'drop_console': true
            //        }
            //    },
            //    files: {
            //        'wwwroot/Content/Application.js': [solutionFolder + '/Source/QR-Reader/Content/Application.js']
            //    }
            //}
        },
        copy: {
            //release: {
            //    files: [
            //      // includes files within path
            //        {
            //            expand: true, cwd: solutionFolder + '/Source/QR-Reader/', src: [
            //                'index.html',
            //                'Content/**'
            //            ], 
            //            flatten: false, dest: solutionFolder + '/Publish/'
            //        },
            //        {
            //            expand: true, cwd: solutionFolder + '/Source/Application/wwwroot/Content/', src: [
            //                'Application.js'
            //            ], 
            //            flatten: false, dest: solutionFolder + '/Publish/Content'
            //        }
            //    ]
            //},
            default: {
                files: [
                    {
                        expand: true,
                        src: [
                          'bin/Content/Application.js',
                          'Static/Content/*'],
                        flatten: true,
                        dest: 'wwwroot/Content/',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });
    
    // Default task(s).
    //grunt.registerTask('release', ['default', 'uglify', 'copy:release']);
    grunt.registerTask('default', ['typescript', 'concat:default', 'htmlmin', 'copy:default']);

};