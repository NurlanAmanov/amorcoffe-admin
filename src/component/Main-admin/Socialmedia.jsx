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
  const [urls, setUrls] = useState([]); // Bütün URL-ləri saxlamaq üçün state

  // 📌 Get social media URLs from API
  useEffect(() => {
    const fetchSocialMediaUrls = async () => {
      try {
        const response = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/SocialMedia');
        setSocialMediaUrls(response.data);
        setUrls(response.data); // API-dan gələn URL-ləri saxlayın
        setLoading(false);
      } catch (err) {
        setError('Xəta baş verdi. URL-ləri yükləmək mümkün olmadı.');
        setLoading(false);
      }
    };

    fetchSocialMediaUrls();
  }, []);

  // 📌 Handle form submission (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData obyekti yaradın
    const formData = new FormData();

    // Yalnız doldurulmuş URL-ləri əlavə edin
    Object.keys(socialMediaUrls).forEach(key => {
      if (socialMediaUrls[key]) {
        formData.append(key, socialMediaUrls[key]);
      }
    });

    try {
      const token = localStorage.getItem('jwtToken'); // Token əlavə edin
      const response = await axios.post('https://finalprojectt-001-site1.jtempurl.com/api/SocialMedia', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Content-Type düzəldin
          'Authorization': `Bearer ${token}` // Token əlavə edin
        }
      });
      alert('Sosial media URL-ləri uğurla göndərildi!');
      fetchSocialMediaUrls(); // URL-ləri yenidən yükləyin
    } catch (error) {
      console.error("Xəta:", error.response ? error.response.data : error.message);
      alert('Xəta baş verdi. URL-ləri göndərmək mümkün olmadı.');
    }
  };

  // 📌 URL silmək funksiyası
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('jwtToken'); // Token əlavə edin
      const response = await axios.delete(`https://finalprojectt-001-site1.jtempurl.com/api/SocialMedia/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Token əlavə edin
        }
      });
      if (response.status === 200) {
        alert('URL uğurla silindi!');
        fetchSocialMediaUrls(); // URL-ləri yenidən yükləyin
      }
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
        <div className="mb-4">
          <label className="block text-lg font-medium" htmlFor="FacebookUrl">Facebook URL</label>
          <input
            type="text"
            id="FacebookUrl"
            name="FacebookUrl"
            value={socialMediaUrls.FacebookUrl}
            onChange={(e) => setSocialMediaUrls({ ...socialMediaUrls, FacebookUrl: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium" htmlFor="LinkedinUrl">Linkedin URL</label>
          <input
            type="text"
            id="LinkedinUrl"
            name="LinkedinUrl"
            value={socialMediaUrls.LinkedinUrl}
            onChange={(e) => setSocialMediaUrls({ ...socialMediaUrls, LinkedinUrl: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium" htmlFor="InstagramUrl">Instagram URL</label>
          <input
            type="text"
            id="InstagramUrl"
            name="InstagramUrl"
            value={socialMediaUrls.InstagramUrl}
            onChange={(e) => setSocialMediaUrls({ ...socialMediaUrls, InstagramUrl: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium" htmlFor="TwitterUrl">Twitter URL</label>
          <input
            type="text"
            id="TwitterUrl"
            name="TwitterUrl"
            value={socialMediaUrls.TwitterUrl}
            onChange={(e) => setSocialMediaUrls({ ...socialMediaUrls, TwitterUrl: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Yadda saxla
        </button>
      </form>

      {/* URL-ləri göstər */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Mövcud URL-lər</h3>
        {urls.map((url, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg mb-2">
           <ul className='flex flex-col'> 
           <li> 
           
            <a href={url.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {url.facebookUrl}
            </a>
            </li>
            <li> 
           
           <a href={url.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
             {url.linkedinUrl}
           </a>
           </li>

           <li> 
           
           <a href={url.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
             {url.instagramUrl}
           </a>
           </li>


           <li> 
           
           <a href={url.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
             {url.twitterUrl}
           </a>
           </li>
           </ul>
            <button
              onClick={() => handleDelete(url.id)} // URL-in id-sinə görə sil
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