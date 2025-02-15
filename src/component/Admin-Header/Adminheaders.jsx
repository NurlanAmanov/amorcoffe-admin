import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminHeaders() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    products: false,
    categories: false,
    users: false,
    settings: false,
  });

  const toggleDropdown = (menu) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Hər bir menyu üçün xüsusi linkləri burada müəyyən edirik
  const menuItems = {
    products: [
      { label: 'Məhsul Siyahısı', path: '/Productlist' },
      { label: 'Yeni Məhsul Əlavə Et', path: '/addmehsul' },
      { label: 'Satışlar', path: '/products/sales' },
    ],
    categories: [
      { label: 'Kateqoriya Siyahısı', path: '/Categoryalist' },
      { label: 'Yeni Kateqoriya Əlavə Et', path: '/categories/add' },
    ],
    users: [
      { label: 'İstifadəçi Siyahısı', path: '/users' },
      { label: 'Yeni İstifadəçi Əlavə Et', path: '/users/add' },
      { label: 'Rolları İdarə Et', path: '/users/roles' },
    ],
    settings: [
      { label: 'Ayarlar Siyahısı', path: '/settings/list' },
      { label: 'Yeni Ayar Əlavə Et', path: '/settings/add' },
      { label: 'Təhlükəsizlik', path: '/settings/security' },
    ],
  };

  return (
    <header className='bg-[#121533] py-3 px-4 sm:px-10 font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div className='flex items-center justify-between max-w-screen-xl mx-auto'>
        <span className='text-white text-[20px] font-bold'>Nurlan-Softs</span>
        
        <button className='text-white sm:hidden text-2xl' onClick={() => setIsMenuOpen(true)}>
          ☰
        </button>

        <div className={`sm:flex flex-col sm:flex-row sm:items-center gap-x-6 fixed sm:static top-0 right-0 w-2/3 sm:w-auto h-full sm:h-auto bg-[#121533] p-5 sm:p-0 shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full sm:translate-x-0"}`}>
          <button className='text-white sm:hidden absolute top-4 right-4 text-2xl' onClick={() => setIsMenuOpen(false)}>
            ✖
          </button>
          {Object.keys(menuItems).map((menu, index) => (
            <div key={index} className='relative my-2 sm:my-0 sm:ml-auto mt-12'>
              <button
                className='text-gray-300 hover:text-white text-base flex items-center w-full sm:w-auto'
                onClick={() => toggleDropdown(menu)}
              >
                {menu === 'products' && '📦 Məhsullar'}
                {menu === 'categories' && '📂 Kateqoriyalar'}
                {menu === 'users' && '👤 İstifadəçilər'}
                {menu === 'settings' && '⚙️ Sayt Ayarları'}
                <span className='ml-2'>&#9660;</span>
              </button>
              {isDropdownOpen[menu] && (
                <ul className='absolute right-0 mt-2 left-0  z-50 bg-white shadow-lg rounded-md w-48 text-black sm:absolute sm:mt-2'>
                  {menuItems[menu].map((item, i) => (
                    <li key={i} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                      <Link to={item.path}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default AdminHeaders;
