import axios from "axios";

export const fetcher = async (url: string, params: any): Promise<any> => {
  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data);
};
