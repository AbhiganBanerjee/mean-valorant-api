//import the express module
import * as express from 'express';

//import the mongodb module
import * as mongodb from 'mongodb';

//create ref to mongo uri
const MONGO_URI:any = "mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority";

//Create a sub-module as REST object
const getAllTypes:any = express.Router();

//Create a GET Mapped method to get all the types
getAllTypes.get("/",async (req:any,res:any):Promise<any>=>{
    //Create the mongoclient and conncet to mongodb
    const clientObj:any = new mongodb.MongoClient(MONGO_URI);

    try{
        //Get the database reference 
        let db:any = clientObj.db("ishopdb");

        //Perform the find operation on the collection
        let roles:any[] = await db.collection('agent_roles').find().toArray();;

        //validate the result
        if(roles.length!=0){
            res.status(200).json(roles);
        }else{
            res.status(404).json({'msg':'Error in fetching!'})
        }
    }catch(err){
        console.log(err);
    }finally{
        clientObj.close();
        res.end();
    }
});

//export the module
export default getAllTypes;