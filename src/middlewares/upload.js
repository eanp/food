const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./tmp')
    },
    filename: function (req,file,cb){
        const uniq = Date.now() + Math.round(Math.random() * 1E9)
        cb(null,file.fieldname+'-'+uniq+'.png')
    },
})

const upload = multer({
    storage,
    limits: { fileSize: 10 * Math.pow(1024, 4 )},
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image.jfif') {
    //       cb(null, true);
    //     } else {
    //       cb(null, false);
    //       return cb(new Error('Just allowed png and jpg type'));
    //     }
    //   },
})

module.exports = upload