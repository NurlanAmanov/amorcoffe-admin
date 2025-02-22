import React, { useContext } from 'react';
import { MEHSULLARLIST } from '../../Context/ProductContext';
import axios from 'axios';

function Productlist() {
    const { mehsul, setMehsul } = useContext(MEHSULLARLIST);

    const handleDelete = async (id) => {
      await refreshProductList(); // İlk olaraq siyahını yeniləyin
      try {
          const product = mehsul.find(item => item.id === id);
          if (!product) {
              alert("Məhsul tapılmadı!");
              return;
          }

          const response = await axios.delete(`https://finalprojectt-001-site1.jtempurl.com/api/Product/${id}`);
          if (response.status === 200) {
              const updatedProducts = mehsul.filter(product => product.id !== id);
              setMehsul(updatedProducts);
              alert('Məhsul uğurla silindi!');
          } else {
              throw new Error('Məhsul silinərkən xəta baş verdi!'); // Explicit error to catch
          }
      } catch (error) {
          alert(error.message); // Show custom error message
      }
  };

  const refreshProductList = async () => {
      try {
          const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Product");
          setMehsul(response.data);
      } catch (error) {
          console.error("Məhsul siyahısını yeniləməkdə xəta:", error);
      }
  };
  

    return (
        <>
            <div className="font-[sans-serif] overflow-x-auto w-full">
                <table className=" bg-white">
                    <thead className="bg-gray-800 whitespace-nowrap">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium text-white">Məhsulun Şəkili</th>
                            <th className="p-4 text-left text-sm font-medium text-white">Məhsulun adı</th>
                            <th className="p-4 text-left text-sm font-medium text-white">Kateqoriya</th>
                            <th className="p-4 text-left text-sm font-medium text-white">Qiyməti</th>
                            <th className="p-4 text-left text-sm font-medium text-white">Endirimli</th>
                            <th className="p-4 text-left text-sm font-medium text-white">Endirimli Qiyməti</th>
                            <th className="p-4 text-left text-sm font-medium text-white">Məhsul İD</th>
                            <th className="p-4 text-left text-sm font-medium text-white">Əməliyyat</th>
                        </tr>
                    </thead>

                    <tbody className="whitespace-nowrap">
                        {mehsul && mehsul.map((item, i) => {
                            return (
                                <tr key={i} className="even:bg-blue-50">
                                    <td className="p-4 text-sm text-black">
                                        <img src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`} className='w-[40px] h-[40px] object-cover' alt='Mehsul' />
                                    </td>
                                    <td className="p-4 text-sm text-black">{item.title}</td>
                                    <td className="p-4 text-sm text-black">{item.categoryName}</td>
                                    <td className="p-4 text-sm text-black">{item.price} ₼</td>
                                    <td className="p-4 text-sm text-black">{item.discount} %</td>
                                    <td className="p-4 text-sm text-black">{item.finalPrice} ₼</td>
                                    <td className="p-4 text-sm text-black">{item.categoryId}</td>
                                    <td className="p-4 text-sm text-black">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Productlist;
