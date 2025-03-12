import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bell from '../../assets/icon/bell.png';

function Header() {
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Paralel olaraq həm sifarişləri həm də masaları yükləyirik
        const [ordersResponse, tablesResponse] = await Promise.all([
          axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Order/all-qr-code-orders'),
          axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Table')
        ]);
        
        setOrders(ordersResponse.data);
        setTables(tablesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Məlumatları yükləmək mümkün olmadı:', error);
        setError('Məlumatları yükləmək mümkün olmadı');
        setLoading(false);
      }
    };

    fetchData();
    
    // Hər 2 dəqiqədə məlumatları yeniləyirik
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  // Masa adına görə masa ID-ni tapmaq üçün funksiya
  const getTableIdByName = (tableName) => {
    const table = tables.find(t => t.name === tableName);
    return table ? table.id : "Tapılmadı";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      // API çağırışı - əgər real API istifadə ediləcəksə, bu xətti aktiv edin
      // await axios.put(`https://finalprojectt-001-site1.jtempurl.com/api/Order/${orderId}/status`, { status });
      
      setOrders((prevOrders) => 
        prevOrders.map((order) => 
          order.id === orderId ? { ...order, status } : order
        )
      );
      
      setNotification({
        message: `Sifariş ${status} olaraq yeniləndi`,
        type: 'success'
      });
      
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      
      setSelectedOrder(null);
    } catch (error) {
      console.error('Sifarişi yeniləmək mümkün olmadı:', error);
      setNotification({
        message: 'Sifarişi yeniləmək mümkün olmadı',
        type: 'error'
      });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Oxundu':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Qəbul Edildi':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Xəta!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );

  return (
    <>
      <header className="bg-white shadow-md py-4 px-6">
        <div className="w-full mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
         
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
              onClick={toggleModal}
            >
              <img
                src={bell}
                alt='bell'
                className='w-6 h-6'
              />
              {orders.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {orders.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 
          'bg-red-100 border-l-4 border-red-500 text-red-700'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' ? 
              <i className="fas fa-check-circle mr-2"></i> : 
              <i className="fas fa-times-circle mr-2"></i>
            }
            <p>{notification.message}</p>
          </div>
        </div>
      )}

      {/* Orders Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">QR Kod Sifarişləri</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={toggleModal}
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-grow">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>Hal-hazırda heç bir QR kod sifarişi yoxdur</p>
                </div>
              ) : (
                <div className="p-6">
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Məhsul</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qiymət</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miqdar</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yaradılma Tarixi</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Masa Adı</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Masa ID</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) =>
                          order.orderProducts.map((product) => {
                            const priceToShow = product.product.discount ? product.product.finalPrice : product.product.price;
                            const tableId = getTableIdByName(order.tableName);
                            
                            return (
                              <tr 
                                key={product.id} 
                                className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${selectedOrder?.id === order.id ? 'bg-blue-50' : ''}`}
                                onClick={() => setSelectedOrder(order)}
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{priceToShow} ₼</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.tableName || "Masa adı daxil edilməyib"}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tableId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadgeClass(order.status)}`}>
                                    {order.status || 'Qəbul Edilmədi'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            {selectedOrder && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="text-sm text-gray-700">
                    <p><span className="font-semibold">Seçilmiş sifariş:</span> {selectedOrder.tableName || "Masa adı daxil edilməyib"}</p>
                    <p><span className="font-semibold">Masa ID:</span> {getTableIdByName(selectedOrder.tableName)}</p>
                    <p><span className="font-semibold">Sifarişin tarixi:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => handleOrderStatusChange(selectedOrder.id, 'Oxundu')}
                    >
                      <i className="fas fa-check mr-2"></i>
                      Oxundu
                    </button>
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => handleOrderStatusChange(selectedOrder.id, 'Qəbul Edildi')}
                    >
                      <i className="fas fa-check-double mr-2"></i>
                      Qəbul Edildi
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer" 
      />
    </>
  );
}

export default Header;