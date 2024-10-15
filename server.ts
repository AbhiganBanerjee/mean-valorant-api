//Import the express
import * as express from 'express';

//import the cors module
import * as cors from 'cors';
import getAllTypes from './modules/agent_types/GetAllTypes';
import getAllAgents from './modules/agents/GetAllAgents';
import getAllCountries from './modules/countries/GetAllCountries';
import refreshHeaderMiddleware from './modules/middleware/RefrehsHeaderMiddleWare';
import getAllUsers from './modules/users/GetAllUsers';
import registerUesrs from './modules/users/RegisterUsers';
import getAllArsenal from './modules/arsenal/GetAllArsenal';
import getAllMaps from './modules/maps/GetAllMaps';

//Define the port number
const port:any = 4040;

//Create a REST Object
const app:any = express();

//use the cors
app.use(cors());

//Use the refresh header middleware globally
app.use(refreshHeaderMiddleware);

//Use JSON and urlencoded to read form value and parse
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Use the sub-moudules
app.use("/getAllTypes",getAllTypes);
app.use("/getAllAgents",getAllAgents);
app.use("/getAllCountries",getAllCountries);
app.use("/getAllUsers",getAllUsers);
app.use("/registerUsers",registerUesrs);
app.use("/getAllArsenal", getAllArsenal);
app.use("/getAllMaps", getAllMaps);

//start the server
app.listen(port,()=>{
    console.log(`Server is started & listening at : localhost:${port}`);
});