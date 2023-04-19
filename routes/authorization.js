const { Router } = require('express');
const { login, registration } = require('../controllers/authorization');
const router = Router();

router.post('/login', login);

router.post('/registration', registration);

module.exports = router;
