import Task from '../Models/Task.js';

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      userId: req.userId
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    console.error('Create Task Error:', err);
    res.status(500).json({ message: err });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({createdAt : -1})
    res.status(200).json({ tasks });
  } catch (err) {
    console.error('Get Tasks Error:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findOne({ _id: taskId, userId: req.userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or you don’t have permission' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (err) {
    console.error('Update Task Error:', err);
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
  
    try {
      const task = await Task.findOne({ _id: taskId, userId: req.userId });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found or you don’t have permission' });
      }
  
      await Task.findByIdAndDelete(taskId);
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error('Delete Task Error:', err);
      res.status(500).json({ message: 'Error deleting task' });
    }
  };
