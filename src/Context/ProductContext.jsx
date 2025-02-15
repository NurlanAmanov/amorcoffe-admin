import React, { createContext, useEffect, useState } from 'react'
import { GetCategoryProduct, getmehsullist } from '../service/mehsullist'


export const MEHSULLARLIST = createContext([])
function MEHSULLARSIYAHI({ children }) {
    const [mehsul, setMehsull] = useState([])
    const [category, setcategory] = useState([])

    useEffect(() => {
        getmehsullist().then(res =>setMehsull(res))     
        GetCategoryProduct().then(res=>setcategory(res))
 
    },[])

    return (
        <MEHSULLARLIST.Provider value={{ mehsul,category}}>
            {children}
        </MEHSULLARLIST.Provider>
    )
}

export default MEHSULLARSIYAHI