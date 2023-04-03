import React, { useState } from "react";
import axios from "axios";

const Comment = ({ id }) => {
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const commentHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `http://localhost:8000/api/v1/post/${id}/comment`,
          {
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setContent("");
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={commentHandler}>
      <div className="form-group">
        <label htmlFor="content">Leave a comment</label>
        <textarea
          name="content"
          id="postContent"
          className="form-control"
          value={content}
          required
          rows="3"
          maxLength="255"
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
      </div>
      <button className="mt-3 btn btn-outline-success">Submit</button>
    </form>
  );
};

export default Comment;
