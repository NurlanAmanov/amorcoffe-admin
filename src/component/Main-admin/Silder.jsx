import React, { useState } from 'react';

function Slider() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]); // Yüklənmiş şəkillərin siyahısı

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImageAndPostUrl = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("File", file);
    formData.append("FolderName", "Slider");

    try {
      const uploadResponse = await fetch(
        "https://finalprojectt-001-site1.jtempurl.com/api/UploadFile/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) throw new Error("Failed to upload image!");

      const uploadData = await uploadResponse.json();
      const fullImageUrl = `https://finalprojectt-001-site1.jtempurl.com${uploadData.imgUrl}`;
      setImageUrl(fullImageUrl);

      // Save the uploaded image in the state
      setImages([...images, { url: fullImageUrl, id: uploadData.id }]);

      const sliderFormData = new FormData();
      sliderFormData.append("ImgUrl", fullImageUrl);

      const sliderResponse = await fetch(
        "https://finalprojectt-001-site1.jtempurl.com/api/Slider",
        {
          method: "POST",
          body: sliderFormData,
        }
      );

      if (!sliderResponse.ok) throw new Error("Failed to post image URL!");

      alert("Image URL successfully posted to slider!");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-lg font-bold text-center mb-4">Upload Image to Slider</h1>
      <div className="flex flex-col space-y-4">
        <input 
          type="file" 
          className="file:cursor-pointer file:border-0 file:py-2 file:px-4 file:rounded file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          onChange={handleFileChange} 
        />
        <button
          onClick={uploadImageAndPostUrl}
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg transition-colors ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? "Uploading..." : "Upload and Post URL"}
        </button>
       
      </div>
    </div>
  );
}

export default Slider;
