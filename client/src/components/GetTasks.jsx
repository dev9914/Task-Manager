import React, { useState } from 'react';
import axios from 'axios';

const GetAllTasks = ({ AllTask, fetchAllTasks }) => {
  const token = localStorage.getItem('token');
  const apiUrl = import.meta.env.VITE_API_URL;

  // State to filter tasks by their status
  const [filter, setFilter] = useState('all'); // Default is 'all'

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/task/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAllTasks();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(
        `${apiUrl}/api/task/update/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAllTasks();
    } catch (err) {
      console.error("Mark complete failed:", err);
    }
  };

  // Function to filter tasks by their status
  const filterTasks = (tasks) => {
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks; // 'all' - no filter applied
    }
  };

  const filteredTasks = filterTasks(AllTask);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📝 Your Tasks</h2>

      {/* Filter Options */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`p-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`p-2 rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`p-2 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">You have no tasks yet.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow border border-gray-200"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                {task.completed ? (
                  <span className="text-green-500 font-medium">✔ Completed</span>
                ) : (
                  <>
                    <button
                      onClick={() => handleComplete(task._id)}
                      className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                    >
                      Complete
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetAllTasks;
