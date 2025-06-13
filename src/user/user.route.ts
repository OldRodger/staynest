import { Router } from "express";
import { getAllUsers, getUser } from "./user.controller.ts";

const router = Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser);

export default router;
