import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./CreatePost.module.css";
import { AuthDataContext } from "../../context/authContext";
function CreatePost({ refreshPosts }) {
  const serverUrl = useContext(AuthDataContext);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      await axios.post(`${serverUrl}/api/post/createpost`,
        { text },
        { withCredentials: true }
      );

      setText("");
      refreshPosts();

    } catch (error) {
      console.log("Error creating post", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
         <input
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`${styles.input} form-control`}
         />
    
      <div className={styles.bottom}>
        <div className={styles.icons}>
          <span>📷Photo</span>
          <span>😊Feeling</span>
        </div>

        <button
          onClick={handlePost}
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
