import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { AiFillEdit } from "react-icons/ai";
import { ProductsQueries } from "../queries/products";

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(64).required(),
});

export default function EditProduct({ token, product }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" type="button" variant="success" onClick={handleShow}>
        <AiFillEdit></AiFillEdit>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Variant</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: product.name,
          }}
          validationSchema={schema}
          onSubmit={async ({ name, stock, price }, actions) => {
            try {
              await ProductsQueries.update(token, product.id, name);
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
                  Edit Product
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
}
