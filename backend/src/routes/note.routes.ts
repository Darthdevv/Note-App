import { Router } from "express";
import { addNote, deleteNote, getNote, getNotes, updateNote } from "../controllers/note.controllers";

const router = Router();

router.route("/").post(addNote).get(getNotes);
router.route("/:id").get(getNote).patch(updateNote).delete(deleteNote);

export default router;