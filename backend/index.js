const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const SECRET = "SECRET";

// ✅ FIXED MongoDB URI
mongoose.connect("mongodb+srv://krishnamurty2802:ABcd%401234@cluster0.irjjhbq.mongodb.net/?retryWrites=true&w=majority");

// ✅ If that still fails, try this format without `appName` param:
/// mongoose.connect("mongodb+srv://krishnamurty2802:ABcd@1234@cluster0.irjjhbq.mongodb.net/notesapp?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({ email: String, password: String });
const noteSchema = new mongoose.Schema({ text: String, userId: mongoose.Schema.Types.ObjectId });
const User = mongoose.model("User", userSchema);
const Note = mongoose.model("Note", noteSchema);

app.use(cors());
app.use(express.json());

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
};

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hash });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send("Invalid");
  const token = jwt.sign({ id: user._id }, SECRET);
  res.send({ token });
});

app.get("/notes", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.send(notes);
});

app.post("/notes", auth, async (req, res) => {
  const note = await Note.create({ text: req.body.text, userId: req.user.id });
  res.send(note);
});

app.delete("/notes/:id", auth, async (req, res) => {
  await Note.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.send({ success: true });
});

app.listen(5000, () => console.log("Server running on port 5000"));
