import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();

  // Get user data (assuming you stored it in localStorage as "user")
  const token = localStorage.getItem('token')
  const decode = jwtDecode(token)
  const username = decode?.username || "U";
  const initial = username.charAt(0).toUpperCase();
  return (
    <div className=" h-20 flex items-center justify-center text-base sticky top-0 z-10 text-white border-b border-gray-500/20">
    <div className="w-full max-w-[1400px] px-6 flex items-center justify-between gap-[14px] text-base">
        <Link to='/dashboard' className="w-full flex items-center gap-4 px-1.5 font-semibold text-[18px] no-underline text-black" >
            Task-Manager
        </Link>
        <ul className="w-full flex items-center justify-center gap-8 px-1.5 list-none max-md:hidden">
        <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    `flex items-center font-medium cursor-pointer no-underline transition-all duration-500 
     ${isActive ? 'text-blue-600 border-b-[1.8px] border-blue-600' : 'text-gray-800 hover:text-blue-600'}`
  }
>
  Dashboard
</NavLink>
        <NavLink
  to="/dashboard/explore"
  className={({ isActive }) =>
    `flex items-center font-medium cursor-pointer no-underline transition-all duration-500 
     ${isActive ? 'text-blue-600 border-b-[1.8px] border-blue-600' : 'text-gray-800 hover:text-blue-600'}`
  }
>
Explore
</NavLink>
        <NavLink
  to="/dashboard/blogs"
  className={({ isActive }) =>
    `flex items-center font-medium cursor-pointer no-underline transition-all duration-500 
     ${isActive ? 'text-blue-600 border-b-[1.8px] border-blue-600' : 'text-gray-800 hover:text-blue-600'}`
  }
>
  Blogs
</NavLink>
        <NavLink
  to="/dashboard/contact"
  className={({ isActive }) =>
    `flex items-center font-medium cursor-pointer no-underline transition-all duration-500 
     ${isActive ? 'text-blue-600 border-b-[1.8px] border-blue-600' : 'text-gray-800 hover:text-blue-600'}`
  }
>
  Contact
</NavLink>
        </ul>
        <div className="w-full h-full flex justify-end items-center gap-4 px-1.5 text-blue-600">
      <div className="w-9 h-9 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center text-lg">
        {initial}
      </div>

      {/* Logout */}
      <div
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
        className="text-end hover:text-purple-500 cursor-pointer text-[16px] font-semibold text-blue-600"
      >
        Logout
      </div>
    </div>
    </div>
</div>
  )
}

export default Navbar