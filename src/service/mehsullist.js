import axios from "axios";

async function getmehsullist() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Product");
    return res.data;
}

async function GetCategoryProduct() {
    const res = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Category");
    return res.data;
}

async function PostMehsullProduct(productData) {
    const res = await axios.post("https://finalprojectt-001-site1.jtempurl.com/api/Product", productData, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.data;
}

export { getmehsullist, GetCategoryProduct, PostMehsullProduct };
