const { Router } = require('express');
const passport = require('passport');
const { getAll, getById, remove, create, update } = require('../controllers/category');
const jwtConfig = require('../config/jwt');
const {
  config: { fieldName },
} = require('../config/multer');
const upload = require('../middleware/upload');
const router = Router();

router.get('/', passport.authenticate(...jwtConfig), getAll);

router.get('/:id', passport.authenticate(...jwtConfig), getById);

router.delete('/:id', passport.authenticate(...jwtConfig), remove);

router.post('/', passport.authenticate(...jwtConfig), upload.single(fieldName), create);

router.patch('/:id', passport.authenticate(...jwtConfig), upload.single(fieldName), update);

module.exports = router;
