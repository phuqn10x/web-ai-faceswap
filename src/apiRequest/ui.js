import http from "../lib/http";

const uiApiRequest = {
  GetHomePage: async () => await http.get(`/v1/homepage`),
};

export default uiApiRequest;
