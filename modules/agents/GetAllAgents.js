"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//import the express module
var express = require("express");
//import the mongodb module
var mongodb = require("mongodb");
//define the mongodb connection string
var MONGO_URI = 'mongodb+srv://system:tiger@mymongodb.vbqay2j.mongodb.net/mymongodb?retryWrites=true&w=majority';
//Create a REST Service as sub-module
var getAllAgents = express.Router();
//Create a GET Mapped method to get all agents based on path param
getAllAgents.get("/:paramVal", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clientObj, role, db, agents, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clientObj = new mongodb.MongoClient(MONGO_URI);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, 7, 8]);
                role = null;
                //read the path param
                role = req.params.paramVal;
                db = clientObj.db("ishopdb");
                agents = [{}];
                if (!(role == "all")) return [3 /*break*/, 3];
                return [4 /*yield*/, db.collection('agents').find({}).toArray()];
            case 2:
                //Find all the agents
                agents = _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, db.collection('agents').find({ "role": role }).toArray()];
            case 4:
                //Get only the agents which matches the role
                agents = _a.sent();
                _a.label = 5;
            case 5:
                //Validate and send the response
                if (agents.length != 0) {
                    res.status(200).json(agents);
                }
                else {
                    //send error response
                    res.status(404).json({ "msg": "Error in fetching!" });
                }
                return [3 /*break*/, 8];
            case 6:
                err_1 = _a.sent();
                console.error(err_1);
                //send error response
                res.status(500).json({ "msg": "Fatal Error!" });
                return [3 /*break*/, 8];
            case 7:
                clientObj.close();
                res.end();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); });
//export the module
exports.default = getAllAgents;
