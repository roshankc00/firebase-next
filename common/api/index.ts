import { queryClient } from "@/components/providers/reactquery.provider";
import { auth } from "@/helpers/firebase";
import axios from "axios";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const LogoutUser = () => {
  Cookies.remove("Authentication");
  queryClient.invalidateQueries({ queryKey: ["current-user"] });
  signOut(auth);
  window.location.href = "/login";
};

const api = axios.create({
  baseURL: "/",
  headers: {
    Authorization: `Bearer ${Cookies.get("Authentication")}`,
  },
});
("");

export const isUserAuthenticated = () => {
  const token = Cookies.get("Authentication");
  return token ? true : false;
};

api.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${Cookies.get("Authentication")}`;
  return req;
});
api.interceptors.response.use(
  (res) => {
    if (res.status === 201) {
      new Promise((res) => setTimeout(res, 500));
    }
    return res;
  },
  (error) => {
    new Promise((res) => setTimeout(res, 300));
    if (error.config.method != "get") {
      if (error.response.status === 401) {
        toast.error(
          error.response.data.message ||
            "You are not authorized to perform the action!"
        );
        LogoutUser();
      } else {
        toast.error(error?.response?.data.message || "Something went wrong");
      }
    }
    return Promise.reject(error?.response?.data);
  }
);
export default api;
