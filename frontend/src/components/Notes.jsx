import { useEffect, useState } from "react";
import axios from "axios";

const Notes = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const getNotes = async () => {
    const res = await axios.get("http://localhost:5000/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const addNote = async () => {
    const newNote = {
      title: "New Note",
      content: "",
      hashtags: [],
    };
    const res = await axios.post("http://localhost:5000/notes", newNote, {
      headers: { Authorization: token },
    });
    setNotes([...notes, res.data]);
  };

  const filtered = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <input
          placeholder="Search notes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-1/2"
        />
        <button onClick={addNote} className="bg-green-500 text-white p-2">
          Add Note
        </button>
      </div>
      {!selectedNote ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((note) => (
            <div
              key={note._id}
              className="border p-4 cursor-pointer hover:shadow"
              onClick={() => setSelectedNote(note)}
            >
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.content.slice(0, 50)}...</p>
              <div className="text-sm text-gray-500">
                {note.hashtags?.join(" ")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border p-4">
          <input
            className="font-bold text-lg w-full border p-1 mb-2"
            value={selectedNote.title}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, title: e.target.value })
            }
          />
          <textarea
            className="w-full border p-2 h-40"
            value={selectedNote.content}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, content: e.target.value })
            }
          />
          <input
            placeholder="#tag1 #tag2"
            className="w-full border p-2 mt-2"
            value={selectedNote.hashtags?.join(" ")}
            onChange={(e) =>
              setSelectedNote({
                ...selectedNote,
                hashtags: e.target.value
                  .split(" ")
                  .filter((tag, i) => tag && i < 5),
              })
            }
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2"
            onClick={async () => {
              await axios.put(
                `http://localhost:5000/notes/${selectedNote._id}`,
                selectedNote,
                {
                  headers: { Authorization: token },
                }
              );
              getNotes();
              setSelectedNote(null);
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Notes;
