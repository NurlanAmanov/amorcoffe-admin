import React, { useState, useEffect } from 'react';

function LogoList() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLogos();
  }, []);

  // 📌 Bütün yüklənmiş logoları serverdən çəkmək
  const fetchLogos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://finalprojectt-001-site1.jtempurl.com/api/Logo');
      if (!response.ok) throw new Error('Failed to fetch logos.');
      const data = await response.json();
      setLogos(data);
    } catch (error) {
      console.error('Error fetching logos:', error);
      alert('Failed to fetch logos.');
    } finally {
      setLoading(false);
    }
  };

  // 📌 Logo silmək funksiyası
  const handleDelete = async (id) => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await fetch(`https://finalprojectt-001-site1.jtempurl.com/api/Logo/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete logo.');

      alert('Logo successfully deleted.');
      fetchLogos(); // 🔄 Yenilənmiş logoları yenidən çəkmək
    } catch (error) {
      console.error('Error deleting logo:', error);
      alert('Failed to delete logo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[60%] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-lg font-bold text-center mb-4">Yüklənmiş Logolar</h1>
      {loading ? (
        <p className="text-center text-gray-600">Yüklənir...</p>
      ) : logos.length === 0 ? (
        <p className="text-center text-gray-500">Heç bir logo tapılmadı.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyat</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logos.map((logo) => (
              <tr key={logo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`https://finalprojectt-001-site1.jtempurl.com${logo.imgUrl}`} alt="Logo" className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(logo.id)} className="text-red-600 hover:text-red-900">
                    Sil
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

export default LogoList;
