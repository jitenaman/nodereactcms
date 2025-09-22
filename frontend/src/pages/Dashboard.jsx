import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    const fetchPostsCount = async () => {
      try {
        const res = await API.get("/posts"); // you can also use /posts?page=1&limit=1
        setPostsCount(res.data.total); // use the 'total' from backend
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchPostsCount();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Total Posts: {postsCount}</p>
    </div>
  );
}
