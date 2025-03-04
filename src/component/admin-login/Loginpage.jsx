import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authlogin";
import { FaSignInAlt } from "react-icons/fa";

function LoginPage() {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    UserNameOrEmail: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // İstifadəçi daxil olubsa, onları dashboard səhifəsinə yönləndir
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Hər cəhd edildikdə əvvəlki səhvləri təmizləyin
    try {
      const response = await login(formData);
      if (response.error) {
        setError(response.error);
      } else if (response.token) {
        navigate("/dashboard"); // İstifadəçi daxil olduqda yönləndir
      }
    } catch (err) {
      setError("Giriş zamanı xəta baş verdi! Yanlış e-mail və ya şifrə.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 p-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 relative">
        <h2 className="text-2xl font-bold text-center text-white flex items-center justify-center">
          <FaSignInAlt className="mr-3" /> Admin Panel Girişi
        </h2>
    
      </div>

      <form onSubmit={handleLogin} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            İstifadəçi adı
          </label>
          <input
            name="UserNameOrEmail"
            type="text"
            value={formData.UserNameOrEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
            placeholder="Admin istifadəçi adınızı daxil edin"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Şifrə
          </label>
          <input
            name="Password"
            type="password"
            value={formData.Password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
            placeholder="Şifrənizi daxil edin"
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold py-3 rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Admin Girişi
        </button>
        
        <div className="text-center text-sm">
          <Link 
            to="/admin-reset-password"
            
            className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
          >
            Şifrəni unutmusunuz?
          </Link>
        </div>
      </form>
    </div>
  </div>
  );
}

export default LoginPage;
