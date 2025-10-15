import "./../styles/App.css";
import React, { useState, useEffect, useMemo } from "react";
import "regenerator-runtime/runtime";

function App() {
  const [filter, setFilter] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = useMemo(
    () => `http://jsonplaceholder.typicode.com/posts`,
    []
  );

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const filtered = filter
          ? data.filter((post) => post.title.includes(filter))
          : data;
        setPosts(filtered);
      })
      .finally(() => setLoading(false));
  }, [apiUrl, filter]);

  return (
    <div>
      <h2>Cached API Example</h2>
      <input
        type="text"
        placeholder="Filter posts by title"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
