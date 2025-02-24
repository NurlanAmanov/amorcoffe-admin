import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // React Router Hook-ları

function Notfaciton() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  // useLocation hook'u URL-dəki dəyişiklikləri izləyir
  const location = useLocation();
  const navigate = useNavigate();

  // API-dən məlumatları çəkirik
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'https://finalprojectt-001-site1.jtempurl.com/api/Contact?limit=30'
        );
        setNotifications(response.data);
      } catch (error) {
        setError('Xəta baş verdi, məlumatları yükləyə bilmədik.');
      }
    };

    fetchNotifications();
  }, []);

  // Modalın URL-də açılması üçün URL path-nı yoxlayaq
  const isModalOpen = location.pathname === '/notfaciton'; 

  // Modalı bağlamaq
  const closeModal = () => {
    navigate(-1); // Modal bağlandıqda bir öncəki səhifəyə geri dönürük
  };

  return (
    <div>
      <li>
        <Link
          to="/notfaciton" // Bu linkə basanda yönləndirilir
          className="text-white text-sm flex items-center hover:bg-gray-700 rounded-lg px-4 py-3 transition-all"
        >
          📥 Bildirişlər
        </Link>
      </li>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[80%] shadow-xl transform transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Bildirişlər</h2>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition-all duration-300"
              >
                X
              </button>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Məlumatlar */}
            {notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="border-b pb-3 last:border-b-0"
                  >
                    <p className="font-semibold text-gray-700">{notification.name}</p>
                    <p className="font-semibold text-gray-700">{notification.email}</p>
                    <p className="text-gray-600">{notification.comment}</p>
                    <p className="text-sm text-gray-400">{notification.createdAt}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Heç bir bildiriş yoxdur.</p>
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
    </div>
  );
}

export default Notfaciton;
