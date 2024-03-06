import express from "express";
import { newGraph, findDestination } from "../controller/Graph.js";

const graphRoutes = express.Router();

graphRoutes.get("/graph", newGraph);
graphRoutes.post("/calculate-route", findDestination);



export default graphRoutes;