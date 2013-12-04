'use strict';

angular.module('librecmsApp')
  .service('UploadService', function UploadService($log, $upload) {
    function upload(files, next) {
      files.forEach(function(file) {
        $upload.upload({
          url: '/api/uploads',
          file: file
        }).success(next)
        .error(function(data) {
          $log.error('upload error ' + JSON.stringify(data));
        });
      });
    }
    return {
      upload: upload
    };
  });
