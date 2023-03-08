import { useCallback, useEffect, useState } from "react";

import { AppUrl } from "../Config";
import { Comment } from "../types";

type CommentDataProviderType = {
  data: Comment[];
  loading: boolean;
};
const useDataFetcher = () => {
  var page = 0;
  const [apiData, setDataApi] = useState<CommentDataProviderType>({
    data: [],
    loading: false,
  });

  const getData = useCallback(
    async (signal?: AbortSignal) => {
      setDataApi((prev) => ({
        ...prev,
        loading: true,
      }));
      let response = await fetch(
        `${AppUrl}comments?_page=${++page}&_limit=10`,
        {
          signal: signal,
        }
      );
      let result = (await response.json()) as Comment[];
      setDataApi((prev) => ({
        data: prev.data.concat(result),
        loading: false,
      }));
    },
    [setDataApi]
  );

  useEffect(() => {
    let controller = new AbortController();
    getData(controller.signal);
    return () => {
      controller.abort();
      --page;
    };
  }, [getData]);

  const next = useCallback(() => {
    if (apiData.loading) return;
    getData();
  }, [apiData.loading, getData]);

  return { data: apiData.data, loading: apiData.loading, next };
};

export default useDataFetcher;
