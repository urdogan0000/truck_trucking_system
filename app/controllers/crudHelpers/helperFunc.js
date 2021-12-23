exports.insertQuery = (cols, type) => {
  // Setup static beginning of query
  let query = [`insert into ${type}(`];

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  let set = [];
  let values = [];
  Object.keys(cols).forEach(function (key, i) {
    if (key !== "id") {
      set.push(key);
      values.push(`$${i + 1}`);
    } 
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push(") values(");
  query.push(values.join(", "));

  query.push(")  RETURNING *");

  // Return a complete query string
  return query.join(" ");
};
exports.updateQueryById = (id, cols, type) => {
  // Setup static beginning of query
  let query = [`UPDATE ${type}`];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  let set = [];
  Object.keys(cols).forEach(function (key, i) {
    if (key !== "id") {
      set.push(key + " = ($" + i + ")");
    } 
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push("WHERE id = " + id + " RETURNING *");

  // Return a complete query string
  return query.join(" ");
};
exports.getColValues = (body) => {
  const arr = Object.keys(body)
    .filter((item) => item !== "id")
    .map(function (key) {
      return body[key];
    });
  return arr;
};
