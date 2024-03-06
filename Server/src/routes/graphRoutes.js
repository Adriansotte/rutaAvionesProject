import express from "express";
import { newGraph, findDestination } from "../controller/Graph.js";

const graphRoutes = express.Router();

graphRoutes.get("/graph", newGraph);
graphRoutes.get("/getRoute", findDestination);



export default graphRoutes;