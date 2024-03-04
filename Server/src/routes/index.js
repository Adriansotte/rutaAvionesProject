import express from "express";
import {getCities} from "../controller/City.js"

const router = express.Router();

router.post("/getCities", getCities)


export default router