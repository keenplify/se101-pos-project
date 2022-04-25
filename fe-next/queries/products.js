import axios from "axios";
import { BACKEND } from "../helpers";
export const ProductsQueries = {
  route: "/api/products",

  getByCategoryPaginate: async function (
    token,
    categoryId,
    limit = 10,
    lastId = 0
  ) {
    return await axios.get(BACKEND + this.route + "/getByCategoryPaginate", {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        categoryId,
        limit,
        lastId,
      },
    });
  },

  add: async function (token, categoryId, name) {
    return await axios.post(
      BACKEND + this.route + "/add",
      {
        name,
        categoryId
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};
