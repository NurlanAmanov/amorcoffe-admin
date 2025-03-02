import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Qrnotification() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);  // Modal avtomatik açılsın

  useEffect(() => {
    const fetchQROrders = async () => {
      try {
        const response = await axios.get('https://finalprojectt-001-site1.jtempurl.com/api/Order/all-qr-code-orders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('QR kod sifarişlərini yükləmək mümkün olmadı:', error);
        setError('QR kod sifarişlərini yükləmək mümkün olmadı');
        setLoading(false);
      }
    };

    fetchQROrders();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) return <p>Məlumatlar yüklənir...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {isModalOpen && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, maxWidth: 800, width: '100%' }}>
            <h2 className="text-lg font-semibold">QR Kod Sifarişləri</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-500">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 px-4 py-2 text-black">Məhsul</th>
                    <th className="border border-gray-400 px-4 py-2 text-black">Qiymət</th>
                    <th className="border border-gray-400 px-4 py-2 text-black">Miqdar</th>
                    <th className="border border-gray-400 px-4 py-2 text-black">Yaradılma Tarixi</th>
                    <th className="border border-gray-400 px-4 py-2 text-black">Masa Adı</th> {/* Table name column */}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) =>
                    order.orderProducts.map((product) => {
                      // Endirimli məhsul varsa price, yoxsa finalPrice göstərilsin
                      const priceToShow = product.product.discount ? product.product.price : product.product.finalPrice;
                      return (
                        <tr key={product.id}>
                          <td className="border border-gray-400 px-4 py-2">{product.product.title}</td>
                          <td className="border border-gray-400 px-4 py-2">
                            {
                            product.product.discount > 0 ? product.product.finalPrice :  product.product.price 

                            }
                           ₼
                          </td>
                          <td className="border border-gray-400 px-4 py-2">{product.quantity}</td>
                          <td className="border border-gray-400 px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                          <td className="border border-gray-400 px-4 py-2">{order.tableName || "Masa adı daxil edilməyib"}</td> {/* Show tableName */}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-secondary" onClick={toggleModal}>Bağla</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Qrnotification;
