import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  InputGroup,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { AuthenticateEmployee } from "../helpers/AuthenticateEmployee";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND } from "../helpers";

export default function Employee({ employee, allEmployees }) {
  return (
    <div>
      <Head>
        <title>Vaperous M4ster - POS Website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/img/Logo.jpg" />
      </Head>
      <NavBar employee={employee}></NavBar>
      <br></br>

      <Container fluid>
        <Row className="p-5">
          <Col md="9" lg="12">
            <Card>
              <Card.Body>
                <h1 className="text-center">Employees </h1>
                <div className="container col-lg-10 justify-content-center ">
                  <div className="row">
                    {allEmployees &&
                      allEmployees.map((employee) => (
                        <div className="col-md-3 py-3">
                          <div
                            className="bg-image"
                            style={{ maxWidth: "24rem" }}
                          >
                            <img
                              src={
                                employee?.image_location
                                  ? BACKEND + employee.image_location
                                  : "/img/tao.jpg"
                              }
                              className="img-fluid"
                              alt="emp"
                            />
                            <div
                              className="mask"
                              style={{ backgroundColor: "rgba(39, 26, 12)" }}
                            >
                              <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white">
                                <strong>
                                  {employee.firstName} {employee.lastName}
                                </strong>
                                <div>{employee.type}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer></Footer>
    </div>
  );
}
export async function getServerSideProps(context) {
  const allEmployees = await axios.get(BACKEND + "/api/employees/all");
  const employee = await AuthenticateEmployee(context);

  if (employee.props.employee.type == "ADMIN") {
    return {
      redirect: {
        destination: "/employeeadmin",
        permanent: false,
      },
      props: {},
    };
  }

  if (!employee?.props?.employee) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      allEmployees: allEmployees.data.employees,
      ...employee.props,
    },
  };
}
