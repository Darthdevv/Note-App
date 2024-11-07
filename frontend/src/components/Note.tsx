import { useDarkMode } from "../context/DarkModeContext";
import { Note as NoteType } from "../types/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete, MdEdit } from "react-icons/md";

interface NoteProps {
  note: NoteType;
  id: string;
  onDelete: (noteId: string) => Promise<void>;
  onEdit: (noteId: string) => Promise<void>;
  onFetch: (noteId: string) => Promise<void>;
}

const Note = ({ note, id, onDelete, onEdit, onFetch }: NoteProps) => {
  const { title, content, updatedAt, createdAt } = note;

  const createdUpdatedString =
    updatedAt > createdAt
      ? "Updated: " + formatDate(updatedAt)
      : "Created: " + formatDate(createdAt);

  const handleEditClick = async () => {
    await onFetch(id);
    onEdit(id);
  };

  // Use the dark mode context
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`note ${
        isDarkMode ? "dark" : ""
      } flex flex-col justify-between min-w-[150px] bg-[#F7F18A] border shadow-sm rounded-xl dark:bg-[#181C27] border-[#F2D161] dark:border-[#181C27] dark:shadow-neutral-700/70`}
    >
      <div className="flex-grow p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p
          className={`mt-2 h-[100px] note-body ${
            isDarkMode ? "dark" : ""
          } text-gray-500 dark:text-neutral-400 whitespace-pre-line`}
        >
          {content}
        </p>
      </div>
      <div className="flex items-center justify-between bg-[#F2D161] dark:border-[#181C27] border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-[#151923] border-[#F2D161] ">
        <p className="mt-1 text-sm dark:text-[rgba(255,255,255,0.5)] text-[rgba(0,0,0,0.5)]">
          {createdUpdatedString}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={handleEditClick}
            className="text-sm ml-2 p-2 rounded-full shadow-inner transition-shadow duration-200 ease-in-out hover:bg-[rgba(255,250,149,0.5)] dark:bg-gray-800"
            aria-label="Edit note"
          >
            <MdEdit className="text-white" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-sm ml-2 p-2 rounded-full shadow-inner transition-shadow duration-200 ease-in-out hover:bg-[rgba(255,250,149,0.5)] dark:bg-gray-800"
            aria-label="Delete note"
          >
            <MdDelete className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
