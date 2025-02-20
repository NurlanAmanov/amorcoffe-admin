import React, { useState } from 'react';

function Silder() {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState('logo');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);  // Şəkil URL-i üçün state

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
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
    formData.append('FolderName', folderName);
  
    try {
      const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Slider', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data', // Dəqiq Content-Type
        },
      });
  
      if (!response.ok) throw new Error('Fayl yüklənmədi!');
      const result = await response.json();
      setImageUrl(result.ImgUrl);
      alert('Fayl uğurla yükləndi!');
      console.log('Server cavabı:', result);
    } catch (error) {
      console.error('Fayl yükləmə xətası:', error);
      alert('Fayl yüklənməsi zamanı xəta baş verdi!');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Silder Yüklə</h2>

      {/* Fayl URL-inin göstərilməsi */}
      {imageUrl && (
        <div className="mb-4">
          <p><strong>Şəkil URL:</strong> {imageUrl}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fayl:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Qovluq adı:</label>
          <input
            type="text"
            value={folderName}
            onChange={handleFolderNameChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Yüklənir...' : 'Yüklə'}
        </button>
      </form>
    </div>
  );
}

export default Silder;
