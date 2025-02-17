import React, { useContext, useState } from "react";
import { DATA } from "../../Context/Datacontext";
import { BASKET } from "../../Context/BasketContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LIKESDATA } from "../../Context/LikeContext";



function Product() {
  const { mehsul } = useContext(DATA);
  const { bassketadd } = useContext(BASKET);
  const {addlikem} = useContext(LIKESDATA)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // ✅ Yönləndirmə üçün

  const categoryName = searchParams.get("category");
  const filteredProducts = categoryName
    ? mehsul.filter((item) => item.categoryName === categoryName)
    : mehsul;

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Məhsullar - {categoryName || "Bütün Kateqoriyalar"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} bassketadd={bassketadd} navigate={navigate} />
          ))
        ) : (
          <p className="text-gray-500 text-lg font-semibold text-center col-span-full">
            Bu kateqoriyada məhsul tapılmadı.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductCard({ item, bassketadd, navigate }) {
  const [count, setCount] = useState(1);
  const finalPrice = (item.discount > 0 ? item.finalPrice : item.price) * count;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full xl:w-[280px] p-4">
      {/* Məhsul şəkli */}
      <div className="relative cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
        <img
          src={`http://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`}
          alt={item.title}
          className="w-full h-52 object-cover hover:scale-105 duration-300 ease rounded-lg"
        />
        {item.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {item.discount} %
          </span>
        )}
      </div>

      {/* Məhsul məlumatları */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
        <p className="text-sm text-gray-600">{item.categoryName}</p>
        <p className="text-sm text-gray-600">{item.description}</p>

        <div className="flex items-center gap-2 mt-2">
          {item.discount > 0 ? (
            <>
              <span className="text-gray-500 text-sm line-through">{item.price.toFixed(2)} ₼</span>
              <span className="text-green-600 text-lg font-bold">{finalPrice.toFixed(2)} ₼</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">{finalPrice.toFixed(2)} ₼</span>
          )}

        </div>

        {/* Say seçimi */}
        <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mt-4">
          <button
            className="text-gray-700 text-lg font-bold"
            onClick={() => setCount(count > 1 ? count - 1 : 1)}
          >
            -
          </button>
          <span className="text-lg font-semibold">{count}</span>
          <button
            className="text-gray-700 text-lg font-bold"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>

        {/* Düymələr */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => {
              bassketadd(
                item.title,
                item.about,
                item.id,
                `https://finalprojectt-001-site1.jtempurl.com${item.imgUrl}`,
                item.description,
                item.price,
                item.discount,
                item.finalPrice,
                count // ✅ Burada seçilmiş say göndərilir
              );
            }}
            className="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            {count} ədəd Səbətə at
          </button>


          <button onClick={()=>addlikem()}  className="bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-200">
  Sevimlilərə əlavə et
</button>

        </div>
      </div>
    </div>
  );
}

export default Product;