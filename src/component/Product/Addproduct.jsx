import React, { useState, useEffect } from "react";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    about: "",
    price: 0,
    discount: 0,
    finalPrice: 0,
    categoryId: "",
    tagIds: [], // Tags should be an array
    variantIds: [], // Variants should be an array
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [tags, setTags] = useState([]); // State for tags

  // Fetch Categories and Tags when the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/Category");
        const data = await response.json();
        setCategories(data); 
      } catch (error) {
        console.error("Xəta: Kateqoriyalar alınmadı", error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/Tag");
        const data = await response.json();
        setTags(data); // Set tags to state
      } catch (error) {
        console.error("Xəta: Taglar alınmadı", error);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await fetch("https://finalprojectt-001-site1.jtempurl.com/api/Variant");
        const data = await response.json();
        setVariants(data); 
      } catch (error) {
        console.error("Xəta: Variantlar alınmadı", error);
      }
    };

    fetchVariants();
  }, []);

  // 📌 Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "tagIds") {
        const newTags = checked 
          ? [...formData.tagIds, value] 
          : formData.tagIds.filter((tag) => tag !== value);
        setFormData({ ...formData, tagIds: newTags });
      } else if (name === "variantIds") {
        const newVariants = checked
          ? [...formData.variantIds, value]
          : formData.variantIds.filter((variant) => variant !== value);
        setFormData({ ...formData, variantIds: newVariants });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 📌 Handle Image Selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // 📌 Upload Image and Get Image URL
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
    productData.append("Price", formData.price);
    productData.append("Discount", formData.discount);
    productData.append("FinalPrice", formData.finalPrice);
    productData.append("CategoryId", formData.categoryId);
    productData.append("ImgUrl", imgUrl);
  
    // Taglar üçün düzgün şəkildə əlavə etmək
    formData.tagIds.forEach(tagId => {
      productData.append("TagIds", tagId);
    });
  
    // Variantlar üçün düzgün şəkildə əlavə etmək
    formData.variantIds.forEach(variantId => {
      const variant = variants.find(v => v.id === variantId);
      if (variant) {
        productData.append("VariantIds", variantId);
      }
    });
  
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
  
      alert("✅ Məhsul uğurla əlavə edildi!");
      setFormData({
        title: "",
        description: "",
     
        price: 0,
        discount: 0,
        finalPrice: 0,
        categoryId: "",
        tagIds: [],
        variantIds: [],
      });
      setImage(null);
      setImageUrl("");
    } catch (error) {
      alert("❌ Məhsul əlavə edilərkən xəta baş verdi!");
      console.error("❌ Məhsul əlavə etmə xətası:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Yeni Məhsul Əlavə Et</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Başlıq"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="description"
          placeholder="Təsvir"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        
        <input
          type="number"
          name="price"
          placeholder="Qiymət"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="discount"
          placeholder="Endirim"
          value={formData.discount}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* 📌 Kateqoriya Seçimi */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Kateqoriya seçin</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
<p>Tag seçin</p>
        {/* 📌 Taglar Seçimi */}
        <div className="space-y-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center">
              <input
                type="checkbox"
                name="tagIds"
                value={tag.id}
                onChange={handleChange}
                className="mr-2"
              />
              <span>{tag.name}</span>
            </div>
          ))}
        </div>
        <p>Ölçü seçin</p>
        {/* 📌 Variantlar Seçimi */}
        <div className="space-y-2">
          {variants.map((variant) => (
            <div key={variant.id} className="flex items-center">
              <input
                type="checkbox"
                name="variantIds"
                value={variant.id}
                onChange={handleChange}
                className="mr-2"
              />
              <span>{variant.name}</span>
            </div>
          ))}
        </div>

        {/* 📌 Şəkil Yükləmə */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded-lg"
        />

        {/* 📌 Məhsul Əlavə Et */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Məhsul əlavə edilir..." : "Məhsulu Əlavə Et"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
