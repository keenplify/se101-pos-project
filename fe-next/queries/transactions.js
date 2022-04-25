import axios from "axios";
import { BACKEND } from "../helpers";

export const TransactionsQueries = {
  route: "/api/transactions",

  getById: async function (token, transactionId) {
    return await axios.get(BACKEND + this.route + "/" + transactionId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  add: async function (token) {
    return await axios.post(
      BACKEND + this.route + "/add",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },

  finalize: async function (
    token,
    transactionId,
    type,
    remarks,
    eWalletType,
    account_name,
    phone_number
  ) {
    let data = {
      type,
      remarks,
    };

    if (type === "EWALLET")
      data = {
        ...body,
        eWalletType,
        account_name,
        phone_number,
      };

    return await axios.post(
      BACKEND + this.route + "/finalizeTransaction/" + transactionId,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
};
