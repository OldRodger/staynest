import { Router } from "express";
import { getAllHotels, getHotel } from "./hotel.controller.ts";

const router = Router();

router.route("/").get(getAllHotels);
router.route("/:id").get(getHotel);

export default router;
