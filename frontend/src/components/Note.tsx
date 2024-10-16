import { Note as NoteType } from "../types/note";
import { formatDate } from "../utils/formatDate";

interface NoteProps  {
  note: NoteType,
}

const Note = ({ note }: NoteProps) => {

  const { title, content, updatedAt, createdAt } = note;

  let createdUpdatedString: string;

  if (updatedAt > createdAt) {
    createdUpdatedString = "Updated: " + formatDate(createdAt);
  } else {
    createdUpdatedString = "Created: " + formatDate(updatedAt);
  }

  return (
    <div className="note flex flex-col justify-between min-w-[150px] bg-[#F7F18A] border shadow-sm rounded-xl dark:bg-neutral-900 border-[#F2D161] dark:shadow-neutral-700/70">
      <div className="flex-grow p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="mt-2  h-[100px]  text-gray-500 dark:text-neutral-400 note-body whitespace-pre-line">
          {content}
        </p>
      </div>
      <div className="bg-[#F2D161] border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 border-[#F2D161]">
        <p className="mt-1 text-sm text-[#171717]">
          {createdUpdatedString}
        </p>
      </div>
    </div>
  );
};

export default Note