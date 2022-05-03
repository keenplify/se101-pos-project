import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { ProductsQueries } from "../queries/products";

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(64).required(),
});

export default function AddProduct({ token, category }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button type="button" onClick={handleShow}>
        Add Product
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={schema}
          onSubmit={async ({ name }, actions) => {
            try {
              await ProductsQueries.add(token, category.id, name);
              router.reload();
            } catch (error) {
              console.log(error.response);
            }
          }}
        >
          {(formik) => (
            <FormikForm>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Field
                    as={Form.Control}
                    name="name"
                    placeholder="Product Name"
                  />
                  {formik.errors["name"] && (
                    <Form.Text className="text-danger text-capitalize">
                      {formik.errors["name"]}
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
                  Add Product
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
}
