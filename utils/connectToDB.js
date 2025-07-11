import PG from "pg";
import env from 'dotenv'

env.config();
const requiredev = ['PG_PASSWORD', 'PG_DATABASE', 'PG_PORT', 'PG_HOST', 'PG_USER'];
 

requiredev.forEach((varname)=>{
    if(!process.env[varname]){
        console.log(`missing ${varname}`);
        process.exit(1);
    }
})

const db = new PG.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD
});


db.connect()
.then(()=> {
    console.log("conncted to database")
})
.catch((err)=>{
    console.log("not conncted ", err);
    process.exit(1);
})
db.on("error", (err)=>{
    console.log(`Database error`, err);
    process.exit(1)
})

export const query = (text, params) => db.query(text, params);