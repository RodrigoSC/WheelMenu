/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 9000;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: port
				}
			}
		},

		watch: {
			main: {
				files: [ 'index.html','Gruntfile.js', 'pie.svg', 'styles.css'],
				options: {
					livereload: true
				}
			}		
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	grunt.registerTask( 'default', [ 'connect', 'watch' ] );

};

