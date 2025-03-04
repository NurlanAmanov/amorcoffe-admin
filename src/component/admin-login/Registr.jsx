import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaTransgender } from "react-icons/fa";
import axios from "axios";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        dob: "",
        ImgUrl: "",
        gender: "",
        password: "",
        confirmPassword: "",
    });
    
    const [errors, setErrors] = useState({
        passwordMatch: "",
        userName: "",
        general: ""
    });

    const [passwordStrength, setPasswordStrength] = useState(0);

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 7) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[$@#&!]+/)) strength++;
        return strength;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (name === "userName") {
            setErrors({ ...errors, userName: "" });
        } else if (name === "password") {
            const strength = calculatePasswordStrength(value);
            setPasswordStrength(strength);
            setErrors({ ...errors, passwordMatch: "" });
        } else if (name === "confirmPassword") {
            setErrors({ ...errors, passwordMatch: "" });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        setErrors({
            passwordMatch: "",
            userName: "",
            general: ""
        });

        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, passwordMatch: "Şifrələr uyğun gəlmir!" });
            return;
        }

        try {
            const defaultImgUrl = "/Uploads/profilphoto/28a96018-5599-47df-a026-2c8584ebc1d7default-avatar-profile-icon-grey-photo-placeholder-99724602.webp";
            formData.ImgUrl = defaultImgUrl;

            const form = new FormData();
            form.append("Name", formData.name);
            form.append("Surname", formData.surname);
            form.append("UserName", formData.userName);
            form.append("Email", formData.email);
            form.append("DateOfBirth", formData.dob);
            form.append("Gender", formData.gender);
            form.append("Password", formData.password);
            form.append("ConfirmPassword", formData.confirmPassword);
            form.append("ImgUrl", formData.ImgUrl);

            const response = await axios.post(
                "https://finalprojectt-001-site1.jtempurl.com/api/Auth/Register",
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Qeydiyyat uğurla tamamlandı!");
            navigate("/");
        } catch (error) {
            const errorMessage = error.response?.data || "Belə bir istifadəçi artıq mövcuddur! ";
            
            if (typeof errorMessage === 'string' && errorMessage.includes("UserName")) {
                setErrors({ ...errors, userName: "Bu istifadəçi adı artıq istifadə olunub" });
            } else {
                setErrors({ ...errors, general: `Diqqət: ${errorMessage}` });
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4 py-8">
            <div className="w-full  bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6">
                    <h2 className="text-2xl font-bold text-center text-white">Qeydiyyat</h2>
                </div>
                
                <form onSubmit={handleRegister} className="p-6 space-y-4">
                    {errors.general && (
                        <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg text-center">
                            {errors.general}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                name="name"
                                type="text"
                                placeholder="Ad"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                name="surname"
                                type="text"
                                placeholder="Soyad"
                                value={formData.surname}
                                onChange={handleChange}
                                className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            name="userName"
                            type="text"
                            placeholder="İstifadəçi adı"
                            value={formData.userName}
                            onChange={handleChange}
                            className={`w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.userName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                            required
                        />
                        {errors.userName && (
                            <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                        )}
                    </div>

                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FaTransgender className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">Cinsiyyət seçin</option>
                            <option value="Kişi">Kişi</option>
                            <option value="Qadın">Qadın</option>
                        </select>
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            name="password"
                            type="password"
                            placeholder="Şifrə"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.passwordMatch ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                            required
                        />
                        <div className="mt-1 h-1 w-full bg-gray-200 rounded">
                            <div 
                                className={`h-1 rounded transition-all duration-300 ${
                                    passwordStrength === 1 ? 'bg-red-500 w-1/4' : 
                                    passwordStrength === 2 ? 'bg-orange-500 w-1/2' : 
                                    passwordStrength === 3 ? 'bg-yellow-500 w-3/4' : 
                                    passwordStrength === 4 ? 'bg-green-500 w-full' : 'bg-gray-200 w-0'
                                }`}
                            ></div>
                        </div>
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Şifrəni təsdiqləyin"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.passwordMatch ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"}`}
                            required
                        />
                        {errors.passwordMatch && (
                            <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                    >
                        Qeydiyyatdan keç
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;