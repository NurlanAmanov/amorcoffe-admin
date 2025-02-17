import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Authlogin';
import { Link, useNavigate } from 'react-router-dom';

function Loginadmin() {
const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    UserNameOrEmail: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // İstifadəçi artıq daxil olubsa, onları dashboard səhifəsinə yönləndiririk.
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        console.log("📤 Göndərilən məlumatlar:", formData);

        // Backend login çağırışı
        const response = await login(formData);

        if (response && response.token) {
            console.log("✅ Token alındı:", response.token);
            navigate("/"); // İstifadəçi daxil olduqda yönləndir
        } else {
            console.error("❌ Token qaytarılmadı!");
            setError("Yanlış e-mail və ya şifrə.");
        }
    } catch (err) {
        console.error("❌ Giriş xətası:", err);
        setError("Giriş zamanı xəta baş verdi! Yanlış e-mail və ya şifrə.");
    }
};

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]"
      onClick={(e) => e.target.id === "modal-backdrop" && toggleProfile()}
    >
      <div className="bg-white shadow-lg p-6 rounded w-[90%] mx-auto xl:w-[450px] transition-opacity duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex items-center justify-between w-full mb-4">
          <h3 className="text-gray-800 text-3xl font-bold">Daxil olun</h3>
        
        </span>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="mb-8">
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              <span className="font-bold text-[#4A2C2A]">Amore Coffee – Qəhvə Həzzinin Zirvəsi!</span> Hesabınıza daxil olun və eksklüziv təkliflərdən yararlanın.
            </p>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label className="text-gray-800 text-sm mb-2 block">E-mail və ya İstifadəçi adı:</label>
            <input
              name="UserNameOrEmail"
              type="text"
              value={formData.UserNameOrEmail}
              onChange={handleChange}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 p-3 rounded-lg outline-blue-600"
              placeholder="E-mail və ya istifadəçi adınızı daxil edin"
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Şifrə</label>
            <input
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 p-3 rounded-lg outline-blue-600"
              placeholder="Şifrənizi daxil edin"
            />
          </div>

          <div className="mt-8">
            <button type="submit"
              className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Daxil ol
            </button>
          </div>
          <p className="text-sm mt-8 text-center text-gray-500">
            Hesabınız yoxdur? <Link to={"/qeydiyyat"} className="text-blue-600 font-semibold hover:underline">Qeydiyyatdan keçin</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Loginadmin