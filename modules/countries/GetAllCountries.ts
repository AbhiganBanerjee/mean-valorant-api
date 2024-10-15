//import the express module for creating REST Services
import * as express from 'express';

//import the mongodb module for DB connectivity
import * as mongodb from 'mongodb';

//Define the MongoDB URI
const MONGO_URI:any = 'mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority';

//Create a REST object as Sub-Module
const getAllCountries:any = express.Router();

//Create a REST Service mapped with GET mode of request to get all the countries
getAllCountries.get('',async(req:any,res:any):Promise<any>=>{
    //Get the MongoClient and create connection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI);

    try{
        //Get the db reference 
        let db:any = clientObj.db('ishopdb');

        //Perform the GET Operation
        let countries:any = await db.collection('countries').find({}).toArray();
        
        //validate the result
        res.status(200).json(countries);
       
    }catch(err){
        console.error(err); 
        res.status(500).json({'msg':'Internal Fault!'})
    }finally{
        res.end();
        clientObj.close();
    }
})

//export the module
export default getAllCountries;