import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
    const [formData, setFormData] = useState({
        imgUrl: "",
        title: "",
        description: "",
        about: "",
        price: 0,
        discount: 0,
        categoryId: "",
        tagIds: [],
        finalPrice: 0,
        orderIds: []
    });

    const [image, setImage] = useState(null); // Şəkili ayrıca saxlayırıq
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    // Input dəyişikliklərini idarə et
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Tag və Order ID-ləri əlavə etmək üçün
    const handleArrayChange = (e, fieldName) => {
        setFormData({ 
            ...formData, 
            [fieldName]: e.target.value.split(",").map(item => item.trim()) 
        });
    };

    // Şəkil seçildikdə
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // **Şəkili yüklə və URL əldə et**
    const uploadImage = async () => {
        if (!image) {
            setMessage("❌ Zəhmət olmasa bir şəkil seçin!");
            return null;
        }

        setUploading(true);
        setMessage("");

        try {
            const data = new FormData();
            data.append("File", image); // API `File` parametri tələb edir
            data.append("FolderName", "Products"); // Şəkil "Products" qovluğuna yüklənir

            const response = await axios.post("https://finalprojectt-001-site1.jtempurl.com/api/Upload", data, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${yourToken}`
                }
            });
            

            const imageUrl = response.data; // Geri dönən URL
            setUploading(false);
            return imageUrl;
        } catch (error) {
            console.error("❌ Şəkil yükləmə xətası:", error);
            setMessage("❌ Şəkil yüklənərkən xəta baş verdi!");
            setUploading(false);
            return null;
        }
    };

    // **Məhsulu API-yə göndər**
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        let imageUrl = formData.imgUrl;

        // Əgər yeni şəkil seçilibsə, əvvəlcə onu yükləyirik
        if (image) {
            imageUrl = await uploadImage();
            if (!imageUrl) {
                setLoading(false);
                return; // Əgər şəkil yüklənməsə, məhsulu göndərməyə ehtiyac yoxdur
            }
        }

        try {
            const productData = {
                ...formData,
                imgUrl: imageUrl, // Yüklənmiş şəkilin URL-ni əlavə edirik
            };

            await axios.post("https://finalprojectt-001-site1.jtempurl.com/api/Product", productData, {
                headers: { "Content-Type": "application/json" }
            });

            setMessage("✅ Məhsul uğurla əlavə olundu!");
            setFormData({
                imgUrl: "",
                title: "",
                description: "",
                about: "",
                price: 0,
                discount: 0,
                categoryId: "",
                tagIds: [],
                finalPrice: 0,
                orderIds: []
            });
            setImage(null);
        } catch (error) {
            console.error("❌ Məhsul əlavə etmə xətası:", error);
            setMessage("❌ Məhsul əlavə edilərkən xəta baş verdi!");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Məhsul əlavə et</h2>
            {message && <p className="mb-4 text-center text-lg font-medium">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" placeholder="Başlıq" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded"/>
                <input type="text" name="description" placeholder="Təsvir" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded"/>
                <input type="text" name="about" placeholder="Haqqında" value={formData.about} onChange={handleChange} className="w-full border p-2 rounded"/>
                
                <input type="number" name="price" placeholder="Qiymət" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded"/>
                <input type="number" name="discount" placeholder="Endirim" value={formData.discount} onChange={handleChange} className="w-full border p-2 rounded"/>
                <input type="text" name="categoryId" placeholder="Kateqoriya ID" value={formData.categoryId} onChange={handleChange} className="w-full border p-2 rounded"/>
                
                <input type="text" name="tagIds" placeholder="Tag ID-lər (vergüllə ayırın)" value={formData.tagIds.join(", ")} onChange={(e) => handleArrayChange(e, "tagIds")} className="w-full border p-2 rounded"/>
                <input type="number" name="finalPrice" placeholder="Son qiymət" value={formData.finalPrice} onChange={handleChange} className="w-full border p-2 rounded"/>
                <input type="text" name="orderIds" placeholder="Sifariş ID-lər (vergüllə ayırın)" value={formData.orderIds.join(", ")} onChange={(e) => handleArrayChange(e, "orderIds")} className="w-full border p-2 rounded"/>

                {/* Şəkil yükləmə inputu */}
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded"/>
                
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading || uploading}>
                    {loading ? "Məhsul əlavə edilir..." : uploading ? "Şəkil yüklənir..." : "Məhsulu əlavə et"}
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
