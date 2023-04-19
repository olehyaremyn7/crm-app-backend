const { Router } = require('express');
const passport = require('passport');
const jwtConfig = require('../config/jwt');
const { overview, analytics } = require('../controllers/analytics');
const router = Router();

router.get('/overview', passport.authenticate(...jwtConfig), overview);

router.get('/', passport.authenticate(...jwtConfig), analytics);

module.exports = router;
