import "./../styles/App.css";
import React, { useState, useEffect, useMemo } from "react";
import "regenerator-runtime/runtime";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = useMemo(() => "http://jsonplaceholder.typicode.com/posts", []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [apiUrl]);

  return (
    <div>
      <h2>Cached API Example</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
