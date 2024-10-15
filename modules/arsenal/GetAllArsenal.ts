//import the express module for REST Services
import * as express from 'express';

//import the MongoDB module
import * as mongodb from 'mongodb';

//Define the MongoURI
const MONGO_URI:any = 'mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority';

//Create a REST Object with express as sub-module
const getAllArsenal:any = express.Router();

//Create a GET Mode REST Method on the Module and Pass a Path Param
getAllArsenal.get('/:arsenalType',async(req:any,res:any):Promise<any>=>{
    //Create the clientObj and perform connection with DB
    const clientObj:any = new mongodb.MongoClient(MONGO_URI);

    try{
        //Get the DB ref
        let db:any = clientObj.db('ishopdb');

        //Read the Path Param
        let type:any = req.params.arsenalType;

        //define the weaponse array of JSON 
        let arsenal:any[] = [];
 
        //Perform Find operation in the Database based on the type
        if(type=="all"){
            //If the picked type is all then find all the arsenal
            arsenal = await db.collection('arsenal').find({}).toArray();
        }else{
            //Other wise find based on the type 
            arsenal = await db.collection('arsenal').find({'type':type}).toArray();
        }
        
        //Validate the Result and return response
        if(arsenal.length != 0)
            res.status(200).json(arsenal);
        else    
            res.status(404).json({'msg':'ERROR NOT FOUND!!'});
    }catch(err){
        console.error(err);
        res.status(500).json({'msg':'Internal Server Error!!'});
    }finally{
        clientObj.close(); res.end();
    }
});

//Export the module
export default getAllArsenal;