import React, { createContext, useState, useEffect } from 'react';
import { AddHeadbanner, DeleteHeadbanner, GetHeadderbanner, UpdateHeadbanner } from '../service/Setting';


export const SETTIGDATA = createContext([]);

function SettingContex({ children }) {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        GetHeadderbanner().then(setBanners).catch(console.error);
    }, []);

    // Yeni banner əlavə et
    const addBanner = async (name, description) => {
        try {
            const newBanner = await AddHeadbanner(name, description);
            setBanners([...banners, newBanner]);
        } catch (error) {
            console.error("Failed to add banner:", error);
        }
    };

    // Mövcud banneri yenilə
    const updateBanner = async (id, name, description) => {
        try {
            const updatedBanner = await UpdateHeadbanner(id, name, description);
            setBanners(banners.map(b => (b.id === id ? updatedBanner : b)));
        } catch (error) {
            console.error("Failed to update banner:", error);
        }
    };

    // Mövcud banneri sil
    const deleteBanner = async (id) => {
        try {
            await DeleteHeadbanner(id);
            setBanners(banners.filter(b => b.id !== id));
        } catch (error) {
            console.error("Failed to delete banner:", error);
        }
    };

    return (
        <SETTIGDATA.Provider value={{ banners, addBanner, updateBanner, deleteBanner }}>
            {children}
        </SETTIGDATA.Provider>
    );
}

export default SettingContex;
