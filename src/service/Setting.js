import axios from "axios";

const BASE_URL = "https://finalprojectt-001-site1.jtempurl.com/api/HeadBanners";

/**
 * Bütün Headbanner-ləri gətirir
 */
async function GetHeadderbanner() {
    try {
        const res = await axios.get(BASE_URL);
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
        const res = await axios.post(BASE_URL, data, {
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
    try {
        const res = await axios.put(`${BASE_URL}/${id}`, { Name: name, Description: description });
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
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error("DeleteHeadbanner Error:", error);
        throw error;
    }
}

export { GetHeadderbanner, AddHeadbanner, UpdateHeadbanner, DeleteHeadbanner };
