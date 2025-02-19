import React, { useContext } from 'react';
import { MEHSULLARLIST } from '../../Context/ProductContext';
import axios from 'axios';

function Productlist() {
    const { mehsul, setMehsul } = useContext(MEHSULLARLIST);

    // 📌 Handle delete product
    const handleDelete = async (id) => {
      try {
          // First, check if the image exists
          const product = mehsul.find(item => item.id === id);  // Get the product from the list
          if (!product) {
              alert("Məhsul tapılmadı!");
              return;
          }
  
          // If the product has an image, you can check if the image URL exists
          const imgUrl = product.imgUrl;
  
          // You can check if the image exists by looking at the URL or set it to null
          if (imgUrl && imgUrl !== '') {
              console.log("Şəkil var, silinir:", imgUrl);
          } else {
              console.log("Şəkil yoxdur, yalnız məhsul silinir.");
          }
  
          // Proceed with the DELETE request to remove the product from the server
          const response = await axios.delete(`https://finalprojectt-001-site1.jtempurl.com/api/Product/${id}`);
  
          if (response.status === 200) {
              // Successfully deleted the product, now update the state
              const updatedProducts = mehsul.filter(product => product.id !== id);
              setMehsul(updatedProducts);
              alert('Məhsul uğurla silindi!');
  
              // Refresh the product list after deletion
              await refreshProductList();
          } else {
              alert('Məhsul silinərkən xəta baş verdi!');
          }
      } catch (error) {
         
        }
  };
  
  // Function to refresh the product list after deletion
  const refreshProductList = async () => {
      try {
          const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Product");
          setMehsul(response.data); // Update the mehsul state with the new product list
      } catch (error) {
          console.error("Məhsul siyahısını yeniləməkdə xəta:", error);
          alert("Məhsul siyahısını yeniləməkdə xəta baş verdi!");
      }
  };
  
  
  

    return (
        <>
            <div className="font-[sans-serif] overflow-x-auto w-full">
                <table className="min-w-full bg-white">
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
