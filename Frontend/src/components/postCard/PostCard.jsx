import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./PostCard.module.css";
import { AuthDataContext } from "../../context/authContext";

function PostCard({ post, refreshPosts }) {
  const serverUrl = useContext(AuthDataContext);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [follow, setFollow] = useState(false);

  //  LIKE FUNCTION
  const handleLike = async () => {
    try {
      await axios.post(`${serverUrl}/api/post/like/${post._id}`,{},{ withCredentials: true });
      refreshPosts(); // update UI
    } catch (error) {
      console.log("Like error:", error);
    }
  };

  // COMMENT FUNCTION
  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);

      await axios.post(
        `${serverUrl}/post/comment/${post._id}`,
        { text: comment },
        { withCredentials: true }
      );

      setComment("");
      refreshPosts(); 

    } catch (error) {
      console.log("Comment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      
       {/* USER INFO */}
      <div className={styles.header}>
        <div className={styles.avatar}>
            <h2>{post?.user?.username.slice(0,1).toUpperCase()}</h2>
        </div>
        <button onClick={()=> setFollow(!follow)} className={styles.follow}>{follow ? "+Following" : "+Follow"}</button>

        <div>
          <h4>{post.user?.username || "User"}</h4>
          <span className={styles.time}>
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/*  POST TEXT */}
      <p className={styles.text}>{post.text}</p>

      {/* ACTIONS */}
        <div className={styles.actions}>
            <button className={styles.btn} onClick={handleLike}>
                <span style={{color: "white"}}>Like {post.likes.length} </span>       
            </button>
            
            <button onClick={() => setShowComments(!showComments)}>
                 <span >💬Comment {post.comments.length} </span>
            </button>
        </div>

        {/*  SHOW WHO LIKED */}
        {post.likes.length > 0 && (
        <div style={{ marginTop: "5px", fontSize: "13px", color: "gray" }}>
            Liked by:{" "}
            {post.likes.map((user, i) => (
            <span key={i}>
                {user.username}
                {i !== post.likes.length - 1 && ", "}
            </span>
            ))}
        </div>
        )}

      {/* COMMENT INPUT */}
      <div className={styles.commentBox}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={handleComment} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/*  SHOW COMMENTS */}
      {showComments && (
        <div className={styles.comments}>
          {post.comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            post.comments.map((c, i) => (
                <p key={i}>
                     <b>{c.user?.username}:</b> {c.text}
                </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PostCard;
