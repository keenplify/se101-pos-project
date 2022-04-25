import { Field, Form as FormikForm, Formik } from "formik";
import { useRouter } from "next/router";
import { Col, Form, Row, Button } from "react-bootstrap";
import Cookies from "universal-cookie";

export const ChangeTransactionForm = ({ transaction }) => {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        id: transaction.id,
      }}
      onSubmit={({ id }) => {
        const cookies = new Cookies();

        cookies.set("activeTransactionId", id);
        router.reload();
      }}
    >
      <FormikForm>
        <Row>
          <Col>
            <Field
              as={Form.Control}
              type="number"
              name="id"
              size="sm"
              className="w-100 h-100"
            />
          </Col>
          <Col>
            <Button type="submit" size="sm" className="w-100">
              Set Transaction ID
            </Button>
          </Col>
        </Row>
      </FormikForm>
    </Formik>
  );
};
