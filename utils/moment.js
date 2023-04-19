const moment = require('moment');

const getCurrentDate = (format) => moment().format(format);

const formatDate = (date, format) => moment(new Date(date)).format(format);

const isSameDay = (date) => moment().isSame(new Date(date), 'day');

const subtractDay = (amount) => moment().subtract(amount, 'day');

module.exports = { formatDate, getCurrentDate, isSameDay, subtractDay };
