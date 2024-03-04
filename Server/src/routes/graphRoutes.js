import express from "express";
import { newGraph } from "../controller/Graph.js";

const graphRoutes = express.Router();

graphRoutes.get("/graph", newGraph);

export default graphRoutes;