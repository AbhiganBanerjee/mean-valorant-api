"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Import the express
var express = require("express");
//import the cors module
var cors = require("cors");
var GetAllTypes_1 = require("./modules/agent_types/GetAllTypes");
var GetAllAgents_1 = require("./modules/agents/GetAllAgents");
var GetAllCountries_1 = require("./modules/countries/GetAllCountries");
var RefrehsHeaderMiddleWare_1 = require("./modules/middleware/RefrehsHeaderMiddleWare");
var GetAllUsers_1 = require("./modules/users/GetAllUsers");
var RegisterUsers_1 = require("./modules/users/RegisterUsers");
var GetAllArsenal_1 = require("./modules/arsenal/GetAllArsenal");
var GetAllMaps_1 = require("./modules/maps/GetAllMaps");
//Define the port number
var port = 4040;
//Create a REST Object
var app = express();
//use the cors
app.use(cors());
//Use the refresh header middleware globally
app.use(RefrehsHeaderMiddleWare_1.default);
//Use JSON and urlencoded to read form value and parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Use the sub-moudules
app.use("/getAllTypes", GetAllTypes_1.default);
app.use("/getAllAgents", GetAllAgents_1.default);
app.use("/getAllCountries", GetAllCountries_1.default);
app.use("/getAllUsers", GetAllUsers_1.default);
app.use("/registerUsers", RegisterUsers_1.default);
app.use("/getAllArsenal", GetAllArsenal_1.default);
app.use("/getAllMaps", GetAllMaps_1.default);
//start the server
app.listen(port, function () {
    console.log("Server is started & listening at : localhost:".concat(port));
});
