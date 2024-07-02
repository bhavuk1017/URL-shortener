import express from "express";
import { saveData, getData, checkServer } from "../controller/data-controller.js";

const router = express.Router();

router.post("/save", saveData)
router.get("/get/:redirectFrom", getData)

router.post('/check', checkServer);

export default router;
