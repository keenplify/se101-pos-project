import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { AiFillEdit } from "react-icons/ai";
import { CategoriesQueries } from "../queries/categories";

const schema = Yup.object().shape({
  name: Yup.string().min(3).max(64).required(),
  description: Yup.string().min(3).max(512).required(),
});

export default function EditCategory({ token, category }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" type="button" variant="success" onClick={handleShow}>
        <AiFillEdit></AiFillEdit> Edit Category
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            name: category.name,
            description: category.description,
          }}
          validationSchema={schema}
          onSubmit={async ({ name, description }, actions) => {
            try {
              await CategoriesQueries.update(
                token,
                category.id,
                name,
                description
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
                  <Form.Label>Description</Form.Label>
                  <Field
                    as="textarea"
                    className="form-control"
                    name="description"
                    placeholder="Category Description"
                  />
                  {formik.errors["description"] && (
                    <Form.Text className="text-danger text-capitalize">
                      {formik.errors["description"]}
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
                  Edit Category
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
}
