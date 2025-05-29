import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      navigate('/');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const user = {
        id: uuidv4(),
        name: name.trim(),
      };
      localStorage.setItem('userData', JSON.stringify(user));
      navigate('/');
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
