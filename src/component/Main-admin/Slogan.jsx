import React, { useState, useContext } from 'react';
import { SETTIGDATA } from '../../Context/SettingContex';

function Slogan() {
  const { slogans, addSlogan, deleteSlogan } = useContext(SETTIGDATA); // Access slogans, addSlogan, and deleteSlogan function from context
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the addSlogan function from context to send the data to the API
    try {
      await addSlogan(name, description); // Pass the form data to the addSlogan function
      setName(''); // Reset the form fields after submission
      setDescription('');
      alert('Slogan added successfully!');
    } catch (error) {
      console.error('Error adding slogan:', error);
      alert('Failed to add slogan');
    }
  };

  const handleDelete = async (id) => {
    // Call the deleteSlogan function from context to remove the slogan from the API
    try {
      await deleteSlogan(id); // Pass the slogan ID to delete it
      alert('Slogan deleted successfully!');
    } catch (error) {
      console.error('Error deleting slogan:', error);
      alert('Failed to delete slogan');
    }
  };

  return (
    <div className="container mx-auto p-4 w-[650px]">
      <h2 className="text-2xl font-bold mb-4">Add New Slogan</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Başlıq
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Məzmun
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mt-8">Slogan List</h2>
      <ul className="mt-4">
        {slogans.length > 0 ? (
          slogans.map((slogan) => (
            <li key={slogan.id} className="mb-2 p-2 border-b border-gray-300 flex justify-between items-center">
              <span>
                <strong>{slogan.name}</strong>: {slogan.description}
              </span>
              <button
                onClick={() => handleDelete(slogan.id)}
                className="text-red-500 hover:text-red-700"
              >
                Sil
              </button>
            </li>
          ))
        ) : (
          <p>Slogan tapılmadı.</p>
        )}
      </ul>
    </div>
  );
}

export default Slogan;
