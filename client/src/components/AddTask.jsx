import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';

const AddTask = ({onAdd}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const token = localStorage.getItem('token');
    const decode = jwtDecode(token)
    // console.log(decode.username)
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title.trim()) return;
  
      const newTask = {
        title,
        description,
      };
  
      onAdd(newTask);
      setTitle("");
      setDescription("");
    };
  
    return (
        <div >
            <div className='flex mb-3 justify-center'>
                <div>

            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
  👋 Hi {decode.username || '...'}, ready to add a new task?
</h2>
<p className="text-gray-600 text-xl ml-10 mb-4">
  Fill in the details below and keep your productivity on track!
</p>
                </div>
            </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Optional description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Task
        </button>
      </form>
        </div>
    );
}

export default AddTask