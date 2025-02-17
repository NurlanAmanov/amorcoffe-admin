import React, { useState } from "react";
import axios from "axios";

function AddPromoCode() {
    const [formData, setFormData] = useState({
        code: "",
        discountPercentage: "",
        expirationDate: "",
        isActive: "true", // Seçim üçün string olaraq saxlanır
        appUserId: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Input dəyişikliklərini idarə et
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // `isActive` üçün boolean çevirmə
    const handleBooleanChange = (e) => {
        setFormData({ ...formData, isActive: e.target.value });
    };

    // **Promo kodu API-yə göndər (`multipart/form-data` ilə)**
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
    
        try {
            // `FormData` obyektini yaradıb dəyərləri əlavə edirik
            const data = new FormData();
            data.append("Code", formData.code);
            data.append("DiscountPercentage", formData.discountPercentage);
            data.append("IsActive", formData.isActive); // Boolean çevirmə
            data.append("AppUserId", formData.appUserId);
    
            // Əgər `expirationDate` boşdursa, onu göndərmə
            if (formData.expirationDate.trim() !== "") {
                data.append("ExpirationDate", new Date(formData.expirationDate).toISOString()); // ISO format
            }
    
            // Debug üçün göndərilən məlumatları göstər
            console.log([...data.entries()]);
    
            // Token əlavə et (əgər tələb olunursa)
            const headers = { "Content-Type": "multipart/form-data" };
            const yourToken = localStorage.getItem("token"); // Tokeni localStorage-dən götür
            if (yourToken) headers["Authorization"] = `Bearer ${yourToken}`;
    
            // `multipart/form-data` sorğusunu göndəririk
            const response = await axios.post(
                "https://finalprojectt-001-site1.jtempurl.com/api/Promocode/create",
                data,
                { headers }
            );
    
            setMessage("✅ Promo kod uğurla əlavə olundu!");
            setFormData({
                code: "",
                discountPercentage: "",
                expirationDate: "",  // Yenidən boş set edirik
                isActive: "true",
                appUserId: ""
            });
        } catch (error) {
            console.error("❌ Xəta baş verdi:", error);
            setMessage("❌ Promo kod əlavə edilərkən xəta baş verdi!");
        }
    
        setLoading(false);
    };
     
    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Promo Kod Əlavə Et</h2>
            {message && <p className="mb-4 text-center text-lg font-medium">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="code" placeholder="Promo kod" value={formData.code} onChange={handleChange} className="w-full border p-2 rounded" required/>

                <input type="number" name="discountPercentage" placeholder="Endirim Faizi" value={formData.discountPercentage} onChange={handleChange} className="w-full border p-2 rounded" required/>

                <input type="datetime-local" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="w-full border p-2 rounded" required/>

                <select name="isActive" value={formData.isActive} onChange={handleBooleanChange} className="w-full border p-2 rounded">
                    <option value="true">Aktiv</option>
                    <option value="false">Deaktiv</option>
                </select>

                <input type="text" name="appUserId" placeholder="İstifadəçi ID" value={formData.appUserId} onChange={handleChange} className="w-full border p-2 rounded" required/>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
                    {loading ? "Gözləyin..." : "Promo Kod Əlavə Et"}
                </button>
            </form>
        </div>
    );
}

export default AddPromoCode;
