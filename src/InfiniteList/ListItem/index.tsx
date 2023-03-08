import "./ListItem.css";

import { Comment } from "../../types";
import { memo } from "react";

type CommentItemProps = {
  comment: Comment;
};
function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="listItemContainer">
      <div className="commentId">{comment.id}</div>
      <div className="commentUserName">{comment.name}</div>
      <div className="commentUserEmail">{comment.email}</div>
      <div className="commentBody">{comment.body}</div>
    </div>
  );
}

export default memo(CommentItem);
