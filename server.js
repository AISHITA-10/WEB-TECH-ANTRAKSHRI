const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/antakshari", { useNewUrlParser: true });

const wordSchema = new mongoose.Schema({
  word: { type: String, unique: true, required: true },
});

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  status: { type: String, default: "ongoing" }, // Status: ongoing or completed
});

const Word = mongoose.model("Word", wordSchema);
const Player = mongoose.model("Player", playerSchema);

// Start Game Endpoint
app.post("/start", async (req, res) => {
  const { playerName } = req.body;

  const existingPlayer = await Player.findOne({ name: playerName });
  if (!existingPlayer) {
    const newPlayer = new Player({
      name: playerName,
      score: 0,
      streak: 0,
    });
    await newPlayer.save();
  }

  const words = await Word.find();
  if (!words.length) {
    return res.status(500).json({ error: "No words available in the database." });
  }
  const randomWord = words[Math.floor(Math.random() * words.length)].word;
  res.json({ word: randomWord, status: "ongoing" });
});

// Validate User Input
app.post("/validate", async (req, res) => {
  const { inputWord, currentWord, playerName } = req.body;

  if (!currentWord || !currentWord.length) {
    return res.status(400).json({ message: "Current word is invalid or undefined." });
  }

  const lastLetter = currentWord[currentWord.length - 1].toLowerCase();
  if (inputWord[0].toLowerCase() !== lastLetter) {
    return res.status(400).json({ message: "Word must start with the correct letter." });
  }

  const isValid = await Word.findOne({ word: inputWord.toLowerCase() });
  if (!isValid) {
    const player = await Player.findOne({ name: playerName });
    player.status = "completed"; // Mark game as completed if word is invalid
    await player.save();
    return res.status(400).json({ message: "Word not found in database. Game Over!", status: "completed" });
  }

  // Scoring logic
  const wordLengthPoints = inputWord.length; // Points based on word length
  const player = await Player.findOne({ name: playerName });
  if (player) {
    player.streak += 1;
    const streakBonus = player.streak * 2; // Bonus points for streaks
    player.score += wordLengthPoints + streakBonus;
    player.status = "ongoing"; // Keep the game ongoing
    await player.save();
  }

  res.json({ message: "Valid word!", nextWord: inputWord, lastLetter: inputWord[inputWord.length - 1], status: "ongoing" });
});

// Leaderboard Endpoint
app.get("/leaderboard", async (req, res) => {
  const players = await Player.find().sort({ score: -1 }).limit(10); // Top 10 players
  res.json(players);
});

// Start the server
app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
