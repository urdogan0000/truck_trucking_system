const pool = require("../adapters/databases/postgresql");

exports.getVehicles = async (req, res) => {
  try {
    const results = await pool.query("select * from vehicles");
    const vehicles = results.rows;

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.createVehicle = async (req, res) => {
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

exports.updateVehicle = async (req, res) => {
  try {
    const plates = await pool.query("SELECT id from vehicles where id=$1", [
      req.body.id,
    ]);

    if (plates.rowCount === 0) {
      return res.status(401).json({ message: "This plate not exist " });
    }

    // Setup the query
    var query = updateVehiclesByID(req.body.id, req.body);

    // Turn req.body into an array of values
    var colValues = Object.keys(req.body)
      .filter((item) => item !== "id")
      .map(function (key) {
        return req.body[key];
      });

    const result = await pool.query(query, colValues);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.deleteVehicle = async (req, res) => {
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

//this func for dynamically update vehicles
function updateVehiclesByID(id, cols) {
  // Setup static beginning of query
  var query = ["UPDATE vehicles"];
  query.push("SET");

  // Create another array storing each set command
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

  // Add the WHERE statement to look up by id
  query.push("WHERE id = " + id + " RETURNING *");

  // Return a complete query string
  return query.join(" ");
}
