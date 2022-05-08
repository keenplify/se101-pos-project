import axios from "axios";
import { BACKEND } from "../helpers";

export const EmployeesQueries = {
  route: "/api/employees",

  getAll: async function (token) {
    return await axios.get(BACKEND + EmployeesQueries.route + "/all", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  getById: async function (token, id) {
    return await axios.get(BACKEND + EmployeesQueries.route + "/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },

  add: async function (token, firstName, lastName, type, password) {
    return await axios.post(
      BACKEND + EmployeesQueries.route + "/add",
      {
        firstName,
        lastName,
        type,
        password
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  changeImage: async function (token, employeeId, formdata) {
    return await axios.post(
      BACKEND + EmployeesQueries.route + "/changeImage/" + employeeId,
      formdata,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  update: async function (token, employeeId, firstName, lastName, type) {
    return await axios.put(
      BACKEND + EmployeesQueries.route + "/" + employeeId,
      { firstName, lastName, type },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },

  delete: async function (token, employeeId) {
    return await axios.delete(
      BACKEND + EmployeesQueries.route + "/"+employeeId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }
};
