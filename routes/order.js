const { Router } = require('express');
const passport = require('passport');
const jwtConfig = require('../config/jwt');
const { getAll, create } = require('../controllers/order');
const router = Router();

router.get('/', passport.authenticate(...jwtConfig), getAll);

router.post('/', passport.authenticate(...jwtConfig), create);

module.exports = router;
