import React, { useState, useEffect } from "react";
import axios from "axios";

const Zodiac = () => {
  const [zodiacName, setZodiacName] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zodiacs, setZodiacs] = useState([]);
  const [expandedZodiac, setExpandedZodiac] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editZodiacId, setEditZodiacId] = useState(null);
  const [editCreatedAt, setEditCreatedAt] = useState(null);

  // Token
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjM5ZWYxZTNmLTk3MGMtNDU5My1hZmY2LTBhN2I0NGE4NmUxOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJudXJsYW5hbWFub3YiLCJOYW1lIjoiTnVybGFuIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibnVybGFuZW1lbm92MTRAZ21haWwuY29tIiwiZXhwIjoxNzQxNjkwMjg4LCJpc3MiOiJmaW5hbHByb2plY3R0LTAwMS1zaXRlMS5qdGVtcHVybC5jb20iLCJhdWQiOiJmaW5hbHByb2plY3R0LTAwMS1zaXRlMS5qdGVtcHVybC5jb20ifQ.g_t_vS7r_w6DGoPqmgExDxrJbkJm7ZGD1lcZ3ut7zr4";

  // Fetch products and zodiacs when component mounts
  useEffect(() => {
    fetchProducts();
    fetchZodiacs();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Product");
      setProducts(response.data);
    } catch (error) {
      console.error("Məhsulları yükləyərkən xəta:", error);
    }
  };

  // Fetch zodiacs
  const fetchZodiacs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Zodiac");
      setZodiacs(response.data);
    } catch (error) {
      console.error("Burcları yükləyərkən xəta:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle zodiac name change
  const handleZodiacNameChange = (e) => {
    setZodiacName(e.target.value);
  };

  // Handle product selection
  const handleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Handle form submission to create zodiac
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!zodiacName.trim()) {
      showNotification("Burç adı daxil edin", "error");
      return;
    }
    
    if (selectedProducts.length === 0) {
      showNotification("Ən azı bir məhsul seçin", "error");
      return;
    }
    
    setLoading(true);

    if (editMode) {
      // Update existing zodiac
      await handleUpdate();
    } else {
      // Create new zodiac
      const formData = new FormData();
      formData.append("Name", zodiacName);
      
      // Add selected products to form data
      selectedProducts.forEach(productId => {
        formData.append("ProductIds", productId);
      });

      try {
        const response = await axios.post(
          "https://finalprojectt-001-site1.jtempurl.com/api/Zodiac",
          formData,
          {
            headers: {
              "accept": "*/*",
              "Authorization": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          showNotification("Burç uğurla yaradıldı!", "success");
          resetForm();
          fetchZodiacs();
        }
      } catch (error) {
        console.error("Burç yaradarkən xəta:", error);
        showNotification(`Xəta: ${error.response?.data?.message || "Bilinməyən xəta"}`, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle update zodiac
  const handleUpdate = async () => {
    try {
      if (!zodiacName.trim()) {
        showNotification("Burç adı daxil edin", "error");
        setLoading(false);
        return;
      }
      
      if (selectedProducts.length === 0) {
        showNotification("Ən azı bir məhsul seçin", "error");
        setLoading(false);
        return;
      }
      
      setUpdateLoading(editZodiacId);
      
      const formData = new FormData();
      formData.append("Id", editZodiacId);
      formData.append("Name", zodiacName);
      formData.append("CreatedAt", editCreatedAt);
      
      // Add selected products to form data
      selectedProducts.forEach(productId => {
        formData.append("ProductIds", productId);
      });

      const response = await axios.put(
        `https://finalprojectt-001-site1.jtempurl.com/api/Zodiac/${editZodiacId}`,
        formData,
        {
          headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        showNotification("Burç uğurla yeniləndi!", "success");
        resetForm();
        fetchZodiacs();
      }
    } catch (error) {
      console.error("Burç yeniləmə xətası:", error);
      showNotification(`Xəta: ${error.response?.data?.message || "Bilinməyən xəta"}`, "error");
    } finally {
      setUpdateLoading(null);
      setLoading(false);
    }
  };

  // Set Edit mode
  const handleEdit = (zodiac) => {
    setEditMode(true);
    setEditZodiacId(zodiac.id);
    setZodiacName(zodiac.name);
    setEditCreatedAt(zodiac.createdAt);
    
    // Set selected products
    const productIds = zodiac.products.map(product => product.id);
    setSelectedProducts(productIds);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form
  const resetForm = () => {
    setZodiacName("");
    setSelectedProducts([]);
    setEditMode(false);
    setEditZodiacId(null);
    setEditCreatedAt(null);
  };

  // Show notification instead of alert
  const showNotification = (message, type) => {
    const notificationDiv = document.createElement("div");
    notificationDiv.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white z-50 animate-fadeIn`;
    notificationDiv.innerHTML = message;
    document.body.appendChild(notificationDiv);
    
    setTimeout(() => {
      notificationDiv.classList.add("animate-fadeOut");
      setTimeout(() => {
        document.body.removeChild(notificationDiv);
      }, 500);
    }, 3000);
  };

  // Toggle expanded zodiac
  const toggleExpand = (id) => {
    if (expandedZodiac === id) {
      setExpandedZodiac(null);
    } else {
      setExpandedZodiac(id);
    }
  };

  // Delete zodiac
  const handleDelete = async (id) => {
    if (!window.confirm("Bu burcu silmək istədiyinizə əminsiniz?")) {
      return;
    }
    
    try {
      setDeleteLoading(id);
      
      // FormData obyekti yaradırıq və id əlavə edirik
      const formData = new FormData();
      formData.append("id", id);
      
      const response = await axios.delete(
        `https://finalprojectt-001-site1.jtempurl.com/api/Zodiac/${id}`,
        {
          headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData, // Formdatanı body-də göndəririk
        }
      );
      
      if (response.status === 200) {
        showNotification("Burç uğurla silindi!", "success");
        setZodiacs(prev => prev.filter(zodiac => zodiac.id !== id));
      }
    } catch (error) {
      console.error("Burç silmə xətası:", error);
      showNotification("Burç silmə zamanı xəta", "error");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-12 px-4 w-full">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-12">Burç İdarəetmə Paneli</h1>
        
        <div className="bg-white shadow-xl rounded-xl p-6 mb-8 border border-indigo-100 transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 border-b pb-4">
            {editMode ? "Burç Yeniləmə" : "Yeni Burç Yaratma"}
          </h2>
          
          {/* Editing indicator */}
          {editMode && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm leading-5 text-yellow-700">
                    "{zodiacs.find(z => z.id === editZodiacId)?.name}" burcu düzəlişi edilir
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Burç Adı</label>
              <input
                type="text"
                value={zodiacName}
                onChange={handleZodiacNameChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Burcun adını daxil edin"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Məhsullar</label>
              <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <div className="animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ) : (
                    products.map((product) => (
                      <div 
                        key={product.id} 
                        className={`flex items-center border-b pb-3 hover:bg-indigo-50 rounded p-2 transition-all ${
                          selectedProducts.includes(product.id) ? "bg-indigo-100" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleProductSelection(product.id)}
                          className="mr-3 h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        />
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 mr-3">
                          <img 
                            src={`http://finalprojectt-001-site1.jtempurl.com${product.imgUrl}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/48?text=Xəta";
                            }}
                          />
                        </div>
                        <label htmlFor={`product-${product.id}`} className="cursor-pointer font-medium text-gray-800 hover:text-indigo-700 flex-1">
                          {product.title}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Seçilmiş məhsul sayı: {selectedProducts.length}</p>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : editMode 
                      ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg" 
                      : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editMode ? "Yenilənir..." : "Yaradılır..."}
                  </span>
                ) : (
                  editMode ? "Burcu Yenilə" : "Burç Yarat"
                )}
              </button>
              
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Ləğv Et
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className="bg-white shadow-xl rounded-xl p-6 border border-indigo-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 border-b pb-4">Mövcud Burclar</h2>
          
          <div className="space-y-4">
            {loading && zodiacs.length === 0 ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex flex-col space-y-3 border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : zodiacs.length === 0 ? (
              <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Heç bir burç tapılmadı</h3>
                <p className="mt-1 text-gray-500">Yeni burç yaratmaq üçün yuxarıdakı formu doldurun.</p>
              </div>
            ) : (
              zodiacs.map((zodiac) => (
                <div 
                  key={zodiac.id} 
                  className={`border ${editZodiacId === zodiac.id ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'} rounded-lg p-4 transition-all hover:shadow-md`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-indigo-700">{zodiac.name}</h3>
                    <div className="flex space-x-2">
                   
                      <button
                        onClick={() => handleEdit(zodiac)}
                        disabled={updateLoading === zodiac.id}
                        className={`px-3 py-1 rounded-md ${
                          updateLoading === zodiac.id 
                            ? "bg-gray-400 cursor-not-allowed text-white" 
                            : "text-white bg-green-600 hover:bg-green-700"
                        } transition-all text-sm font-medium`}
                      >
                        {updateLoading === zodiac.id ? (
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          "Düzəliş"
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(zodiac.id)}
                        disabled={deleteLoading === zodiac.id}
                        className={`px-3 py-1 rounded-md text-white transition-all text-sm font-medium ${
                          deleteLoading === zodiac.id 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {deleteLoading === zodiac.id ? (
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          "Sil"
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {expandedZodiac === zodiac.id && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-700 border-b pb-2">Məhsullar:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {zodiac.products && zodiac.products.length > 0 ? (
                          zodiac.products.map((product) => (
                            <div 
                              key={product.id} 
                              className="flex items-center border border-gray-200 p-3 rounded-lg hover:shadow-md hover:border-indigo-200 transition-all"
                            >
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 mr-3">
                                <img 
                                  src={`http://finalprojectt-001-site1.jtempurl.com${product.photoUrl}`} 
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/48?text=Xəta";
                                  }}
                                />
                              </div>
                              <span className="text-gray-800 truncate">{product.name}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 col-span-3 text-center py-4">Bu burca aid məhsul tapılmadı</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Animasiya stil-ləri əlavə edirik */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.5s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default Zodiac;