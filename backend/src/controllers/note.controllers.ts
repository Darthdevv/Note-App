import { Request, Response, NextFunction, RequestHandler } from "express";
import { Note } from "../models/note.model";
import APIFeatures from "../utils/apiFeatures";
import AppError from "../utils/appError";
import { catchAsync } from "../helpers/catchAsync";
import mongoose from "mongoose";

interface Notebody {
  title?: string;
  content?: string;
}

interface NoteId {
  id?: string;
}

/**
 * @api {POST} /notes create note
 */
export const addNote = catchAsync(
  async (
    req: Request<unknown, unknown, Notebody, unknown>,
    res: Response,
    next: NextFunction
  ) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return next(new AppError("Please fill all fields", 400));
    }

    const newNote = await Note.create({
      title,
      content,
    });

    if (!newNote) {
      return next(new AppError("Failed to add new note", 500));
    }

    res.status(201).json({ message: "success", data: newNote });
  }
);

/**
 * @api {GET} /notes retreive all notes
 */
export const getNotes : RequestHandler = catchAsync(
  async (req, res, next) => {
    const features = new APIFeatures(Note.find(), req.query)
      .filter()
      .sort()
      .paginate();

    const notes = await features.query;

    if (!notes) {
      return next(new AppError("No Notes Found", 404));
    }

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: notes.length,
      data: { notes },
    });
  }
);

/**
 * @api {GET} /notes/:id retreive specific note by id
 */
export const getNote = catchAsync(
  async (req: Request<NoteId, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return next(new AppError("Invalid Note Id.", 400));
    }

    const note = await Note.findById(id);

    if (!note) {
      return next(new AppError("Couldn't find this Note.", 404));
    }

    res.status(200).json({ note });
  }
);

/**
 * @api {PUT} /notes/:id update specific note
 */
export const updateNote = catchAsync(
  async (req: Request< NoteId, unknown, Notebody, unknown>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return next(new AppError("Invalid Note Id.", 400));
    }

    const { title, content } = req.body;

    if (!title || !content ) {
      return next(new AppError("Please fill all fields.", 400));
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updatedNote) {
      return next(new AppError("Failed to update this Book", 400));
    }

    res.status(200).json({ updatedNote });
  }
);

/**
 * @api {PATCH} /notes/:id change note's title or content
 */
export const changeTitleOrContent = catchAsync(
  async (req: Request<NoteId, unknown, Notebody, unknown>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return next(new AppError("Invalid Note Id.", 400));
    }

    const note = await Note.findById(id);

    if (!note) {
      return next(new AppError("Note not found", 404));
    }

    const { title, content } = req.body;

    if (title) {
      note.title = title;
    }

    if (content) {
      note.content = content;
    }

    await note.save();

    res.status(200).json({
      status: "success",
      message: "Note updated successfully",
      data: note,
    });
  }
);

/**
 * @api {DELETE} /notes/:id delete specific note
 */
export const deleteNote = catchAsync(
  async (req: Request<NoteId, unknown, unknown, unknown>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return next(new AppError("Invalid Note Id.", 400));
    }

    if (!id) {
      return next(new AppError("Note unavailable.", 400));
    }

    await Note.findByIdAndDelete(id);

    res.sendStatus(204);
  }
);

/**
 * @api {DELETE} /notes delete all notes
 */
export const deleteAllNotes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Note.deleteMany({});

    res.sendStatus(204);
  }
);