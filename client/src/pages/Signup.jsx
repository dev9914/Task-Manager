import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../public/AuthImage.jpg';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: ''
  });
  const [loading , setLoading] = useState(false)
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      // Send the data to backend for signup
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`, 
        formData
      );

      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard after signup
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong. Try again.";
      setError(message);
    }
  };

  return (
    <div className='flex'>
      <div className='w-1/2'>
      <img src={image} alt="" className="w-full h-screen object-cover" />
      </div>

      <div className='w-1/2 flex justify-center items-center'>
    <div className="w-full max-w-[500px] flex flex-col gap-9">
    <div>
      <div className="text-[30px] font-extrabold text-primary">Create New Account 👋</div>
      <div className="text-[16px] font-normal text-secondary/90">Please enter details to create a new account
      </div>
    </div>
    <div className="flex flex-col gap-5"
    >
      <form onSubmit={handleSubmit}>

<div className="flex flex-col gap-2 w-full">
  <label className="text-sm font-medium text-gray-700">Full Name</label>
  <input
    type="text"
    name="fullName"
    placeholder="Enter your email address"
    value={formData.fullName}
    onChange={handleChange}
    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="flex flex-col gap-2 w-full">
  <label className="text-sm font-medium text-gray-700">Username</label>
  <input
    type="text"
    name="username"
    placeholder="Enter your email address"
    value={formData.username}
    onChange={handleChange}
    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="flex flex-col gap-2 w-full">
  <label className="text-sm font-medium text-gray-700">Password</label>
  <input
    type="password"
    name="password"
    placeholder="Enter your pasword"
    value={formData.password}
    onChange={handleChange}
    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
{error && (
        <div className="error-message text-red-500 font-sans mt-2">
          {error}
        </div>
      )}
<button
  type="submit"
  className={`px-6 py-2 mt-6 rounded-md w-[500px] bg-blue-600 text-white font-semibold transition duration-300 
    hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
>
  {loading ? 'Signing In...' : 'Sign Up'}
</button>
      </form>

      <div className="text-[16px] text-center text-gray-500 mt-4 max-[400px]:text-[14px]">Don't have an account? <Link className='text-blue-500 font-bold' to={'/'} >SignIn</Link></div>

    </div>
  </div>

      </div>

    </div>
  );
};

export default Signup;
