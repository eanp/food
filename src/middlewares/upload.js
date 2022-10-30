const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer');
const multerS3 = require('multer-s3')

const s3 = new S3Client()

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./upload')
    },
    filename: function (req,file,cb){
        const uniq = Date.now() + Math.round(Math.random() * 1E9)
        cb(null,file.fieldname+'-'+uniq+'.png')
    }
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.BUCKET,
        metadata: function (req, file, cb) {
          const uniq = Date.now() + Math.round(Math.random() * 1E9)
        cb(null, {fieldName:file.fieldname+'-'+uniq+'.png'});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })

// const upload = multer({storage})

module.exports = upload