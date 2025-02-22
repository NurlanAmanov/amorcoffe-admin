import React, { useState, useEffect, useContext } from 'react';
import { MEHSULLARLIST } from '../../Context/ProductContext';
import axios from 'axios';

function Categoryalist() {
  const { category, setCategory } = useContext(MEHSULLARLIST); // Assuming context provides category list
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true); // Loading state

  // 📌 Fetch categories and update the state
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Category");
        setCategories(response.data); // Set categories from API response
        setLoading(false);
      } catch (error) {
        console.error("Xəta: Kateqoriyalar alınmadı", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 📌 Handle category deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://finalprojectt-001-site1.jtempurl.com/api/Category/${id}`);
      if (response.status === 200) {
        // Update state only if there was no error
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        alert('Kateqoriya uğurla silindi!');
      } 
    }  finally {
      window.location.reload(); // Səhifəni yenilə, xəta olsa da, olmasa da
    }
  };

  // 📌 Loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-[sans-serif] w-full mx-auto overflow-x-auto">
      <table className=" bg-white mx-auto w-full">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">Məhsulun Şəkili</th>
            <th className="p-4 text-left text-sm font-medium text-white">Məhsulun adı</th>
            <th className="p-4 text-left text-sm font-medium text-white">Kateqoriya</th>
            <th className="p-4 text-left text-sm font-medium text-white">Məhsulun sayı</th>
            <th className="p-4 text-left text-sm font-medium text-white">Kateqoriya İD</th>
            <th className="p-4 text-left text-sm font-medium text-white">Əməliyyat</th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {categories.map((item, i) => {
            // Count products in each category
            const productCount = item.products ? item.products.length : 0;

            return (
              <tr key={i} className="even:bg-blue-50">
                <td className="p-4 text-sm text-black">
                  <img
                    src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
                    className="w-[40px] h-[40px] object-cover"
                    alt="Mehsul"
                  />
                </td>
                <td className="p-4 text-sm text-black">{item.name}</td>
                <td className="p-4 text-sm text-black">{item.name}</td>
                <td className="p-4 text-sm text-black">{productCount}</td>
                <td className="p-4 text-sm text-black">{item.id}</td>
                <td className="p-4 text-sm text-black">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Categoryalist;
