import React, { useState } from 'react';
import axios from 'axios';

function Promcode() {
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [appUserName, setAppUserName] = useState(''); // AppUserId → AppUserName
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('Code', code);
    formData.append('DiscountPercentage', discountPercentage);
    formData.append('ExpirationDate', expirationDate); // Date format should be ISO 8601
    formData.append('IsActive', isActive);
    formData.append('AppUserName', appUserName); // AppUserId → AppUserName

    try {
      const response = await axios.post(
        'https://finalprojectt-001-site1.jtempurl.com/api/Promocode/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // multipart/form-data istifadə edilir
          },
        }
      );

      if (response.status === 200) {
        alert('Promocode successfully created!');
        setCode('');
        setDiscountPercentage('');
        setExpirationDate('');
        setIsActive(true);
        setAppUserName(''); // Reset AppUserName
      }
    } catch (error) {
      console.error('Error creating promocode:', error);
      alert('Error creating promocode!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Promocode</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Percentage:</label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expiration Date:</label>
          <input
            type="datetime-local"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Is Active:</label>
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value === 'true')}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">App User Name:</label>
          <input
            type="text"
            value={appUserName}
            onChange={(e) => setAppUserName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Creating Promocode...' : 'Create Promocode'}
        </button>
      </form>
    </div>
  );
}

export default Promcode;
