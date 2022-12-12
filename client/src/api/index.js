import axios from "axios";
import { toast } from "react-toastify";
import qs from "query-string";

const Api = axios.create({
  baseURL: "http://192.168.0.37:8000",
});

Api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    toast.error(err?.response);
    return new Error(err);
  }
);

export default Api;

export const fetcher = async (url, data) => {
  const response = await Api.get(`${url}?${qs.stringify(data)}`);

  return response;
};
