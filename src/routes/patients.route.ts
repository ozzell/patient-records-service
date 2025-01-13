import express from "express";
import {
  create,
  remove,
  get,
  getAll,
  update,
  search,
} from "../controllers/patients.controller";

const router = express.Router();

router.get("/search", search);

router.get("/", getAll);

router.get("/:id", get);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
