import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { VariantsQueries } from "../queries/variants";
import { AiFillEdit } from "react-icons/ai";

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(64).required(),
  price: Yup.number().min(0).required(),
  stock: Yup.number().min(0).required(),
});

export default function EditVariant({ token, variant }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" type="button" variant="success" onClick={handleShow} title="Edit Variant">
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
            name: variant.name,
            price: variant.price,
            stock: variant.stock,
          }}
          validationSchema={schema}
          onSubmit={async ({ name, stock, price }, actions) => {
            try {
              await VariantsQueries.update(token, variant.id, name, stock, price);
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
                    placeholder="Variant Name"
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
                    placeholder="Variant Price"
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
                    placeholder="Variant Stock"
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
                  Edit Variant
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
}
