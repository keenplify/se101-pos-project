import { Modal, Button, Row, Col, Form, Table, Overlay, Popover } from "react-bootstrap";
import Transaction from "./transaction";
import styles from "../../styles/Home.module.css";
import { useState, Fragment } from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from 'yup';
import { TransactionsQueries } from "../../queries/transactions";

const CheckoutSchemaComplete = Yup.object().shape({
  type: Yup.string().min(1).oneOf(["CASH", "EWALLET"]).required(),
  phone_number: Yup.string().matches(/^\d+$/, "Must be numeric").min(11, "Must be 11 digit").max(11).required("Phone number is required"),
  account_name: Yup.string().min(3, "Must be longer than 3 characters.").required("Account name is required"),
  eWalletType: Yup.string().oneOf(["GCASH", "PAYMAYA"]).required(),
  remarks: Yup.string().optional()
})

const CheckoutSchemaCash = Yup.object().shape({
  type: Yup.string().min(1).oneOf(["CASH", "EWALLET"]).required(),
  remarks: Yup.string().optional()
})

export function CheckoutModal({
  token,
  modalShow,
  setModalShow,
  transaction,
  cartItems,
}) {

  const totalPrice =
    Math.round(
      cartItems
        .map((cart) => cart.variant.price * cart.quantity)
        .reduce((a, b) => a + b, 0) * 100
    ) / 100;

  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Payment Details
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          type: "CASH",
          phone_number: "",
          account_name: "",
          eWalletType: "GCASH",
          remarks: "",
        }}
        onSubmit={async ({type, phone_number, account_name, eWalletType, remarks}, action) => {
          try {
            const query = await TransactionsQueries.finalize(token, transaction.id, type, remarks, eWalletType, account_name, phone_number)
            console.log(query);
          } catch (error) {
            console.log(error.response)
          }
        }}
        validateOnMount={true}
        validationSchema={() => {
          return {
            validate: (values) => {
              const validation = values.type === "CASH" ? CheckoutSchemaCash.validate(values) : CheckoutSchemaComplete.validate(values);
              return validation
            }
          }
        }}
      >
        {(formik) => (
          <FormikForm>
            <Fragment>
              <Modal.Body>
                <div className="px-1">
                  <Row>
                    <Col md={12} lg={6}>
                      <strong> Transaction ID: </strong>
                      <br />
                      {transaction.id}
                    </Col>
                    <Col md={12} lg={6}>
                      <Form.Group>
                        <strong> Payment Type: </strong>
                        <Field
                          as={Form.Select}
                          name="type"
                          size="sm"
                          required={true}
                        >
                          <option disabled>Select payment method</option>
                          <option value="CASH">Cash</option>
                          <option value="EWALLET">EWallet</option>
                        </Field>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} lg={6}>
                      <strong> Date of Transaction: </strong>
                      <br />
                      {new Date(transaction.createdAt).toLocaleString()}
                    </Col>
                    <Col md={12} lg={6}>
                      {formik.values.type == "EWALLET" && (
                        <div className="mt-2">
                          <strong> EWallet Type: </strong>
                          <Field
                            as={Form.Select}
                            name="eWalletType"
                            size="sm"
                            required={true}
                          >
                            <option disabled>Select EWallet Type</option>
                            <option value="GCASH">GCash</option>
                            <option value="PAYMAYA">Paymaya</option>
                          </Field>
                        </div>
                      )}
                    </Col>
                  </Row>
                  {formik.values.type == "EWALLET" && (
                    <Row>
                      <Col md={12} lg={6}>
                        <Form.Group>
                          <strong> Phone Number: </strong>
                          <Field as={Form.Control} name="phone_number" required={true}/>
                          {formik.errors["phone_number"] && <div className="text-danger"><small>{formik.errors["phone_number"]}</small></div>}
                        </Form.Group>
                      </Col>
                      <Col md={12} lg={6}>
                        <Form.Group>
                          <strong> Account Name: </strong>
                          <Field as={Form.Control} name="account_name" required={true}/>
                          {formik.errors["account_name"] && <div className="text-danger"><small>{formik.errors["account_name"]}</small></div>}
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Form.Group>
                      <strong> Remarks (Optional) </strong>
                      <Field
                        as="textarea"
                        className="form-control"
                        name="remarks"
                        required={true}
                      />
                    </Form.Group>
                  </Row>
                </div>
                <hr />
                <div className="px-4">
                  <Row>
                    <Col>
                      <Table borderless>
                        <thead>
                          <tr>
                            <th>Qty</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, key) => (
                            <tr key={key}>
                              <td>{item.quantity}</td>
                              <td>{item.variant.name}</td>
                              <td>
                                &#8369;
                                {Math.round(item.variant.price * 100) / 100}
                              </td>
                              <td>
                                &#8369;
                                {Math.round(
                                  item.quantity * item.variant.price * 100
                                ) / 100}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
              </Modal.Body>
              <Modal.Footer className={styles.transactionButton}>
                <div className="px-2">
                  <Row>
                    <Col sm={8}>
                      <strong> TOTAL AMOUNT </strong>
                    </Col>
                    <Col sm={4}>
                      <strong> &#8369; {totalPrice}</strong>
                    </Col>
                  </Row>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <Row>
                    <Transaction
                      onProceed={() => formik.handleSubmit()}
                      canProceed={formik.isValid && !formik.isSubmitting}
                    ></Transaction>
                  </Row>
                  <Row>
                    <Button
                      variant="danger"
                      size="md"
                      onClick={() => setModalShow(false)}
                    >
                      Close Checkout
                    </Button>
                  </Row>
                </div>
              </Modal.Footer>
            </Fragment>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
}
