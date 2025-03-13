import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SocialMedia() {
  const [socialMediaUrls, setSocialMediaUrls] = useState({
    FacebookUrl: '',
    LinkedinUrl: '',
    InstagramUrl: '',
    TwitterUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]); 
  const [refreshData, setRefreshData] = useState(false); // Yeniləmə üçün state əlavə et

  // 📌 API-dən sosial media URL-ləri yüklə
  const fetchSocialMediaUrls = async () => {
    try {
      const response = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/SocialMedia');
      setUrls(response.data);
      setLoading(false);
    } catch (err) {
      setError('Xəta baş verdi. URL-ləri yükləmək mümkün olmadı.');
      setLoading(false);
    }
  };

  // useEffect içində refreshData hər dəfə dəyişəndə API çağırışı et
  useEffect(() => {
    fetchSocialMediaUrls();
  }, [refreshData]); 

  // 📌 Handle form submission (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(socialMediaUrls).forEach(key => {
      if (socialMediaUrls[key]) {
        formData.append(key, socialMediaUrls[key]);
      }
    });

    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post('https://finalprojectt-001-site1.jtempurl.com/api/SocialMedia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Sosial media URL-ləri uğurla göndərildi!');
      setRefreshData(prev => !prev); // Yenidən yükləmə üçün refreshData dəyiş
    } catch (error) {
      console.error("Xəta:", error.response ? error.response.data : error.message);
      alert('Xəta baş verdi. URL-ləri göndərmək mümkün olmadı.');
    }
  };

  // 📌 URL silmək funksiyası
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`https://finalprojectt-001-site1.jtempurl.com/api/SocialMedia/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('URL uğurla silindi!');
      setRefreshData(prev => !prev); // Yeniləmə üçün refreshData dəyiş
    } catch (error) {
      console.error("Xəta:", error.response ? error.response.data : error.message);
      alert('URL silinməsi zamanı xəta baş verdi!');
    }
  };

  if (loading) return <div>Yüklənir...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-[45%] mx-auto p-6 bg-light rounded">
      <h2 className="text-2xl font-semibold mb-6">Sosial Media URL-ləri</h2>
      <form onSubmit={handleSubmit}>
        {['FacebookUrl', 'LinkedinUrl', 'InstagramUrl', 'TwitterUrl'].map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-lg font-medium" htmlFor={key}>{key.replace("Url", "")} URL</label>
            <input
              type="text"
              id={key}
              name={key}
              value={socialMediaUrls[key]}
              onChange={(e) => setSocialMediaUrls({ ...socialMediaUrls, [key]: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Yadda saxla
        </button>
      </form>

      {/* URL-ləri göstər */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Mövcud URL-lər</h3>
        {urls.map((url, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg mb-2">
            <ul className="flex flex-col">
              {Object.keys(url).map((key) => (
                key !== 'id' && url[key] && (
                  <li key={key}>
                    <a href={url[key]} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      {key.replace("Url", "")}
                    </a>
                  </li>
                )
              ))}
            </ul>
            <button
              onClick={() => handleDelete(url.id)}
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

export default SocialMedia;
