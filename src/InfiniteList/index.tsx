import "./InfiniteList.css";

import { useCallback, useEffect, useState } from "react";

import { Comment } from "../types";
import CommentItem from "./ListItem";

function InfiniteList() {
  const [data, setData] = useState<Comment[]>([]);

  const getData = useCallback(async () => {
    let response = await fetch(
      "https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10"
    );
    let result = (await response.json()) as Comment[];
    setData((prev) => prev.concat(result));
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="listContainer">
      <h1>Infinite List</h1>
      <div className="">
        {data.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default InfiniteList;
