import React, { useState, useEffect } from "react";
import axios from "axios";

function Tagsetting() {
  const [tagName, setTagName] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tags when the component mounts
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get("https://finalprojectt-001-site1.jtempurl.com/api/Tag");
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleTagChange = (e) => {
    setTagName(e.target.value);
  };

  // Handle submit to create a new tag
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Name", tagName);

    try {
      const response = await axios.post("https://finalprojectt-001-site1.jtempurl.com/api/Tag", formData, {
        headers: {
          "accept": "*/*",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("✅ Tag successfully created!");
        setTagName(""); // Clear input field after successful submission
        fetchTags(); // Refresh the tags list
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      alert("❌ Error while creating tag");
    } finally {
      setLoading(false);
    }
  };

  // Handle tag deletion
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`https://finalprojectt-001-site1.jtempurl.com/api/Tag/${id}`);
      if (response.status === 200) {
        alert("✅ Tag deleted successfully!");
        fetchTags(); // Refresh the tags list
      }
    } catch (error) {
      console.error("Error deleting tag:", error);
      alert("❌ Error while deleting tag");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Tag Elavə et</h2>

      {/* Form to create a new tag */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="tagName"
          placeholder="Tag Name"
          value={tagName}
          onChange={handleTagChange}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Creating Tag..." : "Create Tag"}
        </button>
      </form>

      {/* List of existing tags */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Yardılan taglar</h3>
        <ul className="space-y-2 mt-4">
          {tags.map((tag) => (
            <li key={tag.id} className="flex justify-between items-center">
              <span>{tag.name}</span>
              <button
                onClick={() => handleDelete(tag.id)}
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

export default Tagsetting;
