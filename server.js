const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// GET route
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST route
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input format" });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  const highest_alphabet = alphabets.length > 0 
    ? [alphabets.sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })).pop()] 
    : [];

  const response = {
    is_success: true,
    user_id: "your_name_ddmmyyyy",
    email: "your_email@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_alphabet,
  };

  res.json(response);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
