import "./InfiniteList.css";

import { memo, useCallback, useId } from "react";

import CommentItem from "./ListItem";
import useDataFetcher from "./useDataFetcher";

const ReloadFactor = 50;
type InfiniteListProps = {
  listId: string | number;
};

function InfiniteList({ listId }: InfiniteListProps) {
  const { data, next } = useDataFetcher();

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
        <CommentItem key={`${listId}-${comment.id}`} comment={comment} />
      ))}
    </div>
  );
}

export default memo(InfiniteList);
