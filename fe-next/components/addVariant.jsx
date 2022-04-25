import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { ProductsQueries } from "../queries/products";
import { VariantsQueries } from "../queries/variants";

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(64).required(),
  price: Yup.number().min(0).required(),
  stock: Yup.number().min(0).required()
});

export default function AddVariant({ token, product }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button type="button" onClick={handleShow}>
        Add Variant
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Variant</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: "",
            price: 0,
            stock: 0
          }}
          validationSchema={schema}
          onSubmit={async ({ name, stock, price }, actions) => {
            try {
              await VariantsQueries.add(token, product.id, name, stock, price);
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
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Field
                    as={Form.Control}
                    name="price"
                    type={"number"}
                    placeholder="Product Price"
                  />
                  {formik.errors["price"] && (
                    <Form.Text className="text-danger text-capitalize">
                      {formik.errors["price"]}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Stock</Form.Label>
                  <Field
                    as={Form.Control}
                    name="stock"
                    type="number"
                    placeholder="Product Stock"
                  />
                  {formik.errors["stock"] && (
                    <Form.Text className="text-danger text-capitalize">
                      {formik.errors["stock"]}
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
                  Add Variant
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
}
