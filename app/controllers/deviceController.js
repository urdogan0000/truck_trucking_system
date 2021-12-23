const pool = require("../adapters/databases/postgresql");

exports.getDevices = async (req, res) => {
  try {
    const results = await pool.query("select * from vehicles");
    const vehicles = results.rows;

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.createDevice = async (req, res) => {
  try {
    const vehicle_plate = req.body.vehicle_plate;
    const current_status = req.body.current_status || null;
    const plates = await pool.query("SELECT vehicle_plate from vehicles");

    const isPlateExist =
      plates.rows.filter(
        (plate) => plate.vehicle_plate === req.body.vehicle_plate
      ).length == 0
        ? false
        : true;

    if (isPlateExist) {
      return res.status(401).json({
        message: "This plate is created before",
      });
    }

    const result = await pool.query(
      "INSERT INTO vehicles(vehicle_plate, current_status,is_active) VALUES ($1,$2,true) RETURNING *",
      [vehicle_plate, current_status]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const plates = await pool.query("SELECT id from vehicles where id=$1", [
      req.body.id,
    ]);

    if (plates.rowCount === 0) {
      return res.status(401).json({ message: "This plate not exist " });
    }

    // setup the query
    var query = updateDeviceByID(req.body.id, req.body);

    // turn req.body into an array of values
    var colValues = Object.keys(req.body)
      .filter((item) => item !== "id")
      .map(function (key) {
        return req.body[key];
      });

    const result = await pool.query(query, colValues);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send("İstek atarken geçerli parametreler dışında parametreler girmediğinizden emin olunuz "+ error);
  }
};

//delete vehicle with vehicle_plate column
exports.deleteDevice = async (req, res) => {
  try {
    const vehicle_plate = req.body.vehicle_plate;

    const plates = await pool.query(
      "SELECT id from vehicles where vehicle_plate=$1",
      [vehicle_plate]
    );
    if (plates.rowCount === 0) {
      return res.status(401).json({ message: "This plate not exist " });
    }

    const result = await pool.query(
      "delete from vehicles where id=$1 RETURNING *",
      [plates.rows[0].id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send(error);
  }
};

//this func for dynamically update vehicles excepst vehicle_id
function updateDeviceByID(id, cols) {
  // Setup static beginning of query
  var query = ["UPDATE vehicles"];
  query.push("SET");

  // create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    if (key == "id") {
      console.log("here " + key);
    } else {
      set.push(key + " = ($" + i + ")");
    }
  });
  query.push(set.join(", "));

  // add the WHERE statement to look up by id
  query.push("WHERE id = " + id + " RETURNING *");

  // return a complete query string
  return query.join(" ");
}
