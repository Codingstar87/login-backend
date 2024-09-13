import {app} from "../src/app.js"
// import dotenv from "dotenv" ;
// dotenv.config({
//     path: "./.env"
// })
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})

// .then ( () => {
app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running  at port : ${process.env.PORT}`);
        
})
// })
// .catch( (error) => {
//     console.log("MongooDB connection Failed !! " ,error);
    
// })

import database from "../src/db/db.js"
database()


