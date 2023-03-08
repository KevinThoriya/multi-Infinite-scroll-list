import "./InfiniteList.css";

import { memo, useCallback, useId } from "react";

import CommentItem from "./ListItem";
import { ScrollLoadMoreThrottle } from "../Config";
import useDataFetcher from "./useDataFetcher";

type InfiniteListProps = {
  listId: string | number;
};

function InfiniteList({ listId }: InfiniteListProps) {
  const { data, next, loading } = useDataFetcher();

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target: HTMLDivElement = event.currentTarget!;
      const totalHeight = target.scrollHeight;
      const visibleHeight = target.scrollTop + target.clientHeight;
      const shouldLoadMore =
        visibleHeight + ScrollLoadMoreThrottle > totalHeight;
      if (!shouldLoadMore) return;

      next();
    },
    [next]
  );

  return (
    <div onScroll={onScroll} className="listContainer">
      <h4>Infinite List {listId}</h4>
      {data.map((comment) => (
        <CommentItem key={`${listId}-${comment.id}`} comment={comment} />
      ))}
      {loading && <h4>Loading ...</h4>}
    </div>
  );
}

export default memo(InfiniteList);
