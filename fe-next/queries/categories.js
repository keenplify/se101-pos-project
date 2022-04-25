import axios from "axios";
import { BACKEND } from "../helpers";

export const CategoriesQueries = {
  route: "/api/categories",

  getAll: async function (token) {
    return await axios.get(BACKEND + this.route + "/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  getById: async function (token, id) {
    return await axios.get(BACKEND + this.route + "/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  add: async function (token, name, description) {
    return await axios.post(
      BACKEND + this.route + "/add",
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};
