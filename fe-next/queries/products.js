import axios from "axios";
import { BACKEND } from "../helpers";
import qs from "qs";
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
};
