import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { BACKEND } from "../helpers";
import Router from "next/router";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import { useCookies } from "react-cookie";
import { NavBar } from "../components/navbar";

export default function Login({ employee }) {
  const [, setCookie] = useCookies(["token"]);

  return (
    <div>
      <NavBar employee={employee} />
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          id: "",
          password: "",
        }}
        onSubmit={async (values, action) => {
          axios
            .post(BACKEND + "/api/employees/login", {
              id: values.id,
              password: values.password,
            })
            .then(function (response) {
              setCookie("token", response.data.token);
              Router.push("/");
            })
            .catch(function (error) {
              console.log(error);
              action.setStatus("unavailable to login. Error: " + error.message);
            });
        }}
      >
        {(formik) => (
          <Form>
            {formik.status && <div>{formik.status}</div>}
            <label htmlFor="id">ID</label>
            <Field id="id" name="id" placeholder="Jane" />

            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Doe"
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export async function getServerSideProps(context) {
  return AuthenticateEmployee(context);
}
