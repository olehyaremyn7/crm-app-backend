const config = {
  fieldName: 'image',
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

module.exports = {
  config,
  limits,
  fileMimetypes,
};
