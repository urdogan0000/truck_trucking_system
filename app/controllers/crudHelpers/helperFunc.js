exports.insertQuery=(cols,type)=>{
// Setup static beginning of query
var query = [`insert into ${type}(`];

// Create another array storing each set command
// and assigning a number value for parameterized query
var set = [];
var values = [];
Object.keys(cols).forEach(function (key, i) {
  if (key == "id") {
    console.log("here " + key);
  } else {
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
exports.updateQueryById=(id,cols,type)=>{
    // Setup static beginning of query
  var query = [`UPDATE ${type}`];
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
