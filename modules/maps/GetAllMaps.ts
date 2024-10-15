//import the express module
import * as express from 'express';

//import the mongo module
import * as mongodb from 'mongodb';

//Define the Mongo URI
const MONGO_URI:any = 'mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority';

//Create a Router Module as REST Service
const getAllMaps:any = express.Router();

//Create a GET Mapped REST Service to get all the maps and read pathParam
getAllMaps.get('/:mapType',async(req:any,res:any):Promise<any>=>{
    //Create the clientObj and get connection
    const clientObj:any = new mongodb.MongoClient(MONGO_URI);

    try{
        //read the mapType from path param
        let mapSites:any = req.params.mapType;

        //Get the db ref
        let db:any = clientObj.db('ishopdb');

        //define maps array
        let maps:any[] = [{}];
 
        //Perform Find operation based on path param
        if(mapSites=='all'){
            maps = await db.collection('maps').find({}).toArray();
        }else{
            maps = await db.collection('maps').find({'sites':mapSites}).toArray();
        }

        //Validate and return result
        if(maps.length!=0){
            res.status(200).json(maps);
        }else{
            res.status(404).json({'msg':'ERROR!'});
        }
    }catch(err){    
        console.log(err);
        res.status(500).json({'msg':'FATAL ERROR!'});
    }finally{
        clientObj.close(); res.end();
    }
});

//export the module
export default getAllMaps;