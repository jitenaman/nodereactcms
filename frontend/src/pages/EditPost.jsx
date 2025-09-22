import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // new file
  const [preview, setPreview] = useState(""); // URL for preview
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setTitle(res.data.title || "");
        setContent(res.data.content || "");

        // set preview to existing image if available
        if (res.data.image) {
          setPreview(`http://localhost:5000/uploads/${res.data.image}`);
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch post:", err.response?.data || err.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file); // show preview
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await API.put(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/manage"); // redirect after update
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <>
    <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      Edit Posts
      <Link to="/manage" style={{ marginLeft: "auto", padding: "6px 12px", background: "#4CAF50", color: "#fff", textDecoration: "none", borderRadius: "4px" }}>
        Back
      </Link>
    </h2>
    <form onSubmit={handleUpdate} style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#f9f9f9",
      }}>
       

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        rows={5}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      ></textarea>

      {/* Image preview */}
      {preview && (
        <div style={{ marginBottom: "10px" }}>
          <img src={preview} alt="Preview" style={{ width: "150px", height: "auto" }} />
        </div>
      )}

      <input
        type="file"
        onChange={handleImageChange}
        style={{ marginBottom: "10px" }}
      />

      <button type="submit" style={{ padding: "8px 16px" }}>
        Update Post
      </button>
    </form>
   </> 
  );
}
