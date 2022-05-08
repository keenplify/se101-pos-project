import React from "react";
import { Formik, Field, Form as FormikForm} from "formik";
import axios from "axios";
import { BACKEND } from "../helpers";
import Router from "next/router";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import { useCookies } from "react-cookie";
import { NavBar } from "../components/navbar";
<<<<<<< Updated upstream
import {Card, Button, Container, Row, Col} from "react-bootstrap"
import LoginCard from "../components/login";

=======
import {Button, Container, Row, Col, Form, Img} from "react-bootstrap";
import LoginCard from "../components/login";
import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import styles from "../styles/login.module.css";
import Image from "react-bootstrap/Image";
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
        action.setStatus("Incorrect login credentials. ");
      });
  };
>>>>>>> Stashed changes

export default function Login({ employee,allEmployees}) {
  const [, setCookie] = useCookies(["token"]);
  console.log(allEmployees)
  return (
    <div>
      <NavBar employee={employee} />
      <Container>
<<<<<<< Updated upstream
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
=======

        <Row>
  
          <Col xs={12} md={7} className="py-5">
          <h3 className={styles.header}>Recent Logins</h3>
          <p>Click your picture or add an account.</p>
            <Row>
              {allEmployees &&
                allEmployees.map((employee, key) => (
                  <Col md={4} key={key}>
                    <LoginCard
                      employee={employee}
                      onSubmit={handleSubmit}
                    ></LoginCard> 
                  </Col>
                ))}
            </Row>
          </Col>

          <Col md={4} className="py-5 ms-5">
            <Formik
              initialValues={{
                id: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Container className="border shadow p-4">
              <h1 className={styles.NavBrand}>Account LogIn</h1>
              <Image src="/img/tao.jpg" className="img-fluid rounded-circle mx-auto d-flex mb-3" style={{
                         width: "40%",
                        }}/>

                  <FormikForm>

                  
                    <Col className="input-group py-2">
                    <span class="input-group-text bg-transparent" id="basic-addon1"><FaRegUser></FaRegUser></span>
                      <Field
                      className="form-control border-start-0"
                        id="id"
                        name="id"
                        placeholder="User ID"
                        required
                      />
                      
                    </Col>
                  
             
                    <Col className="input-group py-2">
                    <span class="input-group-text bg-transparent border" id="basic-addon1"><FiLock></FiLock></span>
                      <Field
                       className="form-control border-start-0"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                      />
                      
                    </Col >
                    <div class="d-grid gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn my-3"
                    >
                      Login
                    </Button>
                    </div>
                   
                  </FormikForm>{" "}
                  {formik.status && (
                    <div style={{ color: "red" }}>{formik.status}</div>
                  )}
                </Container>
              )}
            </Formik>
          </Col>
        </Row>
>>>>>>> Stashed changes
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
