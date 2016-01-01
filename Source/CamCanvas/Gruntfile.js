/// <binding BeforeBuild='default' />
module.exports = function (grunt) {
    var rootFolder = process.cwd().replace(/\\/g, '/');
    var solutionFolder = rootFolder // one level up
        .substr(0, rootFolder.lastIndexOf('/'));
    solutionFolder = solutionFolder // two levels up
        .substr(0, solutionFolder.lastIndexOf('/'));

    // Load the plugins.
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), 
        shell: {
            swfCompile: {
                command: function () {
                    return ''+
                        '"' + solutionFolder + '/Compilers/SWFMil/swfmill.exe" ' +
                        'simple "' + rootFolder + '/CamCanvas.xml" ' +
                        '"' + rootFolder + '/bin/CamCanvas.swf"';
                }
            },
            asCompile: {
                command: function () {
                    return '' +
                        '"' + solutionFolder + '/Compilers/Mtasc/mtasc.exe" ' +
                        '-version 8 -swf "' + rootFolder + '/bin/CamCanvas.swf" ' +
                        '-main "' + rootFolder + '/CamCanvas.as" -cp lib/std -cp lib/std8 ' +
                        '-v -msvc -trace -strict ';
                }
            }
        },
        copy: {
            main: {
                files: [
                  // includes files within path
                  { expand: true, src: ['bin/CamCanvas.swf'], flatten: true, dest: solutionFolder + '/Source/QR-Redirect', filter: 'isFile' }
                ]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['shell:swfCompile', 'shell:asCompile', 'copy']);

};