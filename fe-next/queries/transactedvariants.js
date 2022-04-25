import axios from "axios";
import { BACKEND } from "../helpers";

export const TransactedVariantsQueries = {
  route: "/api/transactedvariants",

  add: async function (token, variantId, quantity, transactionId) {
    return await axios.post(
      BACKEND + this.route + "/add",
      {
        variantId,
        quantity,
        transactionId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  getById: async function (token, transactedVariantId) {
    return await axios.get(BACKEND + this.route + "/" + transactedVariantId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  editQuantityById: async function (token, transactedVariantId, quantity) {
    return await axios.post(
      BACKEND + this.route + "/editquantity/" + transactedVariantId,
      { quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  deleteById: async function (token, transactedVariantId) {
    return await axios.delete(
      BACKEND + this.route + "/" + transactedVariantId,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
};
