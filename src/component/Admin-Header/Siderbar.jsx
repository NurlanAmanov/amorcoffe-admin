import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Siderbar() {
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const openNotificationsModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'https://finalprojectt-001-site1.jtempurl.com/api/Contact'
        );
        setNotifications(response.data);
      } catch (error) {
        console.error('Xəta baş verdi:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      {/* Toggle button for mobile/collapse */}
      <button 
        onClick={toggleSidebar}
        className="absolute top-4 right-0 transform translate-x-1/2 bg-indigo-600 text-white p-2 rounded-full shadow-lg z-10 hover:bg-indigo-700 transition-all duration-300"
      >
        {sidebarCollapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <nav className={`bg-gradient-to-b from-indigo-900 to-[#1A202C] ${sidebarCollapsed ? 'w-20' : 'w-[260px]'} h-full min-h-screen py-6 px-4 font-sans tracking-wide overflow-auto shadow-xl transition-all duration-300`}>
        {/* Logo/brand area */}
        <div className="flex items-center justify-center mb-8">
          {sidebarCollapsed ? (
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">A</div>
          ) : (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">A</div>
              <span className="ml-3 text-white text-xl font-semibold">Admin Panel</span>
            </div>
          )}
        </div>

        <ul className="space-y-2">
          {/* Home */}
          <li>
            <Link to="/" className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group">
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">🏠</span>
              {!sidebarCollapsed && <span className="ml-3 group-hover:text-white">Ana Səhifə</span>}
            </Link>
          </li>

          {/* Inbox */}
          <li>
            <Link to="inbox" className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group">
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">📥</span>
              {!sidebarCollapsed && <span className="ml-3 group-hover:text-white">İnbox</span>}
            </Link>
          </li>

          {/* Calendar */}
          <li>
            <Link to="calendar" className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group">
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">📅</span>
              {!sidebarCollapsed && <span className="ml-3 group-hover:text-white">Təqvim</span>}
            </Link>
          </li>
          <li>
            <Link to="Zodiac" className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group">
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">♑</span>
              {!sidebarCollapsed && <span className="ml-3 group-hover:text-white">Bürc</span>}
            </Link>
          </li>

          {/* Notifications */}
          <li>
            <a href="#" 
              onClick={openNotificationsModal}
              className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group">
              <div className="relative flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">
                📥
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 group-hover:text-white">Bildirişlər</span>
                  {notifications.length > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </>
              )}
            </a>
          </li>

          {/* Divider */}
          <li className="border-b border-gray-700 my-3"></li>

          {/* Users */}
          <li>
            <a href="javascript:void(0)" 
               className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group"
               onClick={() => toggleDropdown('users')}>
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">👤</span>
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 group-hover:text-white">İstifadəçilər</span>
                  <span className="ml-auto">
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen.users ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </>
              )}
            </a>
            {dropdownOpen.users && !sidebarCollapsed && (
              <ul className="pl-12 mt-2 space-y-2">
                <li>
                  <Link to="users" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Siyahı
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Categories */}
          <li>
            <a href="javascript:void(0)" 
               className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group"
               onClick={() => toggleDropdown('categories')}>
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">📂</span>
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 group-hover:text-white">Kateqoriyalar</span>
                  <span className="ml-auto">
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen.categories ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </>
              )}
            </a>
            {dropdownOpen.categories && !sidebarCollapsed && (
              <ul className="pl-12 mt-2 space-y-2">
                <li>
                  <Link to="Categoryalist" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Kateqoriya Siyahısı
                  </Link>
                </li>
                <li>
                  <Link to="Categoryadd" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Yeni Kateqoriya Əlavə Et
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Products */}
          <li>
            <a href="javascript:void(0)" 
               className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group"
               onClick={() => toggleDropdown('products')}>
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">🛍</span>
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 group-hover:text-white">Məhsullar</span>
                  <span className="ml-auto">
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen.products ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </>
              )}
            </a>
            {dropdownOpen.products && !sidebarCollapsed && (
              <ul className="pl-12 mt-2 space-y-2">
                <li>
                  <Link to="Productlist" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Məhsul Siyahısı
                  </Link>
                </li>
                <li>
                  <Link to="addmehsul" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Yeni Məhsul Əlavə Et
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Settings */}
          <li>
            <a href="javascript:void(0)" 
               className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group"
               onClick={() => toggleDropdown('settings')}>
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-800/50 rounded-lg text-lg">⚙</span>
              {!sidebarCollapsed && (
                <>
                  <span className="ml-3 group-hover:text-white">Ayarlar</span>
                  <span className="ml-auto">
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen.settings ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </>
              )}
            </a>
            {dropdownOpen.settings && !sidebarCollapsed && (
              <ul className="pl-12 mt-2 space-y-2">
                <li>
                  <Link to="Headbanner" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Headbanner
                  </Link>
                </li>
                <li>
                  <Link to="Slogan" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Slogan
                  </Link>
                </li>
                <li>
                  <Link to="Tagadd" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Taglar
                  </Link>
                </li>
                <li>
                  <Link to="SocialMedia" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Socialmedia
                  </Link>
                </li>

                <li>
                  <Link to="Registeradmin" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    Admin-registr
                  </Link>
                </li>

                {/* Slider submenu */}
                <li className="mt-2">
                  <a href="javascript:void(0)" 
                    className="text-gray-400 hover:text-white flex items-center py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors"
                    onClick={() => toggleDropdown('sliders')}>
                    <span className="mr-2 text-sm">🎞</span>
                    <span>Sliderlar</span>
                    <span className="ml-auto">
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen.sliders ? 'rotate-180' : ''}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                  </a>
                  {dropdownOpen.sliders && (
                    <ul className="pl-6 mt-2 space-y-1">
                      <li>
                        <Link to="Silder" className="text-gray-400 hover:text-white block py-1.5 px-4 text-sm hover:bg-indigo-800/20 rounded-md transition-colors">
                          Slider
                        </Link>
                      </li>
                      <li>
                        <Link to="Silderlist" className="text-gray-400 hover:text-white block py-1.5 px-4 text-sm hover:bg-indigo-800/20 rounded-md transition-colors">
                          Yüklənən Sliderlər
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Promo Codes submenu */}
                <li className="mt-2">
                  <a href="javascript:void(0)" 
                    className="text-gray-400 hover:text-white flex items-center py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors"
                    onClick={() => toggleDropdown('promokods')}>
                    <span className="mr-2 text-sm">🎟</span>
                    <span>Promokodlar</span>
                    <span className="ml-auto">
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen.promokods ? 'rotate-180' : ''}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                  </a>
                  {dropdownOpen.promokods && (
                    <ul className="pl-6 mt-2 space-y-1">
                      <li>
                        <Link to="Promakod" className="text-gray-400 hover:text-white block py-1.5 px-4 text-sm hover:bg-indigo-800/20 rounded-md transition-colors">
                          Promokod
                        </Link>
                      </li>
                      <li>
                        <Link to="Promkodlist" className="text-gray-400 hover:text-white block py-1.5 px-4 text-sm hover:bg-indigo-800/20 rounded-md transition-colors">
                          Yaradılan Promokodlar
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Logos submenu */}
                <li className="mt-2">
                  <a href="javascript:void(0)" 
                    className="text-gray-400 hover:text-white flex items-center py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors"
                    onClick={() => toggleDropdown('logos')}>
                    <span className="mr-2 text-sm">🖼</span>
                    <span>Logolar</span>
                    <span className="ml-auto">
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen.logos ? 'rotate-180' : ''}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                  </a>
                  {dropdownOpen.logos && (
                    <ul className="pl-6 mt-2 space-y-1">
                      <li>
                        <Link to="Logoupload" className="text-gray-400 hover:text-white block py-1.5 px-4 text-sm hover:bg-indigo-800/20 rounded-md transition-colors">
                          Logo Yüklə
                        </Link>
                      </li>
                      <li>
                        <Link to="LogoList" className="text-gray-400 hover:text-white block py-1.5 px-4 text-sm hover:bg-indigo-800/20 rounded-md transition-colors">
                          Yüklənmiş Logolar
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li>
                  <Link to="Variantsetting" className="text-gray-400 hover:text-white block py-2 px-4 hover:bg-indigo-800/30 rounded-md transition-colors">
                    <span className="mr-2">📏</span> Məhsul ölçüləri
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Notifications Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bildirişlər</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {notifications.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map((notification, index) => (
                    <li key={index} className="py-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900 dark:text-white">{notification.name}</p>
                          <span className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{notification.email}</p>
                        <p className="text-gray-700 dark:text-gray-300">{notification.subject}</p>
                        <p className="text-gray-600 dark:text-gray-400">{notification.message}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">Heç bir bildiriş yoxdur</p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Siderbar;