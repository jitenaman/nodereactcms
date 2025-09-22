import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await API.get(`/posts?page=${pageNum}&limit=5`);
      setPosts(res.data.posts || []);
      setPages(res.data.pages || 1);
      setPage(res.data.page || 1);
    } catch (err) {
      console.error("Failed to fetch posts:", err.response?.data || err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      fetchPosts(page);
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      Manage Posts
      <Link to="/create" style={{ marginLeft: "auto", padding: "6px 12px", background: "#4CAF50", color: "#fff", textDecoration: "none", borderRadius: "4px" }}>
        Create Post
      </Link>
    </h2>
      
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((p) => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.content.substring(0, 50)}...</td>
                  <td>
                    {p.image && (
                      <img
                        src={`http://localhost:5000/uploads/${p.image}`}
                        alt=""
                        width="80"
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/edit/${p._id}`} style={{ marginRight: "10px" }}>
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(p._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No posts found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => fetchPosts(page - 1)} disabled={page === 1}>
          ⬅ Prev
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => fetchPosts(num)}
            style={{
              margin: "0 5px",
              background: num === page ? "#1e1e2f" : "#ddd",
              color: num === page ? "#fff" : "#000",
            }}
          >
            {num}
          </button>
        ))}
        <button onClick={() => fetchPosts(page + 1)} disabled={page === pages}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
