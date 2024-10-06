import { Router } from "express";
import {
  addNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
  changeTitleOrContent,
} from "../controllers/note.controllers";

const router = Router();

router.route("/").post(addNote).get(getNotes);
router.route("/:id").get(getNote).put(updateNote).patch(changeTitleOrContent).delete(deleteNote);

export default router;