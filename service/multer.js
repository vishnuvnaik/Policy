const multer = require("multer");

var upload = multer({
  dest: "tmp/csv/",
  fileFilter: function (req, file, cb) {
    cb(null, true);
  },
});

module.exports = upload;
