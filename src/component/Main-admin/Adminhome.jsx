import React, { useState, useEffect } from 'react';
import coffe from '../../assets/coffe.png'
import cat from '../../assets/icon.png'
import { Link } from 'react-router-dom';
import CircleProgress from './CircleProgress';
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

      <div className="product py-[60px] flex gap-3 items-center justify-around">

<div
  className="relative flex w-80 flex-col rounded-xl bg-gradient-to-br from-white to-gray-50 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
>
  <div
    className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group"
  >
    <div
      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-90"
    ></div>
    <div
      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"
    ></div>
    <div className="absolute inset-0 flex items-center justify-center">
     <img src={coffe} alt="coffe" className='w-[150px]  object-cover' />
    </div>
  </div>
  <div className="p-6">
    <h5
      className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300"
    >
     Coffe-latte
    </h5>
   
  </div>
  <div className="p-6 pt-0">
    <Link to="addmehsul"
      className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
    >
      <span className="relative flex items-center gap-2">
        Koffe yarat
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
        >
          <path
            d="M17 8l4 4m0 0l-4 4m4-4H3"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </span>
    </Link>
  </div>
</div>

<div
  className="relative flex w-80 flex-col rounded-xl bg-gradient-to-br from-white to-gray-50 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
>
  <div
    className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group"
  >
    <div
      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-90"
    ></div>
    <div
      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"
    ></div>
    <div className="absolute inset-0 flex items-center justify-center">
     <img src={cat} alt="coffe" className='w-[150px]  object-cover' />
    </div>
  </div>
  <div className="p-6">
    <h5
      className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300"
    >
     Coffe-latte
    </h5>
   
  </div>
  <div className="p-6 pt-0">
    <Link to="Categoryadd"
      className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
    >
      <span className="relative flex items-center gap-2">
        Kateqoriya yarat
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
        >
          <path
            d="M17 8l4 4m0 0l-4 4m4-4H3"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
      </span>
    </Link>
  </div>
</div>
<div
  className="group relative flex w-80 flex-col rounded-xl bg-slate-950 p-4 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20"
>
  <div
    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"
  ></div>
  <div className="absolute inset-px rounded-[11px] bg-slate-950"></div>

  <div className="relative">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500"
        >
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            ></path>
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-white">Satış analizi</h3>
      </div>

      <span
        className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        Live
      </span>
    </div>

    <div className="mb-4 grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-slate-900/50 p-3">
        <p className="text-xs font-medium text-slate-400">Ümumi sayta  baxış</p>
        <p className="text-lg font-semibold text-white">24.5K</p>
        <span className="text-xs font-medium text-emerald-500">+12.3%</span>
      </div>

      <div className="rounded-lg bg-slate-900/50 p-3">
        <p className="text-xs font-medium text-slate-400">Ümumi ziyarət və alış</p>
        <p className="text-lg font-semibold text-white">1.2K</p>
        <span className="text-xs font-medium text-emerald-500">+8.1%</span>
      </div>
    </div>

    <div
      className="mb-4 h-24 w-full overflow-hidden rounded-lg bg-slate-900/50 p-3"
    >
      <div className="flex h-full w-full items-end justify-between gap-1">
        <div className="h-[40%] w-3 rounded-sm bg-indigo-500/30">
          <div
            className="h-[60%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
          ></div>
        </div>
        <div className="h-[60%] w-3 rounded-sm bg-indigo-500/30">
          <div
            className="h-[40%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
          ></div>
        </div>
        <div className="h-[75%] w-3 rounded-sm bg-indigo-500/30">
          <div
            className="h-[80%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
          ></div>
        </div>
        <div className="h-[45%] w-3 rounded-sm bg-indigo-500/30">
          <div
            className="h-[50%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
          ></div>
        </div>
        <div className="h-[85%] w-3 rounded-sm bg-indigo-500/30">
          <div
            className="h-[90%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
          ></div>
        </div>
        <div className="h-[65%] w-3 rounded-sm bg-indigo-500/30">
          <div
            className="h-[70%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
          ></div>
        </div>
        <div className="h-[95%] w-3 rounded-sm bg-indigo-500/30">
          <div
            className="h-[85%] w-full rounded-sm bg-indigo-500 transition-all duration-300"
          ></div>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-400">Son  7 gün</span>
        <svg
          className="h-4 w-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      <button
        className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600"
      >
        Bütün məlumatlar
        <svg
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
      </div>

      <div className="statisk">
<CircleProgress/>

      </div>
    </div>
  );
}

export default Adminhome;
