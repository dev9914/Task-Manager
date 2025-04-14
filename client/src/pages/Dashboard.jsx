import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AddTask from '../components/AddTask'
import GetAllTasks from '../components/GetTasks'
import axios from 'axios'

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token')


  const fetchTasks = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/api/task`, {headers : {Authorization: `Bearer ${token}`}});
      setTasks(response.data.tasks);
    //   console.log(response.data.tasks)
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleAddTask = async (task) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
  
      const response = await axios.post(`${apiUrl}/api/task/create`, task, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      fetchTasks();
      alert('Task Successfully Added');
      console.log("Task added:", response.data);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };
  return (
    <div>
      <div className='mb-5'>
      <Navbar />
      </div>
      <div>
      <AddTask onAdd={handleAddTask}/>
      </div>
      <GetAllTasks AllTask={tasks} fetchAllTasks={fetchTasks}/>
    </div>
  )
}

export default Dashboard