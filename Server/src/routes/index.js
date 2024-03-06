import express from "express";
import {getCities} from "../controller/City.js"

const router = express.Router();

router.get("/getCities", getCities)


export default router