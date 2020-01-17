const gcsUpload = require('gcs-upload')
// console.log(req.body);

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: "./keyfile-gcs.json",
      bucketName: 'ninefox-data'
    }
  })

  module.exports = upload