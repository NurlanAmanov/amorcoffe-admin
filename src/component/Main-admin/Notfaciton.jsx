import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Əsas bildirişlər komponentinin yenidən düzənlənmiş versiyası
function Notfaciton({ sidebarCollapsed }) {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Bildirişləri yükləmək üçün funksiya
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://finalprojectt-001-site1.jtempurl.com/api/Contact?limit=30'
        );
        
        console.log('API cavabı:', response);
        
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          setNotifications(response.data.data);
        } else if (typeof response.data === 'object') {
          // API müxtəlif adlarla massiv qaytara bilər
          const possibleArrayProps = ['items', 'results', 'contacts', 'messages', 'notifications', 'list'];
          
          for (const prop of possibleArrayProps) {
            if (response.data[prop] && Array.isArray(response.data[prop])) {
              setNotifications(response.data[prop]);
              return;
            }
          }
          
          // Tək obyekt qaytarıbsa massivə çevir
          if (!Array.isArray(response.data)) {
            setNotifications([response.data]);
          }
        } else {
          console.error('Gözlənilən data formatı tapılmadı:', response.data);
          setError('Məlumatlar düzgün formatda deyil.');
        }
      } catch (error) {
        console.error('API xətası:', error);
        setError('Xəta baş verdi, məlumatları yükləyə bilmədik.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  // Modalın URL-də açılması üçün yoxlama - diqqət: əvvəlki təslash olmadan və ya təslashla da işləməlidir
  const isModalOpen = location.pathname === '/notfaciton' || location.pathname === 'notfaciton';
  
  // Modalı bağlamaq üçün funksiya
  const closeModal = () => {
    navigate(-1); // Bir öncəki səhifəyə qayıt
  };

  return (
    <>
      {/* Sidebar Bildirişlər Linki */}
      <li>
        <Link 
          to="/notfaciton" // İstər təkbaşına "notfaciton", istərsə də "/notfaciton" olmalıdır, biz yuxarıda hər ikisini yoxlayırıq
          className="text-gray-300 flex items-center hover:bg-indigo-700 rounded-lg px-4 py-3 transition-all duration-300 group"
        >
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
        </Link>
      </li>
      
      {/* Bildiriş Modalnı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[80%] max-h-[80vh] overflow-y-auto shadow-xl transform transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Bildirişlər</h2>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition-all duration-300"
              >
                X
              </button>
            </div>
            
            {/* Debug məlumatı */}
            <div className="bg-yellow-100 p-4 rounded-lg mb-4 text-sm">
              <h3 className="font-bold mb-2">Vəziyyət məlumatı:</h3>
              <ul className="list-disc pl-5">
                <li>URL yolu: {location.pathname}</li>
                <li>Modal açıqdır: {isModalOpen ? 'Bəli' : 'Xeyr'}</li>
                <li>Yüklənmə vəziyyəti: {loading ? 'Yüklənir' : 'Yüklənib'}</li>
                <li>Xəta vəziyyəti: {error ? error : 'Xəta yoxdur'}</li>
                <li>Bildiriş sayı: {notifications.length}</li>
              </ul>
            </div>
            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            {/* Yüklənmə animasiyası */}
            {loading && (
              <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            )}
            
            {/* Məlumatlar bölməsi */}
            {!loading && notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map((notification, index) => (
                  <li
                    key={notification.id || index}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <div className="bg-gray-50 p-1 mb-1 rounded">
                      <span className="font-bold mr-2">ID:</span> 
                      {notification.id || 'ID yoxdur'}
                    </div>
                    
                    <div className="bg-gray-50 p-1 mb-1 rounded">
                      <span className="font-bold mr-2">Ad:</span> 
                      {notification.name || 'Ad göstərilməyib'}
                    </div>
                    
                    <div className="bg-gray-50 p-1 mb-1 rounded">
                      <span className="font-bold mr-2">Email:</span> 
                      {notification.email || 'Email göstərilməyib'}
                    </div>
                    
                    <div className="bg-gray-50 p-1 mb-1 rounded">
                      <span className="font-bold mr-2">Şərh:</span> 
                      {notification.comment || notification.message || notification.text || 'Şərh yoxdur'}
                    </div>
                    
                    <div className="bg-gray-50 p-1 mb-1 rounded">
                      <span className="font-bold mr-2">Tarix:</span> 
                      {notification.createdAt || notification.date || notification.timestamp
                        ? new Date(notification.createdAt || notification.date || notification.timestamp).toLocaleString('az-AZ')
                        : 'Tarix qeyd olunmayıb'}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p className="text-center text-gray-500">Heç bir bildiriş yoxdur.</p>
            )}
            
            {/* Modalın bağlanması üçün düymə */}
            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-all duration-300"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notfaciton;