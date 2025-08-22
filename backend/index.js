const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expenseModel = require("./models/expenses.models");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose.connect("mongodb+srv://rupampaulbag:ronsunbum@cluster0.n2kiclx.mongodb.net/");
  console.log("Connected to database");
}

main().catch((err) => console.error("Unsuccessful connection:", err));

app.post("/add", async (req, res) => {
  try {
    const { date, category, description, amount } = req.body;
    const newExpense = await expenseModel.create({
      date,
      category,
      description,
      amount,
    });
    res.status(201).json(newExpense);
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ error: "Failed to add expense" });
  }
});

app.get("/show", async (req, res) => {
  try {
    const data = await expenseModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
