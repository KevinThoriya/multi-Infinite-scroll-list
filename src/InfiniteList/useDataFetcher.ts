import { useCallback, useEffect, useState } from "react";

import { Comment } from "../types";

const useDataFetcher = () => {
  const [data, setData] = useState<Comment[]>([]);

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

  return { data };
};

export default useDataFetcher;
