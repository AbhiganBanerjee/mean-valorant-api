//import the express module for REST Services
import * as express from 'express';

//import the Mongodb module
import * as mongodb from 'mongodb';

//Define MONGO URI
const MONGO_URI:any = 'mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority';

//create the REST object, as a Sub-module
const registerUesrs:any = express.Router();

//Create a POST Mode request to insert users in DB
registerUesrs.post('/',async(req:any,res:any):Promise<any>=>{
    //Create client obj and build MongoConnection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI);

    try{
        //Get the DB reference
        let db:any = clientObj.db('ishopdb');

        //Perform insert operation of the JSON data coming from req body in DB
        const result = await db.collection('reg_users').insertOne({
            'Username':req.body.Username,
            'Password':req.body.Password,
            'RePassword':req.body.RePassword,
            'Age':req.body.Age,
            'Country':req.body.Country
        });

        //Validate the result if inserted or not based on that return response
        if(result.insertedId){
            //if Inserted succesfully return positive response
            res.status(201).json({'code':201});
        }else{
            //If not inserted insertedId will be null
            res.status(404).json({'code':404});
        }
    }catch(err){
        console.error(err);  
        res.status(500).json({'code':500}); 
    }finally{
        clientObj.close();
        res.end();
    }
});

//Export the module
export default registerUesrs;

/*
{
    "Username":"David_nit",
    "Password":"david@123",
    "RePassword":"david@123",
    "Age":24,
    "Country":"United States"
}
*/