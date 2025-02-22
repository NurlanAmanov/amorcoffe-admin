import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState({
    home: false,
    users: false,
    sales: false,
    categories: false,
    products: false,
    settings: false,
    sliders: false, // Sliderlar üçün drop-down
    promokods: false, // Promokodlar üçün drop-down
    logos: false, // Logolar üçün drop-down
  });

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <>
      <nav className="bg-[#121e31] h-[100vh] left-0 w-[260px] py-6 px-4 font-[sans-serif] tracking-wide overflow-auto shadow-lg">
        <ul className="space-y-3">
          {/* Ana Səhifə */}
          <li>
            <Link to="/" className="text-white text-sm flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all">
              🏠 Ana Səhifə
            </Link>
          </li>
          <li>
            <Link to="inbox" className="text-white text-sm flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all">
               📥 İnbox
            </Link>
          </li>
          {/* İstifadəçilər */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-900 rounded-lg px-4 py-3 transition-all"
               onClick={() => toggleDropdown('users')}>
              👤 İstifadəçilər
              <span className="ml-auto">{dropdownOpen.users ? '-' : '+'}</span>
            </a>
            {dropdownOpen.users && (
              <ul className="pl-4 text-gray-300 space-y-2">
                <Link to='users' className="hover:text-white">Siyahı</Link>
              </ul>
            )}
          </li>

          {/* Kateqoriyalar */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all"
               onClick={() => toggleDropdown('categories')}>
              📂 Kateqoriyalar
              <span className="ml-auto">{dropdownOpen.categories ? '-' : '+'}</span>
            </a>
            {dropdownOpen.categories && (
              <ul className="pl-4 text-gray-300 space-y-4 flex flex-col">
                <Link to="Categoryalist" className="hover:text-white">Kateqoriya Siyahısı</Link>
                <Link to='Categoryadd' className="hover:text-white">Yeni Kateqoriya Əlavə Et</Link>
              </ul>
            )}
          </li>

          {/* Məhsullar */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all"
               onClick={() => toggleDropdown('products')}>
              🛍 Məhsullar
              <span className="ml-auto">{dropdownOpen.products ? '-' : '+'}</span>
            </a>
            {dropdownOpen.products && (
              <ul className="pl-4 text-gray-300 space-y-2">
                <Link to="Productlist" className="hover:text-white">Məhsul Siyahısı</Link>
                <Link to="addmehsul" className="hover:text-white">Yeni Məhsul Əlavə Et</Link>
              </ul>
            )}
          </li>

          {/* Ayarlar */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center rounded-lg px-4 py-2 transition-all"
               onClick={() => toggleDropdown('settings')}>
              ⚙ Ayarlar
              <span className="ml-auto">{dropdownOpen.settings ? '-' : '+'}</span>
            </a>
            {dropdownOpen.settings && (
              <ul className="pl-4 py-3 flex flex-col space-y-3 text-gray-300">
                <Link to="Headbanner" className="hover:text-white">Headbanner</Link>
                <Link to="Slogan" className="hover:text-white">Slogan</Link>
                <Link to="Tagadd" className="hover:text-white">Taglar</Link>
                <Link to="SocialMedia" className="hover:text-white">Socialmedia</Link>

                {/* SLIDER DROP-DOWN */}
                <a href="javascript:void(0)" className="text-white flex items-center rounded-lg transition-all"
                   onClick={() => toggleDropdown('sliders')}>
                  🎞 Sliderlar
                  <span className="ml-auto">{dropdownOpen.sliders ? '-' : '+'}</span>
                </a>
                {dropdownOpen.sliders && (
                  <ul className="py-3 flex flex-col space-y-4 text-gray-300 pl-4">
                    <Link to="Silder" className="hover:text-white">Slider</Link>
                    <Link to="Silderlist" className="hover:text-white">Yüklənən Sliderlər</Link>
                  </ul>
                )}

                {/* PROMOKOD DROP-DOWN */}
                <a href="javascript:void(0)" className="text-white flex items-center rounded-lg transition-all"
                   onClick={() => toggleDropdown('promokods')}>
                  🎟 Promokodlar
                  <span className="ml-auto">{dropdownOpen.promokods ? '-' : '+'}</span>
                </a>
                {dropdownOpen.promokods && (
                  <ul className="py-3 flex flex-col space-y-2 text-gray-300 pl-4">
                    <Link to="Promakod" className="hover:text-white">Promokod</Link>
                    <Link to="Promkodlist" className="hover:text-white">Yaradılan Promokodlar</Link>
                  </ul>
                )}

                {/* LOGO DROP-DOWN */}
                <a href="javascript:void(0)" className="text-white flex items-center rounded-lg transition-all"
                   onClick={() => toggleDropdown('logos')}>
                  🖼 Logolar
                  <span className="ml-auto">{dropdownOpen.logos ? '-' : '+'}</span>
                </a>
                {dropdownOpen.logos && (
                  <ul className="py-3 flex flex-col space-y-4 text-gray-300 pl-4">
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
    </>
  );
}

export default Sidebar;
