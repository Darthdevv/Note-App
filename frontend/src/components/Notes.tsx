import { useEffect, useState } from 'react'
import { apiClientHandler } from '../utils/ApiMethodHandler';
import { Note as NoteType } from '../types/note';
import Note from './Note';

const Notes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]); // State to hold notes
  const [loading, setLoading] = useState<boolean>(true); // State to show loading
  const [error, setError] = useState<string | null>(null); // State to handle error

  // Fetch notes function
  const GetNotes = async () => {
    try {
      // Fetch notes from the API
      const apiResponse = await apiClientHandler({
        GET: {
          endpoint: "api/notes", // Replace with your actual endpoint
        },
      })("GET");

      if ( apiResponse?.data) {
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

  // Call GetAllNotes when needed (e.g., useEffect or button click)

  useEffect(() => {
    GetNotes();
  }, []);

  return (
    <div>
      {/* <h1 className="text-start text-white">Notes</h1> */}
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

