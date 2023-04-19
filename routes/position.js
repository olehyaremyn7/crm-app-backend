const { Router } = require('express');
const jwtConfig = require('../config/jwt');
const passport = require('passport');
const { getByCategoryId, create, update, remove } = require('../controllers/position');
const router = Router();

router.get('/:categoryId', passport.authenticate(...jwtConfig), getByCategoryId);

router.post('/', passport.authenticate(...jwtConfig), create);

router.patch('/:id', passport.authenticate(...jwtConfig), update);

router.delete('/:id', passport.authenticate(...jwtConfig), remove);

module.exports = router;
