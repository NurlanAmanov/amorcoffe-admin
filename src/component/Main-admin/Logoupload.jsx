import React, { useState } from 'react';

function Logoupload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Zəhmət olmasa bir fayl seçin!');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('File', file);
    formData.append('FolderName', 'Logo');

    try {
      const uploadResponse = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/UploadFile/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error('Fayl yüklənmədi!');
      const result = await uploadResponse.json();

      const uploadedImageUrl = `https://finalprojectt-001-site1.jtempurl.com${result.imgUrl}`;
      setImageUrl(uploadedImageUrl);

      // İkinci mərhələ: URL-i /api/Logo endpointinə göndəririk
      const logoFormData = new FormData();
      logoFormData.append('ImgUrl', result.imgUrl); // Sadece yolu göndəririk

      const logoResponse = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Logo', {
        method: 'POST',
        body: logoFormData,
      });

      if (!logoResponse.ok) throw new Error('Logo URL-i göndərilmədi!');
      alert('Logo URL-i uğurla göndərildi!');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Logo Yüklə</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fayl:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Yüklənir...' : 'Yüklə və Göndər'}
        </button>
      </form>
      {imageUrl && (
        <div className="mt-4 p-2 bg-gray-100 border rounded-lg">
          <p className="text-sm text-gray-600">Yüklənmiş Logo URL:</p>
          <img src={imageUrl} alt="Uploaded Logo" className="rounded" />
        </div>
      )}
    </div>
  );
}

export default Logoupload;
