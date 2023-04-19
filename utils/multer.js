const { getCurrentDate } = require('../utils/moment');
const { FILE_DATE_FORMAT } = require('../constants/multer');

const checkFileMimetypes = (fileMimetype, fileMimetypes) => fileMimetypes.some((mimetype) => fileMimetype === mimetype);

const createFileDate = () => getCurrentDate(FILE_DATE_FORMAT);

const createFileName = (originalName, fileDate) => `${fileDate}-${originalName}`;

module.exports = {
  checkFileMimetypes,
  createFileDate,
  createFileName,
};
