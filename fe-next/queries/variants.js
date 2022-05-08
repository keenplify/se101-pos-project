import axios from "axios";
import { BACKEND } from "../helpers";

export const VariantsQueries = {
  route: "/api/variants",

  getAll: async function (token) {
    return await axios.get(BACKEND + VariantsQueries.route + "/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  getByProductPaginate: async function (
    token,
    productId,
    limit = 10,
    lastId = 0
  ) {
    return await axios.get(
      BACKEND + VariantsQueries.route + "/getByProductPaginate",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          productId,
          limit,
          lastId,
        },
      }
    );
  },

  add: async function (token, productId, name, stock, price) {
    return await axios.post(
      BACKEND + VariantsQueries.route + "/add",
      {
        productId,
        name,
        stock,
        price,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  changeImage: async function (token, categoryId, formdata) {
    return await axios.post(
      BACKEND + VariantsQueries.route + "/changeImage/" + categoryId,
      formdata,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  update: async function (token, variantId, name, stock, price) {
    return await axios.put(
      BACKEND + VariantsQueries.route + "/" + variantId,
      { name, stock, price },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  delete: async function (token, variantId) {
    return await axios.delete(
      BACKEND + VariantsQueries.route + "/" + variantId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  search: async function (token, keyword) {
    return await axios.get(
      BACKEND + VariantsQueries.route + "/search/" + keyword,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};
