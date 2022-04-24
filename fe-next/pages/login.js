import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { BACKEND } from "../helpers";
import Router from "next/router";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import { useCookies } from "react-cookie";
import { NavBar } from "../components/navbar";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import LoginCard from "../components/login";

export default function Login({ employee, allEmployees }) {
  const [, setCookie] = useCookies(["token"]);

  const handleSubmit = async (values, action) => {
    console.log(values);
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
        action.setStatus("Incorrect Username or Password ");
      });
  };

  return (
    <div>
      <NavBar employee={employee} />
      <Container>
        <h1 className="text-center mt-2">Log in</h1>

        <Row>
          <Col xs={12} md={7}>
            <div className="d-flex align-items-center justify-content-center">
              {allEmployees &&
                allEmployees.map((employee) => (
                  <LoginCard
                    employee={employee}
                    onSubmit={handleSubmit}
                  ></LoginCard>
                ))}
            </div>
          </Col>

          <Col md={4} className="py-5">
            <Formik
              initialValues={{
                id: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Container
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "3px solid #DFE1E4",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    overflow: "auto",
                    boxShadow: "5px 5px 10px grey",
                  }}
                >
                  <center>Vaperous Master</center>
                  <Form
                    className
                    style={{
                      margin: "auto",
                      width: "70%",
                      padding: "10px",
                    }}
                  >
                    <label htmlFor="id">User ID</label>
                    <Col>
                      <Field
                        style={{
                          border: "1px solid #AEB1B4",
                          paddingLeft: "10px",
                          outline: "none",
                        }}
                        id="id"
                        name="id"
                        placeholder="User ID"
                      />
                    </Col>
                    <label htmlFor="password">Password</label>
                    <Col>
                      <Field
                        style={{
                          border: "1px solid #AEB1B4",
                          paddingLeft: "10px",
                          outline: "none",
                        }}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                      />
                    </Col>
                    <button
                      style={{
                        backgroundColor: "#2274E1",
                        fontWeight: "bold",
                        color: "white",
                        borderRadius: "20px",
                        width: "35vh",
                        outline: "none",
                        border: "none",
                        padding: "8px 14px",
                      }}
                      variant="primary"
                      type="submit"
                      className="my-3"
                    >
                      Login
                    </button>
                  </Form>{" "}
                  {formik.status && (
                    <div style={{ color: "red" }}>{formik.status}</div>
                  )}
                </Container>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const allEmployees = await axios.get(BACKEND + "/api/employees/all");

  return {
    props: {
      allEmployees: allEmployees.data.employees,
      ...(await AuthenticateEmployee(context)).props,
    },
  };
}
