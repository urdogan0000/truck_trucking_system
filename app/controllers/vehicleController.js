const pool = require("../adapters/databases/postgresql");
const {insertQuery,updateQueryById,getColValues}=require('./crudHelpers/helperFunc')

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
    //this insertQuery() function creates dynamic insert query
    const query = insertQuery(req.body,"vehicles");

    //this colValues holds req.body data
    const colValues = getColValues(req.body)
    const result = await pool.query(query, colValues);

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
    //check the specific vehicle by id
    if (plates.rowCount === 0) {
      return res.status(401).json({ message: "This id not exist " });
    }
    //if user wanna change vehicle plate he can t assign to other created vehicle_plate
    const checkPlateName=await pool.query("SELECT id from vehicles where vehicle_plate=$1", [
      req.body.vehicle_plate,
    ]);
    if (checkPlateName.rowCount > 0) {
      return res.status(401).json({ message: "This plate is exist you can t patch  " });
    }

    // updateQuryById() func creates dynamic updade sql query
    var query = updateQueryById(req.body.id, req.body,"vehicles");

    // Turn req.body into an array of values
    var colValues = getColValues(req.body)

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

