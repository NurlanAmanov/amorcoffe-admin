import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listpromkod() {
  const [loading, setLoading] = useState(false);
  const [promocodes, setPromocodes] = useState([]);

  useEffect(() => {
    fetchPromocodes();
  }, []);

  // Promo kodları serverdən əldə et
  const fetchPromocodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Promocode/all');
      
      console.log("API Response:", response.data); // Gələn cavabı yoxla
      if (Array.isArray(response.data)) {
        setPromocodes(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        alert("Serverdən düzgün cavab gəlmir.");
      }
    } catch (error) {
      console.error('Promo kodları yükləyərkən xəta baş verdi:', error);
      alert('Promo kodları yükləmək mümkün olmadı.');
    } finally {
      setLoading(false);
    }
  };

  // Promo kodu silmək üçün funksiyanı yazırıq
  const handleDelete = async (id) => {
    if (window.confirm('Bu promo kodu silmək istəyirsiniz?')) {
      try {
        const response = await axios.delete(`https://finalprojectt-001-site1.jtempurl.com/api/Promocode/${id}`);
        if (response.status === 200) {
          alert('Promo kodu uğurla silindi!');
          // Silindikdən sonra siyahını yeniləyirik
          setPromocodes(promocodes.filter((promo) => promo.id !== id));
        }
      } catch (error) {
        console.error('Promo kodu silərkən xəta baş verdi:', error);
        alert('Promo kodunu silmək mümkün olmadı.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Promo Kodlar Siyahısı</h2>

      {loading ? (
        <p className="text-center text-gray-500">Yüklənir...</p>
      ) : (
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kod</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endirim (%)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bitmə Tarixi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktiv</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {promocodes.length > 0 ? (
              promocodes.map((promo) => (
                <tr key={promo.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{promo.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{promo.discountPercentage}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">{promo.expirationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{promo.isActive ? '✔️ Bəli' : '❌ Xeyr'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(promo.id)} // Silmək əmri
                      className="text-red-600 hover:text-red-800"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Heç bir promo kod tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Listpromkod
;
