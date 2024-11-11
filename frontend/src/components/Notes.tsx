import { useEffect, useState, useRef } from "react";
import { apiClientHandler } from "../utils/ApiMethodHandler";
import { Note as NoteType } from "../types/note";
import { MdDeleteOutline } from "react-icons/md";
import Loader from "./Loader";
import Note from "./Note";
import { useDarkMode } from "../context/DarkModeContext";

const Notes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]); // State to hold notes
  const [loading, setLoading] = useState<boolean>(true); // State to show loading
  const [error, setError] = useState<string | null>(null); // State to handle error
  const [title, setTitle] = useState<string>(""); // State of Note title
  const [content, setContent] = useState<string>(""); // State of Note content
  const [isEdit, setIsEdit] = useState<boolean>(false); // State of Modal whether its add or edit
  const [idToBeUpdated, setIdToBeUpdated] = useState<string | null>(null); // Store the note ID for editing
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Use the dark mode context
  const { isDarkMode } = useDarkMode();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const resetModal = () => {
    setTitle("");
    setContent("");
    setIsEdit(false);
    setIdToBeUpdated(null);
  };

  // Fetch notes function
  const GetNotes = async () => {
    setLoading(true); // Start loading
    try {
      // Fetch notes from the API
      const apiResponse = await apiClientHandler({
        GET: {
          endpoint: "api/notes", // Replace with your actual endpoint
        },
      })("GET");

      if (apiResponse?.data) {
        const fetchedNotes: NoteType[] = apiResponse.data.data.notes.map(
          (item: NoteType) => ({
            _id: item._id,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })
        );
        setNotes(fetchedNotes); // Set the notes state
      } else {
        setError("Failed to fetch notes.");
      }
    } catch (error) {
      console.error("Error fetching All Notes", error);
      setError("An error occurred while fetching notes.");
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  const GetNoteById = async (noteId: string) => {
    setLoading(true); // Start loading
    try {
      // Fetch the note details from the API
      const apiResponse = await apiClientHandler({
        GET: {
          endpoint: `api/notes/${noteId}`, // Replace with your actual endpoint
        },
      })("GET");

      console.log(apiResponse.data.note);

      if (apiResponse?.data) {
        const { title, content, _id } = apiResponse.data.note;

        setIsEdit(true); // Set the modal to edit mode

        setIdToBeUpdated(_id); // Store the note ID for editing
        setTitle(title); // Set title in the modal form
        setContent(content); // Set content in the modal form
      } else {
        setError("Failed to fetch the note details.");
      }
    } catch (error) {
      console.error("Error Fetching Note Details", error);
      setError("An error occurred while fetching note details.");
    } finally {
      setLoading(false); // Stop loading after fetching note
    }
  };

  const AddNote = async () => {
    setLoading(true); // Start loading
    try {
      // Fetch notes from the API
      const apiResponse = await apiClientHandler({
        POST: {
          endpoint: "api/notes", // Replace with your actual endpoint
          body: {
            title,
            content,
          },
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        },
      })("POST");

      if (apiResponse?.data) {
        GetNotes(); // displays all notes including recently added note

        setIsEdit(false);

        setTitle(""); // reset title
        setContent(""); // reset content

        const closeButton = document.querySelector(
          '[data-hs-overlay="#hs-focus-management-modal"]'
        ) as HTMLButtonElement;
        closeButton?.click();
      } else {
        setError("Failed to add new note.");
      }
    } catch (error) {
      console.error("Error Adding New Note", error);
      setError("An error occurred while Adding Note.");
    } finally {
      setLoading(false); // Stop loading after adding note
    }
  };

  const EditNote = async (noteId: string) => {
    setLoading(true); // Start loading
    try {
      // Update the note using the API
      const apiResponse = await apiClientHandler({
        PATCH: {
          endpoint: `api/notes/${noteId}`, // Replace with your actual endpoint
          body: {
            title,
            content,
          },
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        },
      })("PATCH");

      if (apiResponse?.data) {
        GetNotes(); // Refreshes the notes to include the updated note
        setError(null);

        // Close the modal
        const closeButton = document.querySelector(
          '[data-hs-overlay="#hs-focus-management-modal"]'
        ) as HTMLButtonElement;
        closeButton?.click();
      } else {
        setError("Failed to edit the note.");
      }
    } catch (error) {
      console.error("Error Editing Note", error);
      setError("An error occurred while editing the note.");
    } finally {
      setLoading(false); // Stop loading after editing note
    }
  };

  const DeleteNote = async (noteId: string) => {
    setLoading(true); // Start loading
    try {
      // Send DELETE request to API
      const apiResponse = await apiClientHandler({
        DELETE: {
          endpoint: `api/notes/${noteId}`, // Replace with your actual endpoint
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        },
      })("DELETE");

      if (apiResponse) {
        GetNotes(); // Refresh notes after deleting the specified note
      } else {
        setError("Failed to delete the note.");
      }
    } catch (error) {
      console.error("Error Deleting Note", error);
      setError("An error occurred while deleting the note.");
    } finally {
      setLoading(false); // Stop loading after delete
    }
  };

  const DeleteAllNotes = async () => {
    setLoading(true);
    try {
      // Send DELETE request to API to delete all notes
      const apiResponse = await apiClientHandler({
        DELETE: {
          endpoint: `api/notes`, // Endpoint should support deleting all notes
        },
      })("DELETE");

      if (apiResponse) {
        GetNotes(); // Refresh notes list to confirm deletion
      } else {
        setError("Failed to delete all notes.");
      }
    } catch (error) {
      console.error("Error Deleting All Notes", error);
      setError("An error occurred while deleting all notes.");
    } finally {
      setLoading(false);
    }
  };

  // Call GetAllNotes when needed (e.g., useEffect or button click)

  useEffect(() => {
    GetNotes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        resetModal();
      }
    };

    // Add event listener when modal is open
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener when modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* <h1 classNameName="text-start text-white">Notes</h1> */}
      <div className="flex justify-end mr-[17px]">
        <button
          onClick={() => DeleteAllNotes()}
          type="button"
          className="py-2 note px-4 flex items-center justify-center  gap-x-2 text-xl font-medium rounded-lg border dark:border-[#1f2533] border-[#ff2b2ba1] bg-[#f26161] hover:bg-[#ff3b3b] dark:bg-[#181C27] text-black dark:text-[#f26161]  focus:outline-none focus:bg-[#ff3b3b] disabled:opacity-50 disabled:pointer-events-none mr-3"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-focus-management-modal"
        >
          <MdDeleteOutline
            className={isDarkMode ? "text-[#f26161]" : "text-white"}
          />
        </button>
        <button
          type="button"
          className="py-2 note px-4 flex items-center justify-center  gap-x-2 text-xl font-medium rounded-lg border border-[#ffd13a] dark:border-[#1f2533] bg-[#F2D161] dark:bg-[#181C27] hover:bg-[#ffd54b] text-black dark:text-white  focus:outline-none focus:bg-[#ffd54b] disabled:opacity-50 disabled:pointer-events-none"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-focus-management-modal"
          data-hs-overlay="#hs-focus-management-modal"
        >
          +
        </button>
      </div>

      <div
        id="hs-focus-management-modal"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-focus-management-modal-label"
      >
        <div
          ref={modalContentRef}
          className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
        >
          <div className="flex flex-col bg-[cornsilk] border shadow-sm rounded-xl pointer-events-auto dark:bg-[#181C27] dark:border-[#1f2533] dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b border-[#F2D161] dark:border-[#1f2533]">
              <h3
                id="hs-focus-management-modal-label"
                className="font-bold text-gray-800 dark:text-white"
              >
                {isEdit ? "Edit Note" : "Add Note"}
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-[#F2D161] dark:border-[#1f2533] bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-focus-management-modal"
                onClick={resetModal} // Reset modal state on close
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="input-label"
                onChange={handleTitleChange}
                value={title}
                className="py-3 px-4 block w-full border border-[#F2D161] dark:border-[#1f2533] rounded-lg text-sm focus:border-[#ffd54b] focus:ring-[#ffd54b] dark:bg-[#181C27] dark:placeholder-neutral-500 dark:text-neutral-400"
                placeholder="Enter note title"
                autoFocus={true}
              />
            </div>
            <div className="p-4 overflow-y-auto">
              <label
                htmlFor="input-label"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                Content
              </label>
              <textarea
                id="input-label"
                onChange={handleContentChange}
                value={content}
                className="py-3 px-4 block w-full h-[90px] border border-[#F2D161] dark:border-[#1f2533] rounded-lg text-sm focus:border-[#ffd54b] focus:ring-[#ffd54b] dark:bg-[#181C27] dark:placeholder-neutral-500 dark:text-neutral-400"
                placeholder="Write your thoughts here..."
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-[#F2D161] dark:border-[#1f2533]">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[#F2D161]  bg-white text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-overlay="#hs-focus-management-modal"
                onClick={resetModal} // Reset modal state on close
              >
                Close
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  isEdit ? EditNote(idToBeUpdated as string) : AddNote();
                }}
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#F2D161] dark:bg-[#fff] hover:bg-[#ffd54b] text-black  focus:outline-none focus:bg-[#ffd54b] disabled:opacity-50  disabled:cursor-not-allowed"
                disabled={!title || !content}
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader /> // Show loading state
      ) : error ? (
        <p
          className={`text-center ${
            isDarkMode ? "text-gray-500" : "text-black"
          } mt-6`}
        >
          {error}
        </p> // Show error if any
      ) : notes.length === 0 ? (
        <p
          className={`text-center ${
            isDarkMode ? "text-gray-500" : "text-black"
          } mt-6`}
        >
          You don't have any notes yet. Start by adding one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
          {notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              id={note._id}
              onDelete={DeleteNote}
              onEdit={EditNote}
              onFetch={GetNoteById}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
