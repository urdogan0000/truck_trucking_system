const pool = require("../adapters/databases/postgresql");

exports.getTypes = async (req, res) => {
  try {
    const results = await pool.query("select * from devices_type");
    const types = results.rows;

    res.status(200).json(types);
  } catch (error) {
    res.status(401).send(error);
  }
};

exports.createType = async (req, res) => {
  try {
    const device_name = req.body.device_name;
    const device_description = req.body.device_description || null;
    const device_names = await pool.query("SELECT device_name from devices_type");

    const isNameExist =
    device_names.rows.filter(
       
        (name) => name.device_name === device_name
      ).length == 0
        ? false
        : true;

    if (isNameExist || device_name.trim()==="") {
      return res.status(401).json({
        message: "This device type is created before",
      });
    }
    const result = await pool.query(
      "INSERT INTO devices_type(device_name, device_description,is_active) VALUES ($1,$2,true) RETURNING *",
      [req.body.device_name, device_description]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send(error);
  }
};

//delete vehicle with vehicle_plate
exports.deleteType = async (req, res) => {
  try {

     req.body.id;

    const devices_type = await pool.query(
      "SELECT id from devices_type where id=$1",
      [req.body.id]
    );
    if (devices_type.rowCount === 0) {
      return res.status(401).json({ message: "This device type not exist " });
    }

    const result = await pool.query(
      "delete from devices_type where id=$1 RETURNING *",
      [devices_type.rows[0].id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(401).send(error);
  }
};
