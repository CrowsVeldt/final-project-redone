import { privateAxios } from "../api/axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = privateAxios.interceptors.response.use(
      (res) => res,
      // what happens in case of response with error
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 403 && !previousRequest.sent) {
          previousRequest.sent = true;
          const newAccessToken = await refreshToken();

          previousRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateAxios(previousRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, refreshToken]);

  return privateAxios;
};

export default useAxiosPrivate;
