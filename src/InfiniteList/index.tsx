import "./InfiniteList.css";

import CommentItem from "./ListItem";
import useDataFetcher from "./useDataFetcher";
import { useId } from "react";

function InfiniteList() {
  const { data } = useDataFetcher();
  const uniqueListId = useId();

  return (
    <div className="listContainer">
      <h1>Infinite List</h1>
      <div className="">
        {data.map((comment) => (
          <CommentItem
            key={`${uniqueListId}-${comment.id}`}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
}

export default InfiniteList;
