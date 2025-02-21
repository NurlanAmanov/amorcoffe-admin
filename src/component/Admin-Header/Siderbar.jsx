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
    sliders: false, // Slider dropdown əlavə edildi
  });

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <>
      <nav className="bg-[#121e31] h-[100vh] left-0 w-[250px] py-6 px-4 font-[sans-serif] tracking-wide overflow-auto">
        <ul className="space-y-3">
          {/* Ana Səhifə */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
               onClick={() => toggleDropdown('home')}>
              <Link to="Adminhome">Ana Səhifə</Link>
              <span className="ml-auto">{dropdownOpen.home ? '-' : '+'}</span>
            </a>
          </li>

          {/* İstifadəçilər */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-900 rounded px-4 py-3 transition-all"
               onClick={() => toggleDropdown('users')}>
              <span>İstifadəçilər</span>
              <span className="ml-auto">{dropdownOpen.users ? '-' : '+'}</span>
            </a>
            {dropdownOpen.users && (
              <ul className="pl-4 text-gray-300">
                <Link to='users'>Siyahı</Link>
              </ul>
            )}
          </li>

          {/* Satışlar */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
               onClick={() => toggleDropdown('sales')}>
              <span>Satışlar</span>
              <span className="ml-auto">{dropdownOpen.sales ? '-' : '+'}</span>
            </a>
          </li>

          {/* Kateqoriyalar */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
               onClick={() => toggleDropdown('categories')}>
              <span>Kateqoriyalar</span>
              <span className="ml-auto">{dropdownOpen.categories ? '-' : '+'}</span>
            </a>
            {dropdownOpen.categories && (
              <ul className="pl-4 text-gray-300 py-4 flex space-y-3 flex-col">
                <Link to="Categoryalist">Kateqoriya Siyahısı</Link>
                <Link to='Categoryadd'>Yeni Kateqoriya Əlavə Et</Link>
              </ul>
            )}
          </li>

          {/* Məhsullar */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
               onClick={() => toggleDropdown('products')}>
              <span>Məhsullar</span>
              <span className="ml-auto">{dropdownOpen.products ? '-' : '+'}</span>
            </a>
            {dropdownOpen.products && (
              <ul className="pl-4 text-gray-300 flex flex-col">
                <Link to="Productlist">Məhsul Siyahısı</Link>
                <Link to="addmehsul">Yeni Məhsul Əlavə Et</Link>
              </ul>
            )}
          </li>

          {/* Ayarlar */}
          <li>
            <a href="javascript:void(0)" className="text-white text-sm flex items-center rounded px-4 py-2 transition-all"
               onClick={() => toggleDropdown('settings')}>
              <span>Ayarlar</span>
              <span className="ml-auto">{dropdownOpen.settings ? '-' : '+'}</span>
            </a>
            {dropdownOpen.settings && (
              <ul className="pl-4 py-3 flex flex-col space-y-5 text-gray-300">
                <Link to="Headbanner">Headbanner</Link>
                <Link to="Slogan">Slogan</Link>
                <Link to="Tagadd">Taglar</Link>
                <Link to="Logoupload">Logo</Link>
                <Link to="SocialMedia">Socialmedia</Link>

                {/* SLIDER DROPDOWN */}
                <a href="javascript:void(0)" className="text-white flex items-center rounded transition-all"
                   onClick={() => toggleDropdown('sliders')}>
                  Sliderlar
                  <span className="ml-auto">{dropdownOpen.sliders ? '-' : '+'}</span>
                </a>
                {dropdownOpen.sliders && (
                  <ul className="py-3 flex flex-col space-y-5 text-gray-300 pl-4">
                    <Link to="Silder">Slider</Link>
                    <Link to="Silderlist">Yüklənən Sliderlər</Link>
                  </ul>
                )}

                <Link to="Promakod">Promakod</Link>
                <Link to="Promakodlist">Yardılan Promakodlar</Link>
                <Link to="Variantsetting">Məhsul ölçüləri</Link>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
