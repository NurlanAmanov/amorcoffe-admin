import React, { createContext, useState, useEffect } from 'react';
import { 
    AddHeadbanner, 
    DeleteHeadbanner, 
    GetHeadderbanner, 
    UpdateHeadbanner,
    GetSlogans,
    AddSlogan,
    UpdateSlogan,
    DeleteSlogan 
} from '../service/Setting';

export const SETTIGDATA = createContext([]);

function SettingContex({ children }) {
    const [banners, setBanners] = useState([]);
    const [slogans, setSlogans] = useState([]);

    // Fetch HeadBanners and Slogans on load
    useEffect(() => {
        GetHeadderbanner().then(setBanners).catch(console.error);
        GetSlogans().then(setSlogans).catch(console.error);
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

    // Yeni slogan əlavə et
    const addSlogan = async (name, description) => {
        try {
            const newSlogan = await AddSlogan(name, description);
            setSlogans([...slogans, newSlogan]);
        } catch (error) {
            console.error("Failed to add slogan:", error);
        }
    };

    // Mövcud sloganı yenilə
    const updateSlogan = async (id, name, description) => {
        try {
            const updatedSlogan = await UpdateSlogan(id, name, description);
            setSlogans(slogans.map(s => (s.id === id ? updatedSlogan : s)));
        } catch (error) {
            console.error("Failed to update slogan:", error);
        }
    };

    // Mövcud sloganı sil
    const deleteSlogan = async (id) => {
        try {
            await DeleteSlogan(id);
            setSlogans(slogans.filter(s => s.id !== id));
        } catch (error) {
            console.error("Failed to delete slogan:", error);
        }
    };

    return (
        <SETTIGDATA.Provider 
            value={{
                banners, 
                addBanner, 
                updateBanner, 
                deleteBanner,
                slogans,
                addSlogan,
                updateSlogan,
                deleteSlogan
            }}
        >
            {children}
        </SETTIGDATA.Provider>
    );
}

export default SettingContex;
