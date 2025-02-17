import React, { useContext, useState } from 'react';
import { SETTIGDATA } from '../../Context/SettingContex';


function Headbanner() {
    const { banners, addBanner, updateBanner, deleteBanner } = useContext(SETTIGDATA);
    const [formData, setFormData] = useState({
        Name: '',
        Description: '',
        Id: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.Id) {
            await updateBanner(formData.Id, formData.Name, formData.Description);
        } else {
            await addBanner(formData.Name, formData.Description);
        }
        setFormData({ Name: '', Description: '', Id: null }); // Formu sıfırla
    };

    const handleEdit = (banner) => {
        setFormData({ Name: banner.name, Description: banner.description, Id: banner.id });
    };

    return (
        <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col px-4 space-y-6">
                <div>
                    <label className="mb-2 text-lg block">Başlıq</label>
                    <input
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        placeholder="Başlıq daxil edin"
                        className="px-4 py-2.5 rounded-md border border-gray-400 w-full"
                    />
                </div>
                <div>
                    <label className="mb-2 text-base block">Mətn</label>
                    <input
                        type="text"
                        name="Description"
                        value={formData.Description}
                        onChange={handleChange}
                        placeholder="Mətn daxil edin"
                        className="px-4 py-2 rounded-md border border-gray-400 w-full"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    {formData.Id ? "Yenilə" : "Əlavə et"}
                </button>
            </form>

            {/* Mövcud bannerlərin siyahısı */}
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Mövcud Headbanners</h2>
                <ul className="space-y-2">
                    {banners.map((banner, index) => (
                        <li key={index} className="border p-2 rounded flex justify-between items-center">
                            <div>
                                <strong>{banner.name}</strong>: {banner.description}
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                                    onClick={() => handleEdit(banner)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                    onClick={() => deleteBanner(banner.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Headbanner;
