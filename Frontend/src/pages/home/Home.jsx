import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import CreatePost from '../../components/createPost/CreatePost';
import PostCard from '../../components/postCard/PostCard';
import axios from 'axios';
import { AuthDataContext } from '../../context/authContext';
import styles from './Home.module.css';

function Home() {
  const serverUrl = useContext(AuthDataContext);

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  //  Fetch all posts
  const getPosts = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/post`, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (error) {
      console.log("Error fetching posts", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  //  Filter posts based on search
  const filteredPosts = posts.filter((post) =>
    post.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      
      {/* Navbar with search */}
      <Navbar search={search} setSearch={setSearch} />

      {/* Create Post */}
      <CreatePost refreshPosts={getPosts} />

      {/* Show posts */}
      {filteredPosts.length === 0 ? (
        <p className={styles.noPosts}>No posts found</p>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            refreshPosts={getPosts}
          />
        ))
      )}
    </div>
  );
}

export default Home;
