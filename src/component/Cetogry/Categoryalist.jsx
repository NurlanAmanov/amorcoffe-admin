import React, { useContext } from 'react'
import { MEHSULLARLIST } from '../../Context/ProductContext'

function Categoryalist() {
        const {category}=useContext(MEHSULLARLIST)
  return (
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
          Məhsulun sayı
          </th>
          <th className="p-4 text-left text-sm font-medium text-white">
          Kateqoriya İD
          </th>
         
        </tr>
      </thead>

      <tbody className="whitespace-nowrap">
        {category && category.map((item,i)=>{
          return (
              <tr key={i} className="even:bg-blue-50">
          <td className="p-4 text-sm text-black">
         <img  src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`} className='w-[40px] h-[40px] object-cover' alt='Mehsul' />
          </td>
          <td className="p-4 text-sm text-black">
        {item.name}
          </td>

          <td className="p-4 text-sm text-black">
           {item.name}
          </td>
          <td className="p-4 text-sm text-black">
          {category.length}
          </td>
         
          
          <td className="p-4 text-sm text-black">
           {item.id}
          </td>

         
        </tr>
          )
        })}

 
      </tbody>
    </table>
  </div>
  )
}

export default Categoryalist
