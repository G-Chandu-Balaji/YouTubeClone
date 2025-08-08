import React, { useEffect, useState } from "react";
import CommentItem from "./commentItem";
import AddComment from "./AddComment";

function Comments({ _id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getcomments() {
      let res = await fetch(`http://localhost:5000/api/comments/${_id}`);
      let data = await res.json();
      console.log("comments", data.comments);
      setComments(data.comments);
      console.log("inside state comments", comments);
    }
    getcomments();
  }, [_id]);

  return (
    <>
      <h3>{comments.length} Comments</h3>
      <AddComment videoId={_id} />

      <div>
        {comments.map((ele) => (
          <CommentItem data={ele} key={ele._id} videoId={_id} />
        ))}
      </div>
    </>
  );
}

export default Comments;
