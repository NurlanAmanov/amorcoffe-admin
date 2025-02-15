import React, { useContext } from 'react'
import { USERDATA } from '../../Context/Listuser'

function Userlist() {
  const  {user}=useContext(USERDATA)
  console.log(user);
  
  return (
    <>
<div className="font-sans overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
            İstifadəçi adı
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Promo kod
            </th>
          
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
      Istifadəçi İD
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
        
        {user && user.map((item,i)=>{
          return (
            <tr key={i}>
            <td className="px-4 py-4 text-sm text-gray-800">
             {item.userName}
            </td>
            <td className="px-4 py-4 text-sm text-gray-800">
             {item.userPromocodes}
            </td>
          
            <td className="px-4 py-4 text-sm text-gray-800">
   {item.id}
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

export default Userlist
