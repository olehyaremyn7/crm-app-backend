const multer = require('multer');
const { limits, fileMimetypes } = require('../config/multer');
const { checkFileMimetypes, createFileDate, createFileName } = require('../utils/multer');
const { SAVE_FILES_FOLDER_NAME } = require('../constants/multer');

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, SAVE_FILES_FOLDER_NAME);
  },
  filename(_, { originalname }, cb) {
    cb(null, createFileName(originalname, createFileDate()));
  },
});

const fileFilter = (_, { mimetype }, cb) => {
  cb(null, checkFileMimetypes(mimetype, fileMimetypes));
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
