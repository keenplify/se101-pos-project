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
};
