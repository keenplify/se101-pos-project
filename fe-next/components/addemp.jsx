import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../styles/edit.module.css";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  DropdownButton,
  Label,
  Modal,
} from "react-bootstrap";
import { Field, Formik } from "formik";
import Employee from "../pages/employee";
import axios from "axios";
import { BACKEND } from "../helpers";

export default function AddEmployee({token}) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" class="btn btn-primary" onClick={handleShow}>
        Add Employee
      </button>
      <Formik
        initialValues={{
          image: "",
          firstname: "",
          lastname: "",
          password: "",
          role: "",
          imgB64: ""
        }}
        onSubmit={async (values, action) => {
          try {
            const result = await axios.post(BACKEND + "/api/employees/add", {
              firstName: values.firstname,
              lastName: values.lastname,
              password: values.password,
              type: values.role
            }, {headers: {
              Authorization: `Bearer ${token}`
            }})

            router.reload();
          } catch (error) {
            console.log(error.response);
            action.setStatus(error.toString())
          }
        }}
      >
        {(formik) => (
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <h1>{formik.status}</h1>
                <Row>
                  <Col xs={6} md={4}>
                    <Form>
                      <Form.Label for="image" className={styles.FormLabel}>
                        <AiOutlinePlus></AiOutlinePlus>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        className={styles.FormControl}
                        name="filepond"
                        id="image"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={(event) => {
                          var reader = new FileReader();
                          reader.readAsDataURL(event.currentTarget.files[0]);
                          reader.onload = function () {
                            formik.setFieldValue(
                              "imgB64",
                              reader.result
                            )
                          };
                          formik.setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                          );
                        }}
                      />

                      {formik.values.image ? <img src={formik.values.imgB64}></img> : ''}

                      <label htmlFor="firstname">Firstname</label>
                      <Field
                        id="firstname"
                        name="firstname"
                        placeholder="Firstname"
                      />

                      <label htmlFor="firstname">Lastname</label>
                      <Field
                        id="lastname"
                        name="lastname"
                        placeholder="lastname"
                      />

                      <label htmlFor="password">Password</label>
                      <Field
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                      />
                      <div id="my-radio-group">Role:</div>
                      <div role="group" aria-labelledby="my-radio-group">
                        <label>
                          <Field type="radio" name="role" value="ADMIN" />
                          Admin
                        </label>
                        <label>
                          <Field type="radio" name="role" value="CASHIER" />
                          Cashier
                        </label>
                      </div>
                    </Form>
                  </Col>
                </Row>

                <Row></Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={formik.handleSubmit}>Add Employee</Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>
  );
}
