import axios from "axios";
import { BACKEND } from "../helpers";

export const VariantsQueries = {
  route: "/api/variants",

  getAll: async function (token) {
    return await axios.get(BACKEND + this.route + "/all", {
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
    return await axios.get(BACKEND + this.route + "/getByProductPaginate", {
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        productId,
        limit,
        lastId,
      },
    });
  },

  add: async function (token, productId, name, stock, price) {
    return await axios.post(
      BACKEND + this.route + "/add",
      {
        productId,
        name,
        stock,
        price
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
};
