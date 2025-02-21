import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Promcodlist() {
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [appUserId, setAppUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [promocodes, setPromocodes] = useState([]); // Promo kodlarını saxlamaq üçün state

  useEffect(() => {
    const fetchPromocodes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Promocode/all');
        setPromocodes(response.data);
      } catch (error) {
        console.error('Promo kodlarını yükləyərkən xəta baş verdi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromocodes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('Code', code);
    formData.append('DiscountPercentage', discountPercentage);
    formData.append('ExpirationDate', expirationDate);
    formData.append('IsActive', isActive);
    formData.append('AppUserId', appUserId);

    try {
      const response = await axios.post(
        'https://finalprojectt-001-site1.jtempurl.com/api/Promocode/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        alert('Promocode successfully created!');
        setCode('');
        setDiscountPercentage('');
        setExpirationDate('');
        setIsActive(true);
        setAppUserId('');
        setPromocodes([...promocodes, response.data]); // Yeni promo kodu siyahıya əlavə edin
      }
    } catch (error) {
      console.error('Promocode yaradarkən xəta:', error);
      alert('Error creating promocode!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Promocode</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form input elements are here */}
      </form>

      {loading ? (
        <div>Loading promocodes...</div>
      ) : (
        <div>
          <h3 className="text-xl font-bold my-4">Promocodes List</h3>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount Percentage
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Expiration Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {promocodes.map((promo) => (
                <tr key={promo.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {promo.code}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {promo.discountPercentage}%
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {promo.expirationDate}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {promo.isActive ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Promcodlist;
