module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    shell: {
      runTests: {
        command: 'NODE_ENV=test NODE_PATH=. mocha test/*.js'
      }
    },
    watch:{
      script:{
        files:['test/*.js'],
        tasks:['shell']
      }
    }
  });

  grunt.registerTask('default', 'watch');
};
