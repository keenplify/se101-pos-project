import axios from "axios";
import { BACKEND } from "../helpers";

export const LogsQueries = {
  route: "/api/logs",

  getAll: async function (token) {
    return await axios.get(BACKEND + LogsQueries.route + "/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  getAllPaginate: async function (
    token,
    limit,
    params
  ) {
    return await axios.get(
      BACKEND + LogsQueries.route + `/allPaginate`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          limit,
          ...params,
        }
      }
    );
  },
};
