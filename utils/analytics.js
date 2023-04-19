const { isSameDay, formatDate, subtractDay } = require('../utils/moment');
const { getTotalPrice } = require('./index');
const { DATE_FORMAT } = require('../constants');

const getOrdersMap = (orders = []) =>
  orders.reduce((daysOrders, order) => {
    const { date: orderDate } = order;
    const date = formatDate(orderDate, DATE_FORMAT);

    if (isSameDay(date)) {
      return daysOrders;
    }

    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }

    daysOrders[date].push(order);

    return daysOrders;
  }, {});

const calculatePrice = (orders = []) => orders.reduce((total, { list }) => (total += getTotalPrice(list)), 0);

const getDaysAmount = (orders) => Object.keys(orders).length;

const getYesterdayOrders = (orders) => getOrdersMap(orders)[formatDate(subtractDay(1), DATE_FORMAT)] || [];

const getOrdersPerDay = (orders, daysAmount) => +(orders.length / daysAmount).toFixed(0);

const getYesterdayOrdersAmount = (yesterdayOrders) => yesterdayOrders.length;

const getPercent = (yesterday, perDay) => +((yesterday / perDay - 1) * 100).toFixed(2);

const getCompare = (yesterday, perDay) => Math.abs(+(yesterday - perDay).toFixed(2) || 0);

const getIncomePerDay = (orders, daysAmount) => calculatePrice(orders) / daysAmount;

const isHigher = (percent) => percent > 0;

module.exports.createOverview = (orders = []) => {
  const overview = [];
  const daysAmount = getDaysAmount(orders);
  const yesterdayOrders = getYesterdayOrders(orders);

  const ordersPerDay = getOrdersPerDay(orders, daysAmount);
  const yesterdayOrdersAmount = getYesterdayOrdersAmount(yesterdayOrders);
  const ordersPercent = getPercent(yesterdayOrdersAmount, ordersPerDay);
  const ordersCompare = getCompare(yesterdayOrdersAmount, ordersPerDay);

  const absoluteOrdersPercent = Math.abs(ordersPercent);
  const isHigherOrdersPercent = isHigher(ordersPercent);

  overview.push({
    entity: 'Orders',
    measurement: 'orders',
    percent: absoluteOrdersPercent,
    compare: ordersCompare,
    yesterday: yesterdayOrdersAmount,
    isHigher: isHigherOrdersPercent,
    conclusion: `The number of orders yesterday was ${absoluteOrdersPercent}% ${
      isHigherOrdersPercent ? 'above' : 'below'
    } the average: ${ordersCompare} ${ordersCompare > 1 ? 'orders' : 'order'} per day`,
  });

  const incomePerDay = getIncomePerDay(orders, daysAmount);
  const yesterdayIncome = calculatePrice(yesterdayOrders);
  const incomePercent = getPercent(yesterdayIncome, incomePerDay);
  const incomeCompare = getCompare(yesterdayIncome, incomePerDay);

  const absoluteIncomePercent = Math.abs(incomePercent);
  const isHigherIncomePercent = isHigher(incomePercent);

  overview.push({
    entity: 'Income',
    measurement: 'dollar',
    percent: absoluteIncomePercent,
    compare: incomeCompare,
    yesterday: yesterdayIncome,
    isHigher: isHigherIncomePercent,
    conclusion: `Business income yesterday was ${absoluteIncomePercent}% ${
      isHigherIncomePercent ? 'above' : 'below'
    } average: $${incomeCompare} per day`,
  });

  return overview.reverse();
};

const getOrdersAverage = (orders, daysMap) => +(calculatePrice(orders) / getDaysAmount(daysMap)).toFixed(2);

const createChartData = (daysMap) =>
  Object.keys(daysMap).map((label) => {
    const dayOrders = daysMap[label];
    const income = calculatePrice(dayOrders);
    const orders = dayOrders.length;

    return {
      label,
      orders,
      income,
    };
  });

const createCharts = (daysMap) => {
  const chartData = createChartData(daysMap);
  const labels = chartData.map(({ label }) => label);

  return {
    income: {
      label: 'Income',
      color: 'rgb(103,58,183)',
      labels,
      data: chartData.map(({ income }) => income),
    },
    orders: {
      label: 'Orders',
      color: 'rgb(244,67,54)',
      labels,
      data: chartData.map(({ orders }) => orders),
    },
  };
};

module.exports.createAnalytics = (orders = []) => {
  if (!orders.length) {
    return {
      average: null,
      charts: null,
    };
  }

  const daysMap = getOrdersMap(orders);
  const average = getOrdersAverage(orders, daysMap);
  const charts = createCharts(daysMap);

  return { average, charts };
};
