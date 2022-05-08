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
import { FiLock } from "react-icons/fi";

export default function LoginCard({ employee, onSubmit }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="mb-3">

    
        <Card
        hover
         className="shadow rounded"
          style={{
            cursor: "pointer",
            
          }}
          onClick={handleShow}
        >
          {typeof employee.image_location !== undefined ? (
            <Card.Img
            className="img-fluid"
              style={{
              }}
              variant="top"
              src={BACKEND + employee.image_location}
            />
          ) : (
            <Card.Img
              variant="top"
              src="img/tao.jpg"/>
          )}

          <Card.Body>
            <Card.Text className="text-center">
              {employee.firstName} {employee.lastName}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Modal
         size="sm"
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
              <Modal.Header closeButton className="border-0 text-center">
                
              </Modal.Header> 
              <Modal.Body className="text-center">
                {formik.status && (
                  <div class="alert alert-danger">{formik.status}</div>
                )}
                <FormikForm>
              <img  className="img-thumbnail rounded-circle w-75" src={BACKEND + employee.image_location}/>
                        <Card.Text className="text-center">
              {employee.firstName} {employee.lastName}
            </Card.Text>  
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    
                    </Form.Label>
                    <Col className="input-group" sm="5">
                    <span class="input-group-text bg-transparent border" id="basic-addon1"><FiLock></FiLock></span>
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
                <div class="d-grid gap-2 col-8 mx-auto">
                <Button
            
            variant="primary"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Login
          </Button>
          </div>
              </Modal.Body>

  
            </Fragment>
          )}
        </Formik>
      </Modal>
      </>
    );
  }
  
