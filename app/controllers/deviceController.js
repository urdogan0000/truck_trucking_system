const pool = require("../adapters/databases/postgresql");
const {
  insertQuery,
  updateQueryById,
  getColValues,
} = require("./crudHelpers/helperFunc");

exports.getDevices = async (req, res) => {
  try {
    const results = await pool.query("select * from devices");
    const devices = results.rows;

    res.status(200).json(devices);
  } catch (error) {
    res.status(401).send(error);
  }
};
//insert into devices(vehicle_id,device_type_id,device_name) values (1,1,'GPS1');
exports.createDevice = async (req, res) => {
  try {
    //create insertQuery
    const query = insertQuery(req.body, "devices");
    //get colvalues from req.body
    const colValues = getColValues(req.body);

    const result = await pool.query(query, colValues);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const device = await pool.query("SELECT id from devices where id=$1", [
      req.body.id,
    ]);

    if (device.rowCount === 0) {
      return res.status(401).json({ message: "This device not exist " });
    }

    // setup the query
    const query = updateQueryById(req.body.id, req.body, "devices");
    // turn req.body into an array of values
    const colValues = getColValues(req.body);

    const result = await pool.query(query, colValues);

    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(401)
      .send(
        "İstek atarken geçerli parametreler dışında parametreler girmediğinizden emin olunuz " +
          error
      );
  }
};

//delete vehicle with vehicle_plate column
exports.deleteDevice = async (req, res) => {
  try {
    const device_id = req.body.id;

    const device = await pool.query(
      "SELECT id from devices where id=$1",
      [device_id]
    );
    if (device.rowCount === 0) {
      return res.status(401).json({ message: "This device not exist " });
    }

    const result = await pool.query(
      "delete from devices where id=$1 RETURNING *",
      [device.rows[0].id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send(error);
  }
};
