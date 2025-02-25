import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState({
    home: false,
    users: false,
    sales: false,
    categories: false,
    products: false,
    settings: false,
    sliders: false,
    promokods: false,
    logos: false,
  });

  const [notifications, setNotifications] = useState([]);

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'https://finalprojectt-001-site1.jtempurl.com/api/Contact?limit=30'
        );
        setNotifications(response.data);
      } catch (error) {
        console.error('Xəta baş verdi:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <nav className="bg-[#1A202C] w-[260px]  py-6 px-4 font-sans tracking-wide overflow-auto shadow-xl transition-all duration-300">
      <ul className="space-y-6">
        {/* Home */}
        <li>
          <Link to="/" className="text-white text-lg flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300">
            🏠 <span className="ml-3">Ana Səhifə</span>
          </Link>
        </li>

        {/* Inbox */}
        <li>
          <Link to="inbox" className="text-white text-lg flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300">
            📥 <span className="ml-3">İnbox</span>
          </Link>
        </li>

        {/* Calendar */}
        <li>
          <Link to="calendar" className="text-white text-lg flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300">
            📅 <span className="ml-3">Təqvim</span>
          </Link>
        </li>

        {/* Notifications */}
        <li>
          <Link to="notifications" className="text-white text-lg flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300">
            📥 <span className="ml-3">Bildirişlər</span>
            {notifications.length > 0 && (
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {notifications.length}
              </span>
            )}
          </Link>
        </li>

        {/* Users */}
        <li>
          <a href="javascript:void(0)" className="text-white text-lg flex items-center hover:bg-gray-800 rounded-lg px-4 py-3 transition-all duration-300"
             onClick={() => toggleDropdown('users')}>
            👤 <span className="ml-3">İstifadəçilər</span>
            <span className="ml-auto">{dropdownOpen.users ? '-' : '+'}</span>
          </a>
          {dropdownOpen.users && (
            <ul className="pl-8 text-gray-300 space-y-2">
              <Link to="users" className="hover:text-white">Siyahı</Link>
            </ul>
          )}
        </li>

        {/* Categories */}
        <li>
          <a href="javascript:void(0)" className="text-white text-lg flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300"
             onClick={() => toggleDropdown('categories')}>
            📂 <span className="ml-3">Kateqoriyalar</span>
            <span className="ml-auto">{dropdownOpen.categories ? '-' : '+'}</span>
          </a>
          {dropdownOpen.categories && (
            <ul className="pl-8 text-gray-300 space-y-4">
              <Link to="Categoryalist" className="hover:text-white">Kateqoriya Siyahısı</Link>
              <Link to="Categoryadd" className="hover:text-white">Yeni Kateqoriya Əlavə Et</Link>
            </ul>
          )}
        </li>

        {/* Products */}
        <li>
          <a href="javascript:void(0)" className="text-white text-lg flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300"
             onClick={() => toggleDropdown('products')}>
            🛍 <span className="ml-3">Məhsullar</span>
            <span className="ml-auto">{dropdownOpen.products ? '-' : '+'}</span>
          </a>
          {dropdownOpen.products && (
            <ul className="pl-8 text-gray-300 space-y-2">
              <Link to="Productlist" className="hover:text-white">Məhsul Siyahısı</Link>
              <Link to="addmehsul" className="hover:text-white">Yeni Məhsul Əlavə Et</Link>
            </ul>
          )}
        </li>

        {/* Settings */}
        <li>
          <a href="javascript:void(0)" className="text-white text-lg flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300"
             onClick={() => toggleDropdown('settings')}>
            ⚙ <span className="ml-3">Ayarlar</span>
            <span className="ml-auto">{dropdownOpen.settings ? '-' : '+'}</span>
          </a>
          {dropdownOpen.settings && (
            <ul className="pl-8 text-gray-300 space-y-3 flex flex-col">
              <Link to="Headbanner" className="hover:text-white">Headbanner</Link>
              <Link to="Slogan" className="hover:text-white">Slogan</Link>
              <Link to="Tagadd" className="hover:text-white">Taglar</Link>
              <Link to="SocialMedia" className="hover:text-white">Socialmedia</Link>

              {/* Slider Dropdown */}
              <a href="javascript:void(0)" className="flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300"
                 onClick={() => toggleDropdown('sliders')}>
                🎞 <span className="ml-3">Sliderlar</span>
                <span className="ml-auto">{dropdownOpen.sliders ? '-' : '+'}</span>
              </a>
              {dropdownOpen.sliders && (
                <ul className="pl-8 text-gray-300 space-y-4">
                  <Link to="Silder" className="hover:text-white">Slider</Link>
                  <Link to="Silderlist" className="hover:text-white">Yüklənən Sliderlər</Link>
                </ul>
              )}

              {/* Promo Code Dropdown */}
              <a href="javascript:void(0)" className="flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300"
                 onClick={() => toggleDropdown('promokods')}>
                🎟 <span className="ml-3">Promokodlar</span>
                <span className="ml-auto">{dropdownOpen.promokods ? '-' : '+'}</span>
              </a>
              {dropdownOpen.promokods && (
                <ul className="pl-8 text-gray-300 space-y-2">
                  <Link to="Promakod" className="hover:text-white">Promokod</Link>
                  <Link to="Promkodlist" className="hover:text-white">Yaradılan Promokodlar</Link>
                </ul>
              )}

              {/* Logo Dropdown */}
              <a href="javascript:void(0)" className="flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all duration-300"
                 onClick={() => toggleDropdown('logos')}>
                🖼 <span className="ml-3">Logolar</span>
                <span className="ml-auto">{dropdownOpen.logos ? '-' : '+'}</span>
              </a>
              {dropdownOpen.logos && (
                <ul className="pl-8 text-gray-300 space-y-4">
                  <Link to="Logoupload" className="hover:text-white">Logo Yüklə</Link>
                  <Link to="LogoList" className="hover:text-white">Yüklənmiş Logolar</Link>
                </ul>
              )}

              <Link to="Variantsetting" className="hover:text-white">📏 Məhsul ölçüləri</Link>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
