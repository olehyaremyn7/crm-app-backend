module.exports = function (req, res) {
  res.status(404).send(`
      <div>
          <h1>PowerCRM API</h1>
          <h2>NOT FOUND API PATH</h2>
      </div>
  `);
};
