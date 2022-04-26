import axios from "axios";
import { BACKEND } from "../helpers";

export const CategoriesQueries = {
  route: "/api/categories",

  getAll: async function (token) {
    return await axios.get(BACKEND + CategoriesQueries.route + "/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  getById: async function (token, id) {
    return await axios.get(BACKEND + CategoriesQueries.route + "/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  add: async function (token, name, description) {
    return await axios.post(
      BACKEND + CategoriesQueries.route + "/add",
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

  changeImage: async function (token, categoryId, formdata) {
    return await axios.post(
      BACKEND + CategoriesQueries.route + "/changeImage/" + categoryId,
      formdata,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};
