import { Router } from "express";

import {
  getUsers,
  postUser,
  getUser,
} from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);

export default router;
