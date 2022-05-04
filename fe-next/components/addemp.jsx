import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { AiFillEdit } from "react-icons/ai";
import { EmployeesQueries } from "../queries/employees";

const schema = Yup.object().shape({
  firstName: Yup.string().min(3).max(64).required(),
  lastName: Yup.string().min(3).max(64).required(),
  password: Yup.string().min(6).max(512).required(),

});

export default function AddEmployee({ token }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button type="button" variant="primary" onClick={handleShow} className="mx-2">
        Add Employee
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            type: "CASHIER",
            password: ""
          }}
          validationSchema={schema}
          onSubmit={async ({ firstName, lastName, type, password }, actions) => {
            try {
              await EmployeesQueries.add(
                token,
                firstName,
                lastName,
                type,
                password,
              );
              router.reload();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {(formik) => (
            <FormikForm>
              <Modal.Body>
              <Form.Group>
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
                <Form.Group>
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
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Field
                    as={Form.Select}
                    name="type"
                  >
                    <option value="CASHIER">Cashier</option>
                    <option value="ADMIN">Admin</option>

                  </Field>
                  {formik.errors["type"] && (
                    <Form.Text className="text-danger text-capitalize">
                      {formik.errors["type"]}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group>
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant={
                    formik.isSubmitting || !formik.isValid
                      ? "outline-primary"
                      : "primary"
                  }
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  Add Employee
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
}
