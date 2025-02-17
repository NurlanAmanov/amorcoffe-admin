import React, { useState } from "react";

function CategoryAdd() {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("Categories");
  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Şəkil seçmə event-i
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Folder seçimi
  const handleFolderChange = (event) => {
    setFolderName(event.target.value);
  };

  // Şəkili yüklə və URL al
  const handleUpload = async () => {
    if (!file) {
      alert("Zəhmət olmasa bir şəkil seçin!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("File", file);
    formData.append("FolderName", folderName);

    try {
      const response = await fetch(
        "https://finalprojectt-001-site1.jtempurl.com/api/UploadFile/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Şəkil yüklənmədi!");

      const data = await response.json();
      console.log("Backend cavabı:", data);

      const fullUrl =
        "https://finalprojectt-001-site1.jtempurl.com" + data.imgUrl;
      setImageUrl(fullUrl);
      console.log("Şəkilin tam URL-i:", fullUrl);
    } catch (error) {
      console.error("Xəta:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateCategory = async () => {
    if (!categoryName || !imageUrl) {
      alert("Kategoriya adı və şəkil URL-i tələb olunur!");
      return;
    }
  
    setLoading(true);
  
    // ✅ FormData yaradıb backend-in gözlədiyi kimi göndəririk
    const formData = new FormData();
    formData.append("ImgUrl", imageUrl.replace("https://finalprojectt-001-site1.jtempurl.com", ""));
    formData.append("Name", categoryName);
  
    console.log("Göndərilən FormData:", formData);
  
    try {
      const response = await fetch(
        "https://finalprojectt-001-site1.jtempurl.com/api/Category",
        {
          method: "POST",
          body: formData, // JSON deyil, FormData göndəririk
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Kategoriya yaradılmadı! Server cavabı: ${errorText}`);
      }
  
      console.log("Yeni kategoriya yaradıldı!");
      alert("Kategoriya uğurla əlavə edildi!");
  
      // Formu sıfırla
      setCategoryName("");
      setImageUrl("");
      setFile(null);
    } catch (error) {
      console.error("Xəta:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Yeni Kategoriya Yarat</h2>

      {/* Şəkil seçmə */}
      <label className="block text-sm font-medium text-gray-700">Şəkil Seç</label>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* Folder seçimi */}
      <label className="block text-sm font-medium text-gray-700">Qovluq Seç</label>
      <select
        value={folderName}
        onChange={handleFolderChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      >
        <option value="Categories">Categories</option>
     
      </select>

      {/* Şəkli Yüklə Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full px-4 py-2 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} mb-4`}
      >
        {loading ? "Yüklənir..." : "Şəkli Yüklə"}
      </button>

      {/* Şəkil URL varsa, onu göstər */}
      {imageUrl && (
        <div className="mb-4 p-2 bg-gray-100 border rounded-lg">
          <p className="text-sm text-gray-600">Şəkil Yükləndi:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">{imageUrl}</a>
        </div>
      )}

      {/* Kategoriya adı */}
      <label className="block text-sm font-medium text-gray-700">Kategoriya Adı</label>
      <input
        type="text"
        placeholder="Kategoriya Adı"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      {/* Kategoriya Yarat Button */}
      <button
        onClick={handleCreateCategory}
        disabled={loading}
        className={`w-full px-4 py-2 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
      >
        {loading ? "Yaradılır..." : "Kategoriya Yarat"}
      </button>
    </div>
  );
}

export default CategoryAdd;
