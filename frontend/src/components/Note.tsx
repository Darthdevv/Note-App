import { Note as NoteType } from "../types/note";

interface NoteProps  {
  note: NoteType,
}

const Note = ({ note }: NoteProps) => {
  return (
    <div className="flex flex-col h-full bg-[#F7F18A] border shadow-sm rounded-xl dark:bg-neutral-900 border-[#F2D161] dark:shadow-neutral-700/70">
      <div className="flex-grow p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {note.title}
        </h3>
        <p className="mt-2 text-gray-500 dark:text-neutral-400 whitespace-pre-line">
          {note.content}
        </p>
      </div>
      <div className="bg-[#F2D161] border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 border-[#F2D161]">
        <p className="mt-1 text-sm text-gray-700 dark:text-neutral-400">
          {note.updatedAt}
        </p>
      </div>
    </div>
  );
};

export default Note