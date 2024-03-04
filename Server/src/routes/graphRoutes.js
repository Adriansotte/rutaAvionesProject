import express from "express";
import { newGraph, findDestination } from "../controller/Graph.js";

const graphRoutes = express.Router();

graphRoutes.get("/graph", newGraph);
graphRoutes.get("/", findDestination);


export default graphRoutes;