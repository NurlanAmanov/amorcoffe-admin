import React, { useContext } from 'react'
import { MEHSULLARLIST } from '../../Context/ProductContext'

function Productlist() {
    const {mehsul} =useContext(MEHSULLARLIST)
 
    
  return (
    <>
      <div className="font-[sans-serif] overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">
              Məhsulun Şəkili
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
            Məhsulun adı
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
            Kateqoriya  
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
            Qiyməti
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Endirimli
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
            Endirimli Qiyməti
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
           Məhsul İD
            </th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {mehsul && mehsul.map((item,i)=>{
            return (
                <tr key={i} className="even:bg-blue-50">
            <td className="p-4 text-sm text-black">
           <img  src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`} className='w-[40px] h-[40px] object-cover' alt='Mehsul' />
            </td>
            <td className="p-4 text-sm text-black">
          {item.title}
            </td>

            <td className="p-4 text-sm text-black">
             {item.categoryName}
            </td>
            <td className="p-4 text-sm text-black">
              {item.price} ₼
            </td>
           
            
            <td className="p-4 text-sm text-black">
             {item.discount} %
            </td>

            <td className="p-4 text-sm text-black">
             {item.finalPrice} ₼
            </td>
            <td className="p-4 text-sm text-black">
             {item.categoryId} ₼
            </td>
          </tr>
            )
          })}

   
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Productlist
