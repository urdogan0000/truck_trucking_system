const pool = require("../adapters/databases/postgresql");
const { insertQuery, getColValues } = require("./crudHelpers/helperFunc");

exports.getLoc = async (req, res) => {
  try {
    const results = await pool.query("select * from log_location");
    const logs = results.rows;

    res.status(200).json(logs);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.createLoc = async (req, res) => {
  try {
    //this insertQuery() function creates dynamic insert query
    const query = insertQuery(req.body, "log_location");

    //this colValues holds req.body data
    const colValues = getColValues(req.body);

    const result = await pool.query(query, colValues);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send(error);
  }
};
