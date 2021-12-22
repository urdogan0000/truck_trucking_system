const Poll=require('pg').Pool;


const pool=new Poll({
    user:"postgres",
    password:"asd123",
    database:"tracking_database",
    host:"localhost",
    port:5432
})

module.exports=pool