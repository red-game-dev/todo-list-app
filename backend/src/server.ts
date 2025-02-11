import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let tasks: { id: number; text: string }[] = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTask = { id: tasks.length + 1, text: task };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: "Task cannot be empty" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
