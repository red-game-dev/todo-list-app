import express from 'express';
import cors from 'cors';
import { TaskController } from './controllers/TaskController';

const app = express();
const taskController = new TaskController();

app.use(cors());
app.use(express.json());

app.post('/api/tasks', (req, res) => taskController.createTask(req, res));
app.get('/api/tasks', (req, res) => taskController.getTasks(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
