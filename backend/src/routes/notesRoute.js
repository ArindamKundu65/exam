import express from "express";
import { addNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js";
import { hasToken } from "../middleware/hasToken.js";

const notesRoute = express.Router();

notesRoute.post("/create",hasToken, addNote);
notesRoute.get("/getAll",hasToken, getAllNotes)
notesRoute.delete("/delete/:id",hasToken, deleteNote)
notesRoute.put("/update/:id",hasToken, updateNote)


export default notesRoute;