import React, { createContext, useEffect, useState } from 'react'
import { Getuser } from '../service/user'


export const USERDATA = createContext([])
function USERCONTEXT({ children }) {
    const [user, setUser] = useState([])

    useEffect(() => {
        Getuser().then(res =>setUser(res))      
 
    },[])

    return (
        <USERDATA.Provider value={{ user}}>
            {children}
        </USERDATA.Provider>
    )
}

export default USERCONTEXT