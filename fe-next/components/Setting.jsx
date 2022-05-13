import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  InputGroup,
  Table,
  Modal,
  Accordion,
  Alert,
} from "react-bootstrap";
import { ProductsQueries } from "../queries/products";
import { ChangeableImage } from "./ChangeableImage";
import { EmployeesQueries } from "../queries/employees";
import { Field, Formik } from "formik";
import * as Yup from "yup";

const changeNameSchema = Yup.object().shape({
  firstName: Yup.string().min(3).max(64).required(),
  lastName: Yup.string().min(3).max(64).required(),
});

export default function SettingsModal({ token, employee }) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="link"
        className="text-decoration-none text-white p-0 py-1"
        onClick={handleShow}
      >
        <AiOutlineSetting className="fs-3 p-1"></AiOutlineSetting>
        Setting
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <AiOutlineSetting className="fs-2 p-1"></AiOutlineSetting>Settings
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Change Photo</Accordion.Header>
              <Accordion.Body>
                <>
                  {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="text-center d-grid">
        <Button variant="primary" size="sm">Change Photo</Button>
        </Form.Group> */}
                  <ChangeableImage
                    token={token}
                    employee={employee}
                    query={EmployeesQueries.changeMyImage}
                    selectorId={employee.id}
                    image={employee?.image_location}
                  />
                </>
              </Accordion.Body>
            </Accordion.Item>
            {/* <Accordion.Item eventKey="1">
              <Accordion.Header>Change Name</Accordion.Header>
              <Accordion.Body>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                  }}
                  validationSchema={changeNameSchema}
                  onSubmit={async ({ firstName, lastName }, { setStatus }) => {
                    try {
                      await EmployeesQueries.changeMyName(
                        token,
                        firstName,
                        lastName
                      );
                      router.reload();
                    } catch (error) {
                      console.log(error);
                      if (error?.response?.data?.error)
                        setStatus(error.response.data.error);
                    }
                  }}
                >
                  {(formik) => (
                    <Fragment>
                      {formik.status && (
                        <Alert variant="danger">{formik.status}</Alert>
                      )}
                      <h5>Change your Name</h5>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Field
                          as={Form.Control}
                          name="firstName"
                          placeholder="First Name"
                        />
                        {formik.errors["firstName"] && (
                          <Form.Text className="text-danger text-capitalize">
                            {formik.errors["firstName"]}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Field
                          as={Form.Control}
                          name="lastName"
                          placeholder="Last Name"
                        />
                        {formik.errors["lastName"] && (
                          <Form.Text className="text-danger text-capitalize">
                            {formik.errors["lastName"]}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="text-center d-grid">
                        <Button
                          variant={
                            formik.isSubmitting || !formik.isValid
                              ? "outline-primary"
                              : "primary"
                          }
                          onClick={formik.handleSubmit}
                          disabled={formik.isSubmitting || !formik.isValid}
                          size="sm"
                        >
                          Change Name
                        </Button>
                      </Form.Group>
                    </Fragment>
                  )}
                </Formik>
              </Accordion.Body>
            </Accordion.Item> */}

            <Accordion.Item eventKey="1">
              <Accordion.Header>Change Password</Accordion.Header>
              <Accordion.Body>
              <Formik
                  initialValues={{
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={async ({ password, confirmPassword }, { setStatus }) => {
                    if (password.length == 0 || confirmPassword.length == 0) return setStatus("Password fields can't be blank!");
                    if (password !== confirmPassword) return setStatus("Password and confirm password must match!");

                    try {
                      await EmployeesQueries.changeMyPassword(
                        token,
                        password,
                      );
                      router.reload();
                    } catch (error) {
                      console.log(error);
                      if (error?.response?.data?.error)
                        return setStatus(error.response.data.error);
                    }
                  }}
                >
                  {(formik) => (
                    <Fragment>
                      
                      <h5>Change Password</h5>
                      <p>In order to protect your account, make sure your password is secure.</p>
                      {formik.status && (
                        <Alert variant="danger">{formik.status}</Alert>
                      )}
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Field
                          as={Form.Control}
                          name="password"
                          placeholder="Password"
                          type="password"
                        />
                        {formik.errors["password"] && (
                          <Form.Text className="text-danger text-capitalize">
                            {formik.errors["password"]}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Field
                          as={Form.Control}
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                        />
                        {formik.errors["confirmPassword"] && (
                          <Form.Text className="text-danger text-capitalize">
                            {formik.errors["confirmPassword"]}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="text-center d-grid">
                        <Button
                          variant={
                            formik.isSubmitting || !formik.isValid
                              ? "outline-primary"
                              : "primary"
                          }
                          onClick={formik.handleSubmit}
                          disabled={formik.isSubmitting || !formik.isValid}
                          size="sm"
                        >
                          Change Password
                        </Button>
                      </Form.Group>
                    </Fragment>
                  )}
                </Formik>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
