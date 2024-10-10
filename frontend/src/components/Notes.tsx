import { useEffect, useState } from 'react'
import { apiClientHandler } from '../utils/ApiMethodHandler';
import { Note } from '../types/note';

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]); // State to hold notes
  const [loading, setLoading] = useState<boolean>(true); // State to show loading
  const [error, setError] = useState<string | null>(null); // State to handle error

  // Fetch notes function
  const GetAllNotes = async () => {
    try {
      // Fetch notes from the API
      const apiResponse = await apiClientHandler({
        GET: {
          endpoint: "api/notes", // Replace with your actual endpoint
        },
      })("GET");

      if ( apiResponse?.data) {
        const fetchedNotes: Note[] = apiResponse.data.data.notes.map(
          (item: Note) => ({
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
    GetAllNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      {loading ? (
        <p>Loading notes...</p> // Show loading state
      ) : error ? (
        <p>{error}</p> // Show error if any
      ) : (
        <div>
          {notes.map((note) => (
            <div key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{note.createdAt}</p>
              <p>{note.updatedAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes