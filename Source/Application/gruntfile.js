/// <binding AfterBuild='default' />

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
    'ImageProcessors/*.js',
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
    grunt.loadNpmTasks('grunt-typescript');
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['**/*.ts', '!node_modules/**/*.*'],
                options: {
                    module: 'none', //or commonjs 
                    target: 'es5', //or es3 
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
                dest: 'bin/Application.js'
            },
            release: {
                options: {
                    stripBanners: false,
                    sourceMap: true
                },
                src: jsFiles,
                dest: 'bin/Concat.js'
            }
        },
        uglify: {
            release: {
                files: {
                    'bin/Release/Content/Application.js': [solutionFolder + '/Source/QR-Redirect/Content/Application.js']
                }
            }
        },
        copy: {
            release: {
                files: [
                  // includes files within path
                    {
                        expand: true,cwd:solutionFolder + '/Source/QR-Redirect/', src: [
                            'index.html',
                            'Content/**'
                        ], 
                        flatten: false, dest: solutionFolder + '/Publish/'
                    }
                ]
            },
            default: {
                files: [
                  // includes files within path
                    { expand: true, src: ['bin/Application.js'], flatten: true, dest: solutionFolder + '/Source/QR-Redirect/Content/', filter: 'isFile' }
                ]
            }
        }
    });
    
    // Default task(s).
    grunt.registerTask('release', ['copy:release', 'uglify']);
    grunt.registerTask('default', ['typescript','concat:default','copy:default', 'release']);

};