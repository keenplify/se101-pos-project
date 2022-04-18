import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { BACKEND } from "../helpers";
import Router from "next/router";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import { useCookies } from "react-cookie";
import { NavBar } from "../components/navbar";
import {Card, Button, Container, Row, Col} from "react-bootstrap"
import LoginCard from "../components/login";


export default function Login({ employee,allEmployees}) {
  const [, setCookie] = useCookies(["token"]);
  console.log(allEmployees)
  return (
    <div>
      <NavBar employee={employee} />
      <Container>
      <Row>
        
        <Col xs={12} md={8}>
      <h1>Sign Up</h1>
      {allEmployees && allEmployees.map(employee=><LoginCard employee={employee}></LoginCard>)}
    </Col>



<Col xs={6} md={4}>
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
      </Col>
      </Row>
      </Container>
    </div>
  );
}


export async function getServerSideProps(context) {
   const allEmployees=await axios.get(BACKEND + "/api/employees/all")
  
  return{
    props: {
      allEmployees:allEmployees.data.employees,
      ...(await AuthenticateEmployee(context)).props
    }

  }
}
