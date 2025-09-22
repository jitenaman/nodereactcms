import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // for image preview
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/manage"); // redirect after creation
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
    <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      Add Posts
      <Link to="/manage" style={{ marginLeft: "auto", padding: "6px 12px", background: "#4CAF50", color: "#fff", textDecoration: "none", borderRadius: "4px" }}>
        Back
      </Link>
    </h2>
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#f9f9f9",
      }}
    >
      

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        rows={5}
        style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}
      />

      <input
        type="file"
        onChange={handleImageChange}
        style={{ marginBottom: "15px" }}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: "100%", marginBottom: "15px", borderRadius: "4px" }}
        />
      )}

      <button
        type="submit"
         style={{ padding: "8px 16px" }}
      >
        Create Post
      </button>
    </form>
   </> 
  );
}
