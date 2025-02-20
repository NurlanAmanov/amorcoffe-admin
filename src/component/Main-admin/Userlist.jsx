import React, { useContext } from 'react';
import { USERDATA } from '../../Context/Listuser';

function Userlist() {
  const { user } = useContext(USERDATA);
  console.log(user);

  return (
    <>
      <div className="font-sans w-[95%] overflow-x-auto">
        <table className="w-[95%] mx-auto divide-y divide-gray-200">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                İstifadəçi adı
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Promo kodlar
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                İstifadəçi İD
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
            {user && user.map((item, i) => (
              <tr key={i}>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {item.userName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {item.userPromocodes.length > 0 ? (
                    <ul>
                      {item.userPromocodes.map((promo, index) => (
                        <li key={index}>
                          <span className="font-medium text-blue-600">{promo.userPromocodes}</span> 
                          ({promo.promocode.discountPercentage}% endirim)
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "Yoxdur"
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {item.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Userlist;
