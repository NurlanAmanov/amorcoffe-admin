import React, { useState, useEffect } from "react";
import axios from "axios";

function VariantSetting() {
  const [variantName, setVariantName] = useState("");
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = async () => {
    try {
      const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Variant");
      setVariants(response.data);
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  const handleVariantChange = (e) => {
    setVariantName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('jwtToken'); // Token əlavə edin
      const response = await axios.post("https://finalprojectt-001-site1.jtempurl.com/api/Variant", {
        Name: variantName
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Token əlavə edin
        },
      });

      if (response.status === 200) {
        alert("✅ Variant successfully created!");
        setVariantName(""); // Clear input field after successful submission
        fetchVariants(); // Refresh the variants list
      }
    } catch (error) {
      console.error("Error creating variant:", error);
      alert("❌ Error while creating variant");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwtToken'); // Token əlavə edin
      const response = await axios.delete(`https://finalprojectt-001-site1.jtempurl.com/api/Variant?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Token əlavə edin
        },
      });
  
      // API cavabını yoxlayırıq
      if (response.status === 200) {
        alert("✅ Variant deleted successfully!");
        fetchVariants(); // Variantları yeniləyin
      } else {
        console.error("Server cavabı:", response);
        alert("❌ Variant silinərkən xəta baş verdi.");
      }
    } catch (error) {
      // Xətanı daha yaxşı izah edirik
      console.error("Error deleting variant:", error);
      alert("❌ Error while deleting variant: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Ölçü yarad (kiçik,orta vəs...)</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="variantName"
          placeholder="Variant Name"
          value={variantName}
          onChange={handleVariantChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Ölçü yaradılır" : "Ölçünü yarad"}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Yardılan ölçülər</h3>
        <ul className="space-y-2 mt-4">
          {variants.map((variant) => (
            <li key={variant.id} className="flex justify-between items-center">
              <span>{variant.name}</span>
              <button
                onClick={() => handleDelete(variant.id)}
                className="text-red-500 hover:text-red-700"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VariantSetting;