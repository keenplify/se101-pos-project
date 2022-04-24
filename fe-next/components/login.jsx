import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  Card,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  InputGroup,
  Table,
  Modal,
  Container,
} from "react-bootstrap";
import { BACKEND } from "../helpers";
import { Field, Formik, Form as FormikForm } from "formik";

export default function LoginCard({ employee, onSubmit }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <br />
      <div>
        <Card
          style={{
            justifyContent: "center",
            placeItems: "center",
            padding: "8px 1px",
            maxWidth: "192px",
            border: "3px solid #DFE1E4",
            borderRadius: "20px",
            fontSize: "1em",
            fontWeight: "bold",
            overflow: "auto",
            boxShadow: "5px 5px 10px grey",
            cursor: "pointer",
          }}
          onClick={handleShow}
        >
          {typeof employee.images !== undefined &&
          employee?.images?.length > 0 ? (
            <Card.Img
              style={{
                borderRadius: "50%",
                width: "70%",
                height: "70%",
                border: "3px solid #DFE1E4",
              }}
              variant="top"
              src={BACKEND + employee.images[0].location}
            />
          ) : (
            <span>No Image!</span>
          )}

          <Card.Body>
            <Card.Text className="text-center">
              {employee.firstName} {employee.lastName}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Formik
          initialValues={{
            id: employee.id,
            password: "",
          }}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Fragment>
              <Modal.Header closeButton>
                <Modal.Title>
                  You are about to log in as{" "}
                  <b>
                    {employee.firstName} {employee.lastName}
                  </b>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                {formik.status && (
                  <div class="alert alert-danger">{formik.status}</div>
                )}
                <FormikForm>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                      <b>Password</b>
                    </Form.Label>
                    <Col sm="10">
                      <Field
                        as={Form.Control}
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                      />
                    </Col>
                  </Form.Group>
                </FormikForm>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  style={{
                    borderRadius: "20px",
                    padding: "8px 14px",
                    fontWeight: "bold",
                  }}
                  variant="secondary"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  style={{
                    borderRadius: "20px",
                    padding: "8px 14px",
                    fontWeight: "bold",
                  }}
                  variant="primary"
                  type="submit"
                  onClick={formik.handleSubmit}
                >
                  Login
                </Button>
              </Modal.Footer>
            </Fragment>
          )}
        </Formik>
      </Modal>
    </>
  );
}
