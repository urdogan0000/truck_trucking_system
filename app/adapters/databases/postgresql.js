const Poll=require('pg').Pool;

const PORT=process.env.PGPORT || 3000
const pool=new Poll({
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
    database:process.env.PGDATABASE,
    host:process.env.PGHOST,
    port:PORT
})

module.exports=pool