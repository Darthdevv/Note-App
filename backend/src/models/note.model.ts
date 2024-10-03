import mongoose, { InferSchemaType } from "mongoose";
const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof noteSchema>;

export const Note = model<Note>("Note", noteSchema);
