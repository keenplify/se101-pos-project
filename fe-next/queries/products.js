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
    return await axios.get(BACKEND + ProductsQueries.route + "/getByCategoryPaginate", {
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
      BACKEND + ProductsQueries.route + "/add",
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

  update: async function (token, productId, name) {
    return await axios.put(
      BACKEND + ProductsQueries.route + "/" + productId,
      { name },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  delete: async function (token, productId) {
    return await axios.delete(
      BACKEND + ProductsQueries.route + "/"+productId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }
};
