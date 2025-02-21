import React, { useState, useEffect } from 'react';

function Adminhome() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [promoCodeCount, setPromoCodeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [productRes, categoryRes, userRes, promoRes] = await Promise.all([
        fetch('https://finalprojectt-001-site1.jtempurl.com/api/Product'),
        fetch('https://finalprojectt-001-site1.jtempurl.com/api/Category'),
        fetch('https://finalprojectt-001-site1.jtempurl.com/api/Auth'),
        fetch('https://finalprojectt-001-site1.jtempurl.com/api/Promocode/all'),
      ]);

      if (!productRes.ok || !categoryRes.ok || !userRes.ok || !promoRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [products, categories, users, promos] = await Promise.all([
        productRes.json(),
        categoryRes.json(),
        userRes.json(),
        promoRes.json(),
      ]);

      setProductCount(products.length);
      setCategoryCount(categories.length);
      setUserCount(users.length);
      setPromoCodeCount(promos.length);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Yüklənir...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Məhsul Sayı */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Məhsul Sayı</h2>
              <p className="text-4xl font-extrabold">{productCount}</p>
            </div>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 3h18v18H3V3zm2 10h14M5 8h14m-7 10V8" />
            </svg>
          </div>

          {/* Kateqoriya Sayı */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Kateqoriya Sayı</h2>
              <p className="text-4xl font-extrabold">{categoryCount}</p>
            </div>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 3h18v18H3V3zm2 10h14M5 8h14m-7 10V8" />
            </svg>
          </div>

          {/* İstifadəçi Sayı */}
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">İstifadəçi Sayı</h2>
              <p className="text-4xl font-extrabold">{userCount}</p>
            </div>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 3h14v14H5zM3 21h18M8 17h8" />
            </svg>
          </div>

          {/* Promo Kod Sayı */}
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Promo Kod Sayı</h2>
              <p className="text-4xl font-extrabold">{promoCodeCount}</p>
            </div>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 7h18M3 12h18M3 17h18M6 5v14M18 5v14" />
            </svg>
          </div>

        </div>
      )}
    </div>
  );
}

export default Adminhome;
