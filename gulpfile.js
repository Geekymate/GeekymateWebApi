var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var nodemon = require('nodemon');

var paths = {
  all: ['src/**/*.js'],
  backend: 'dist/backend.js',
  src: 'dist',
  dist: 'dist',
  tmp: 'tmp'
};

var port = process.env.PORT || 8080;

gulp.task('webpack', function(done) {
  webpack(config).run(onBuild(done));
});

gulp.task('watch', function() {
  webpack(config).watch(100, function(err, stats) {
    onBuild()(err, stats);
    nodemon.restart();
  });
});

gulp.task('run', ['watch'], function() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, paths.backend),
    ignore: ['*'],
    watch: ['src'],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Restarted!');
  });
});

gulp.task('default', ['run']);

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) {
      done();
    }
  }
}
