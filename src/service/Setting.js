import axios from "axios";

const HEADBANNER_BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api/HeadBanners";
const SLOGAN_BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api/Slogan";

/**
 * Bütün Headbanner-ləri gətirir
 */
async function GetHeadderbanner() {
    try {
        const res = await axios.get(HEADBANNER_BASE_URL);
        return res.data;
    } catch (error) {
        console.error("GetHeadbanners Error:", error);
        throw error;
    }
}

/**
 * Yeni Headbanner əlavə edir
 */
async function AddHeadbanner(name, description) {
    const data = new FormData();
    data.append("Name", name);
    data.append("Description", description);

    try {
        const res = await axios.post(HEADBANNER_BASE_URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error("AddHeadbanner Error:", error);
        throw error;
    }
}

/**
 * Mövcud Headbanner-i yeniləyir (PUT)
 */
async function UpdateHeadbanner(id, name, description) {
    if (!id) {
        console.error("UpdateHeadbanner Error: ID yoxdur!");
        return;
    }

    try {
        const res = await axios.put(`${HEADBANNER_BASE_URL}/${id}`, {
            Name: name,
            Description: description
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}` // Əgər token varsa
            }
        });

        return res.data;
    } catch (error) {
        console.error("UpdateHeadbanner Error:", error);
        throw error;
    }
}

/**
 * Mövcud Headbanner-i silir (DELETE)
 */
async function DeleteHeadbanner(id) {
    try {
        await axios.delete(`${HEADBANNER_BASE_URL}/${id}`);
    } catch (error) {
        console.error("DeleteHeadbanner Error:", error);
        throw error;
    }
}

/**
 * Bütün Slogan-ləri gətirir
 */
async function GetSlogans() {
    try {
        const res = await axios.get(SLOGAN_BASE_URL);
        return res.data;
    } catch (error) {
        console.error("GetSlogans Error:", error);
        throw error;
    }
}

/**
 * Yeni Slogan əlavə edir
 */
async function AddSlogan(name, description) {
    const data = new FormData();
    data.append("Name", name);
    data.append("Description", description);

    try {
        const res = await axios.post(SLOGAN_BASE_URL, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error("AddSlogan Error:", error);
        throw error;
    }
}

/**
 * Mövcud Slogan-i yeniləyir (PUT)
 */
async function UpdateSlogan(id, name, description) {
    if (!id) {
        console.error("UpdateSlogan Error: ID yoxdur!");
        return;
    }

    try {
        const res = await axios.put(`${SLOGAN_BASE_URL}/${id}`, {
            Name: name,
            Description: description
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}` // Əgər token varsa
            }
        });

        return res.data;
    } catch (error) {
        console.error("UpdateSlogan Error:", error);
        throw error;
    }
}

/**
 * Mövcud Slogan-i silir (DELETE)
 */
async function DeleteSlogan(id) {
    try {
        await axios.delete(`${SLOGAN_BASE_URL}/${id}`);
    } catch (error) {
        console.error("DeleteSlogan Error:", error);
        throw error;
    }
}

export { 
    GetHeadderbanner, 
    AddHeadbanner, 
    UpdateHeadbanner, 
    DeleteHeadbanner, 
    GetSlogans, 
    AddSlogan, 
    UpdateSlogan, 
    DeleteSlogan 
};
