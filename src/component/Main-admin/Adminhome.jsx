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
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl shadow-2xl border border-gray-200">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-800 relative">
          <span className="relative z-10">Admin Dashboard</span>
          <span className="absolute -bottom-2 left-0 w-24 h-3 bg-blue-500/30 rounded-full -z-0"></span>
        </h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span className="font-medium text-gray-700">Yeni Hesabat</span>
          </button>
          <button className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-4 text-lg font-medium text-gray-500">Yüklənir...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Məhsul Sayı */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-blue-300/30 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Məhsul Sayı</h2>
                <div className="bg-white/20 p-3 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 7l-8 4-8-4V5l8 4 8-4v2zM4 11v4l8 4 8-4v-4l-8 4-8-4z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold">{productCount}</p>
              <div className="mt-2 flex items-center text-sm">
                <span className="bg-white/20 px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  12% artım
                </span>
              </div>
            </div>
          </div>

          {/* Kateqoriya Sayı */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-green-300/30 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Kateqoriya Sayı</h2>
                <div className="bg-white/20 p-3 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    <path d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold">{categoryCount}</p>
              <div className="mt-2 flex items-center text-sm">
                <span className="bg-white/20 px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  8% artım
                </span>
              </div>
            </div>
          </div>

          {/* İstifadəçi Sayı */}
          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-yellow-300/30 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">İstifadəçi Sayı</h2>
                <div className="bg-white/20 p-3 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold">{userCount}</p>
              <div className="mt-2 flex items-center text-sm">
                <span className="bg-white/20 px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  15% artım
                </span>
              </div>
            </div>
          </div>

          {/* Promo Kod Sayı */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-purple-300/30 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Promo Kod Sayı</h2>
                <div className="bg-white/20 p-3 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold">{promoCodeCount}</p>
              <div className="mt-2 flex items-center text-sm">
                <span className="bg-white/20 px-2 py-1 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  5% artım
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* First Card */}
        <div className="relative group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={coffe} alt="coffe" className="w-[150px] object-cover transform transition-transform group-hover:scale-110 duration-500" />
            </div>
          </div>
          <div className="p-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              Coffe-latte
            </h5>
            <p className="text-gray-600 mt-2">Müştərilər üçün ən sevimli içkiləri əlavə edin və tənzimləyin.</p>
          </div>
          <div className="p-6 pt-0">
            <Link to="addmehsul" className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
              <span className="relative flex items-center gap-2">
                Koffe yarat
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 transform transition-transform group-hover:translate-x-1">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Second Card */}
        <div className="relative group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="relative mx-4 -mt-6 h-48 overflow-hidden rounded-xl shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-teal-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={cat} alt="category" className="w-[150px] object-cover transform transition-transform group-hover:scale-110 duration-500" />
            </div>
          </div>
          <div className="p-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 group-hover:text-green-600 transition-colors duration-300">
              Kateqoriyalar
            </h5>
            <p className="text-gray-600 mt-2">Məhsullarınızı təşkil etmək üçün yeni kateqoriyalar yaradın.</p>
          </div>
          <div className="p-6 pt-0">
            <Link to="Categoryadd" className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all duration-300 hover:-translate-y-0.5">
              <span className="relative flex items-center gap-2">
                Kateqoriya yarat
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 transform transition-transform group-hover:translate-x-1">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="group relative flex flex-col rounded-2xl bg-slate-950 p-6 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/20">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"></div>
          <div className="absolute inset-px rounded-xl bg-slate-950"></div>

          <div className="relative">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Satış analizi</h3>
              </div>

              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Live
              </span>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-900/80 p-4 transition-all duration-300 hover:bg-slate-800/80">
                <p className="text-xs font-medium text-slate-400">Ümumi sayta baxış</p>
                <p className="text-xl font-semibold text-white mt-1">24.5K</p>
                <span className="flex items-center text-xs font-medium text-emerald-500 mt-1">
                  <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  +12.3%
                </span>
              </div>

              <div className="rounded-lg bg-slate-900/80 p-4 transition-all duration-300 hover:bg-slate-800/80">
                <p className="text-xs font-medium text-slate-400">Ümumi ziyarət və alış</p>
                <p className="text-xl font-semibold text-white mt-1">1.2K</p>
                <span className="flex items-center text-xs font-medium text-emerald-500 mt-1">
                  <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                  +8.1%
                </span>
              </div>
            </div>

            <div className="mb-6 h-32 w-full overflow-hidden rounded-lg bg-slate-900/80 p-4">
              <div className="flex h-full w-full items-end justify-between gap-2">
                <div className="h-[40%] w-4 rounded-sm bg-indigo-500/30 group-hover:h-[45%] transition-all duration-700">
                  <div className="h-[60%] w-full rounded-sm bg-indigo-500 transition-all duration-300"></div>
                </div>
                <div className="h-[60%] w-4 rounded-sm bg-indigo-500/30 group-hover:h-[65%] transition-all duration-700">
                  <div className="h-[40%] w-full rounded-sm bg-indigo-500 transition-all duration-300"></div>
                </div>
                <div className="h-[75%] w-4 rounded-sm bg-indigo-500/30 group-hover:h-[80%] transition-all duration-700">
                  <div className="h-[80%] w-full rounded-sm bg-indigo-500 transition-all duration-300"></div>
                </div>
                <div className="h-[45%] w-4 rounded-sm bg-indigo-500/30 group-hover:h-[50%] transition-all duration-700">
                  <div className="h-[50%] w-full rounded-sm bg-indigo-500 transition-all duration-300"></div>
                </div>
                <div className="h-[85%] w-4 rounded-sm bg-indigo-500/30 group-hover:h-[90%] transition-all duration-700">
                  <div className="h-[90%] w-full rounded-sm bg-indigo-500 transition-all duration-300"></div>
                </div>
                <div className="h-[65%] w-4 rounded-sm bg-indigo-500/30 group-hover:h-[70%] transition-all duration-700">
                  <div className="h-[70%] w-full rounded-sm bg-indigo-500 transition-all duration-300"></div>
                </div>
                <div className="h-[95%] w-4 rounded-sm bg-indigo-500/30 group-hover:h-[100%] transition-all duration-700">
                  <div className="h-[85%] w-full rounded-sm bg-indigo-500 transition-all duration-300"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-lg">
                <span className="text-xs font-medium text-slate-400">Son 7 gün</span>
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>

              <button className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-0.5">
                Bütün məlumatlar
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="statisk mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 relative inline-block">
          <span className="relative z-10">Satış Statistikaları</span>
          <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-300/50 rounded-full -z-0"></span>
        </h2>
        <CircleProgress />
      </div>
    </div>
  );
}

export default Adminhome;