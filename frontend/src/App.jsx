import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.get(`${API}/notes`, { headers: { Authorization: token } })
        .then(res => setNotes(res.data))
        .catch(() => setToken(null));
    }
  }, [token]);

  const login = async () => {
    const res = await axios.post(`${API}/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  const addNote = async () => {
    const res = await axios.post(`${API}/notes`, { text: note }, { headers: { Authorization: token } });
    setNotes([...notes, res.data]);
    setNote("");
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/notes/${id}`, { headers: { Authorization: token } });
    setNotes(notes.filter(n => n._id !== id));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setNotes([]);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {!token ? (
        <div className="flex flex-col gap-2">
          <input className="border p-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input className="border p-2" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
          <button className="bg-blue-500 text-white p-2" onClick={login}>Login / Register</button>
        </div>
      ) : (
        <div>
          <div className="flex gap-2 mb-4">
            <input className="border p-2 flex-1" placeholder="New Note" value={note} onChange={e => setNote(e.target.value)} />
            <button className="bg-green-500 text-white px-4" onClick={addNote}>Add</button>
            <button className="bg-red-500 text-white px-4" onClick={logout}>Logout</button>
          </div>
          <ul className="space-y-2">
            {notes.map((n) => (
              <li key={n._id} className="border p-2 bg-gray-100 flex justify-between items-center">
                <span>{n.text}</span>
                <button className="text-red-500" onClick={() => deleteNote(n._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
