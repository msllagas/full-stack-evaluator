import { useEffect, useState } from 'react';
import api from "./api/axios"

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);


  const createTask = async (event) => {
    event.preventDefault();

    if (!newTask.trim()) return;

    try {
      const response = await api.post('/tasks', {
        title: newTask,
        isDone: false,
      });

      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      alert('Failed to create task');
    }
  }

  return (
    <div>
      <h2>Tasks</h2>

      <form onClick={createTask}>
        <input
            type="text"
            placeholder="Enter new task"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

       {tasks.length === 0 ? (
      <p>No tasks found.</p>
    ) : (
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} {task.isDone ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    )}
    </div>
  );
}

export default Tasks;
