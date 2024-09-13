import mongoose from 'mongoose';

import { DB_NAME } from '../constants.js';


const dataBase = async () => {
    try {
        const id = await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB is connected, and the DB host is: ${id.connection.host}`);
    } catch (error) {
        console.log(`Error:` , error);
        process.exit(1);
    }
};

                        

// Export the database function
export default dataBase
