import React, { useState } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    about: "",
    price: 0,
    discount: 0,
    finalPrice: 0,
    categoryId: "",
    tagIds: "",
    variantIds: "",
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 📌 Input dəyişiklikləri
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 📌 Şəkil seçildikdə
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 📌 Şəkili `Products` qovluğuna yüklə və URL al
  const uploadImage = async () => {
    if (!image) {
      alert("Zəhmət olmasa bir şəkil seçin!");
      return null;
    }

    setLoading(true);

    const data = new FormData();
    data.append("File", image);
    data.append("FolderName", "Products");

    try {
      const response = await fetch(
        "https://finalprojectt-001-site1.jtempurl.com/api/UploadFile/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) throw new Error("Şəkil yüklənmədi!");

      const result = await response.json();
      const fullUrl = "/Uploads/Products/" + result.imgUrl.split("/").pop();
      setImageUrl(fullUrl);
      console.log("Şəkil URL:", fullUrl);
      return fullUrl;
    } catch (error) {
      console.error("Şəkil yükləmə xətası:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 📌 Məhsulu `Product API`-yə göndər
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imgUrl = imageUrl;
    if (image) {
      imgUrl = await uploadImage();
      if (!imgUrl) {
        setLoading(false);
        return;
      }
    }

    const productData = new FormData();
    productData.append("Title", formData.title);
    productData.append("Description", formData.description);
    productData.append("About", formData.about);
    productData.append("Price", formData.price);
    productData.append("Discount", formData.discount);
    productData.append("FinalPrice", formData.price - formData.discount);
    productData.append("CategoryId", formData.categoryId);
    productData.append("ImgUrl", imgUrl);

    // ✅ `TagIds` və `VariantIds` array formatında göndərilir
    formData.tagIds.split(",").forEach((tag) => productData.append("TagIds", tag.trim()));
    formData.variantIds.split(",").forEach((variant) => productData.append("VariantIds", variant.trim()));

    console.log("📌 Göndərilən FormData:");
    for (let pair of productData.entries()) {
        console.log(pair[0] + ":", pair[1]);
    }

    try {
      const response = await fetch(
        "https://finalprojectt-001-site1.jtempurl.com/api/Product",
        {
          method: "POST",
          body: productData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("🚨 Server cavabı:", errorText);
        alert("🚨 Server cavabı: " + errorText);
        throw new Error(`Məhsul yaradılmadı! Server cavabı: ${errorText}`);
      }

      console.log("Məhsul uğurla yaradıldı!");
      alert("✅ Məhsul uğurla əlavə edildi!");

      setFormData({
        title: "",
        description: "",
        about: "",
        price: 0,
        discount: 0,
        finalPrice: 0,
        categoryId: "",
        tagIds: "",
        variantIds: "",
      });
      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.error("❌ Məhsul əlavə etmə xətası:", error);
      alert("❌ Məhsul əlavə edilərkən xəta baş verdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Yeni Məhsul Əlavə Et</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Başlıq" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="description" placeholder="Təsvir" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="about" placeholder="Haqqında" value={formData.about} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="number" name="price" placeholder="Qiymət" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="number" name="discount" placeholder="Endirim" value={formData.discount} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="categoryId" placeholder="Kateqoriya ID" value={formData.categoryId} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />

        {/* 📌 `TagIds` və `VariantIds` input sahələri */}
        <input type="text" name="tagIds" placeholder="Tag-lar (vergüllə ayırın)" value={formData.tagIds} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        <input type="text" name="variantIds" placeholder="Variant-lar (vergüllə ayırın)" value={formData.variantIds} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />

        {/* 📌 Şəkil Yükləmə */}
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded-lg" />

        {/* 📌 Məhsul Əlavə Et */}
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          {loading ? "Məhsul əlavə edilir..." : "Məhsulu Əlavə Et"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
