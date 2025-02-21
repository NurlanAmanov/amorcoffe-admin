import React, { useState, useEffect } from 'react';

function Silderlist() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Slider');
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    setLoading(true);
    try {
      const deleteResponse = await fetch(`https://finalprojectt-001-site1.jtempurl.com/api/Slider/${id}`, {
        method: 'DELETE',
      });

      if (!deleteResponse.ok) throw new Error('Failed to delete image');

      alert('Image deleted successfully');
      fetchImages(); // Yenidən şəkillərin siyahısını yükləyirik
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-lg font-bold text-center mb-4">Slider Images</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img className="w-full h-full rounded-full" src={image.imgUrl} alt="" />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => handleDelete(image.id)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Silderlist;
