import express from "express";
import {findDestination, newGraph} from "../controller/Graph.js";

const graphRoutes = express.Router();

graphRoutes.get("/graph", newGraph);
graphRoutes.post("/calculate-route", findDestination);


export default graphRoutes;