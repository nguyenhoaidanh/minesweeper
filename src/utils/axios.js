import axios from "axios";
import appConfig from "constants/config";
export const AXIOS = function(path, method, data) {
  let url = appConfig.api_url + path;
  let config = {
    method,
    url,
    data,
    timeout: 2 * 60 * 1000
  };
  return axios(config).catch(err => {
    console.log("[err when call axios]");
    console.log(err);
  });
};
