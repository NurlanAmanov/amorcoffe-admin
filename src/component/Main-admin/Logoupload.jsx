import React, { useState, useEffect } from 'react';

function Logoupload() {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState('Logo');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageList, setImageList] = useState([]); // Yüklənən şəkillərin siyahısı

  // 📌 Bütün şəkilləri çəkmək
  const fetchAllImages = async () => {
    try {
      const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Logo');
      if (!response.ok) throw new Error('Şəkillər yüklənmədi!');
      const data = await response.json();
      setImageList(data); // Şəkilləri siyahıya əlavə edin
    } catch (error) {
      console.error('Şəkillər yüklənmə xətası:', error);
      alert('Şəkillər yüklənməsi zamanı xəta baş verdi!');
    }
  };

  // Komponent yüklənəndə bütün şəkilləri çək
  useEffect(() => {
    fetchAllImages();
  }, []);

  // Faylın seçilməsi
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Qovluq adının dəyişdirilməsi
  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  // Şəkil yüklənməsi və URL alınması
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
      const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/UploadFile/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Fayl yüklənmədi!');
      const result = await response.json();

      // Serverdən alınan imgUrl ilə tam URL yaradılır
      const uploadedImageUrl = 'https://finalprojectt-001-site1.jtempurl.com/api/Logo' + result.imgUrl;
      setImageUrl(uploadedImageUrl); // URL-i state-də saxlayırıq

      // Yeni şəkili siyahıya əlavə edin
      setImageList([...imageList, { id: result.id, url: uploadedImageUrl }]);

      // URL-i serverə göndəririk
      await sendImageUrl(uploadedImageUrl); // URL göndəririk

      alert('Fayl uğurla yükləndi!');
    } catch (error) {
      console.error('Fayl yükləmə xətası:', error);
      alert('Fayl yüklənməsi zamanı xəta baş verdi!');
    } finally {
      setLoading(false);
    }
  };

  // URL-i serverə göndərmək
  const sendImageUrl = async (url) => {
    try {
      const token = localStorage.getItem('jwtToken'); // Token əlavə edin
      const fileName = url.split('/').pop(); // Faylın adını çıxarın (məsələn: b463c01a-13dd-4c2f-96f7-84527b705d3cspotify.png)
      const payload = { imgUrl: fileName }; // Göndərilən məlumatlar (API-nin gözlədiyi format)

      console.log("Göndərilən məlumatlar:", payload); // Debugging üçün

      const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Logo', {
        method: 'POST', // URL-i göndərmək üçün POST istifadə edin
        headers: {
          'Authorization': `Bearer ${token}`, // Token əlavə edin
          'Content-Type': 'application/json', // JSON formatında göndərin
        },
        body: JSON.stringify(payload), // Fayl adını JSON formatında göndərin
      });

      if (!response.ok) throw new Error('URL göndərilmədi!');
      const result = await response.json();
      console.log('URL serverə göndərildi:', result);
    } catch (error) {
      console.error('POST sorğusu xətası:', error);
      alert('URL göndərilməsi zamanı xəta baş verdi!');
    }
  };

  // Şəkili silmək funksiyası
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken'); // Token əlavə edin
      const response = await fetch(`https://finalprojectt-001-site1.jtempurl.com/api/Logo/${id}`, {
        method: 'DELETE', // Silmək üçün DELETE istifadə edin
        headers: {
          'Authorization': `Bearer ${token}`, // Token əlavə edin
        },
      });

      if (!response.ok) throw new Error('Şəkil silinmədi!');
      alert('Şəkil uğurla silindi!');

      // Silinən şəkili siyahıdan çıxarın
      setImageList(imageList.filter(image => image.id !== id));
    } catch (error) {
      console.error('Şəkil silinmə xətası:', error);
      alert('Şəkil silinməsi zamanı xəta baş verdi!');
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
        <div>
          <label className="block text-sm font-medium text-gray-700">Qovluq adı:</label>
          <select
            value={folderName}
            onChange={handleFolderNameChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="Logo">Logo</option>
            {/* Əlavə qovluqlar burada seçilə bilər */}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Yüklənir...' : 'Yüklə'}
        </button>
      </form>

      {/* Yüklənən şəkilləri göstər */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Yüklənən Şəkillər</h3>
        {imageList.map((image) => (
          <div key={image.id} className="flex items-center justify-between p-3 border rounded-lg mb-2">
            <a href={image.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">
              {image.url}
            </a>
            <button
              onClick={() => handleDelete(image.id)} // Şəkili sil
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Logoupload;