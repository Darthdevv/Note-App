import { useEffect, useState } from 'react'
import { apiClientHandler } from '../utils/ApiMethodHandler';
import { Note as NoteType } from '../types/note';
import Note from './Note';

const Notes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]); // State to hold notes
  const [loading, setLoading] = useState<boolean>(true); // State to show loading
  const [error, setError] = useState<string | null>(null); // State to handle error
  const [title, setTitle] = useState<string>(""); // State of Note title
  const [content, setContent] = useState<string>(""); // State of Note content

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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

        setTitle("");  // reset title
        setContent("");  // reset content

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

  // Call GetAllNotes when needed (e.g., useEffect or button click)

  useEffect(() => {
    GetNotes();
  }, []);

  return (
    <div>
      {/* <h1 classNameName="text-start text-white">Notes</h1> */}
      <div className='flex justify-end mr-[17px]'>
        <button
          type="button"
          className="py-2 note px-4 inline-flex  gap-x-2 text-xl font-medium rounded-lg border border-transparent bg-[#F2D161] hover:bg-[#ffd54b] text-black  focus:outline-none focus:bg-[#ffd54b] disabled:opacity-50 disabled:pointer-events-none"
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
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-[cornsilk] border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b border-[#F2D161]">
              <h3
                id="hs-focus-management-modal-label"
                className="font-bold text-gray-800 dark:text-white"
              >
                Add Note
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-[#F2D161] bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-focus-management-modal"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                className="py-3 px-4 block w-full border border-[#F2D161] rounded-lg text-sm focus:border-[#ffd54b] focus:ring-[#ffd54b] dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-neutral-400"
                placeholder="you@site.com"
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
                className="py-3 px-4 block w-full border border-[#F2D161] rounded-lg text-sm focus:border-[#ffd54b] focus:ring-[#ffd54b] dark:bg-neutral-90 dark:placeholder-neutral-500 dark:text-neutral-400"
                placeholder="you@site.com"
                autoFocus={true}
              />
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-[#F2D161]">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-[#F2D161] bg-white text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                data-hs-overlay="#hs-focus-management-modal"
              >
                Close
              </button>
              <button
                onClick={AddNote}
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#F2D161] hover:bg-[#ffd54b] text-black  focus:outline-none focus:bg-[#ffd54b] disabled:opacity-50 disabled:pointer-events-none"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <p>Loading notes...</p> // Show loading state
      ) : error ? (
        <p>{error}</p> // Show error if any
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes

