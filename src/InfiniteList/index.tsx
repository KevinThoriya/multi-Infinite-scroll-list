import "./InfiniteList.css";

import { useCallback, useEffect, useId, useState } from "react";

import { Comment } from "../types";
import CommentItem from "./ListItem";

function InfiniteList() {
  const [data, setData] = useState<Comment[]>([]);
  const uniqueListId = useId();

  const getData = useCallback(async (signal: AbortSignal) => {
    let response = await fetch(
      "https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10",
      {
        signal: signal,
      }
    );
    let result = (await response.json()) as Comment[];
    setData((prev) => prev.concat(result));
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    getData(controller.signal);
    return () => controller.abort();
  }, [getData]);

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
