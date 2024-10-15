//import the express module
import * as express from 'express';

//import the mongodb module
import * as mongodb from 'mongodb';

//define the mongodb connection string
const MONGO_URI:any = 'mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority';

//Create a REST Service as sub-module
const getAllAgents:any = express.Router();

//Create a GET Mapped method to get all agents based on path param
getAllAgents.get("/:paramVal",async(req:any,res:any):Promise<any>=>{
    //Create the MongoDB client obj and collection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI);
    
    try{
        //create a variable to read path param which is Role
        let role:any = null;

        //read the path param
        role = req.params.paramVal;

        //Get the database reference
        let db:any = clientObj.db("ishopdb");

        //Perform find operation of agents based on the role passed as pathParam
        let agents:any[] = [{}];
        if(role=="all"){
            //Find all the agents
            agents = await db.collection('agents').find({}).toArray();
        }else{
            //Get only the agents which matches the role
            agents = await db.collection('agents').find({"role":role}).toArray();
        }

        //Validate and send the response
        if(agents.length != 0){
            res.status(200).json(agents);
        }else{
            //send error response
            res.status(404).json({"msg":"Error in fetching!"});
        }
    }catch(err){
        console.error(err);
         //send error response
         res.status(500).json({"msg":"Fatal Error!"});
    }finally{
        clientObj.close();
        res.end();
    }
});

//export the module
export default getAllAgents;