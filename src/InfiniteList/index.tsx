import "./InfiniteList.css";

import { memo, useCallback, useEffect, useId, useRef } from "react";

import CommentItem from "./ListItem";
import useDataFetcher from "./useDataFetcher";

const ReloadFactor = 50;

function InfiniteList() {
  const { data, next } = useDataFetcher();
  const uniqueListId = useId();

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target: HTMLDivElement = event.currentTarget!;
      const totalHeight = target.scrollHeight;
      const visibleHeight = target.scrollTop + target.clientHeight;
      const shouldLoadMore = visibleHeight + ReloadFactor > totalHeight;
      if (!shouldLoadMore) return;

      next();
    },
    [next]
  );

  return (
    <div onScroll={onScroll} className="listContainer">
      <h1>Infinite List</h1>
      {data.map((comment) => (
        <CommentItem key={`${uniqueListId}-${comment.id}`} comment={comment} />
      ))}
    </div>
  );
}

export default (InfiniteList);
