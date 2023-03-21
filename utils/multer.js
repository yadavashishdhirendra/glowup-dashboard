const multer = require('multer');
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, "uploads/")
      },
      filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
      }
});

const upload = multer({
      storage: storage,
      fileFilter: function (req, file, callback) {
            console.log(file)
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                  return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
      }
})

module.exports = {
      upload
}