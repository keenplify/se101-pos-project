import { useRouter } from 'next/router'
import { useState } from 'react'
import {MdDelete} from "react-icons/md"
import { AiOutlineSetting } from "react-icons/ai";
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal, Accordion} from "react-bootstrap"
import { ProductsQueries } from '../queries/products';
export default function DeleteProduct({token, product}) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return (
      <>
  <Button variant="link" className="text-decoration-none text-white p-0 py-1" onClick={handleShow}>
                <AiOutlineSetting className="fs-3 p-1"></AiOutlineSetting>
                Setting
        </Button>
        
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
        <Modal.Title><AiOutlineSetting className="fs-2 p-1"></AiOutlineSetting>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>


      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Change Photo</Accordion.Header>
        <Accordion.Body>
        <>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="text-center d-grid">
        <Button variant="primary" size="sm">Change Photo</Button>
        </Form.Group>
      </>
        </Accordion.Body>

      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Change Name</Accordion.Header>
        <Accordion.Body>
        <Form>
        <h5>Change your Name</h5>
        <Form.Group className="mb-3">
          <Form.Label>Firstname</Form.Label>
          <Form.Control type="text" placeholder="Firstname" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Lastname</Form.Label>
          <Form.Control type="text" placeholder="Firstname" />
        </Form.Group>

      </Form>

      <Form.Group className="text-center d-grid">
        <Button variant="primary" size="sm">Change Name</Button>
        </Form.Group>

        </Accordion.Body>
      </Accordion.Item>



      <Accordion.Item eventKey="2">
        <Accordion.Header>Change Password</Accordion.Header>
        <Accordion.Body>

        <Form>
          <h5>Change Password</h5>
          <p>In order to protect your account, make sure your password</p>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="Password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="Password" placeholder="Confirm Password" />
        </Form.Group>

        <Form.Group className="text-center d-grid">
        <Button variant="primary" size="sm">Change Password</Button>
        </Form.Group>


      </Form>

  </Accordion.Body>
</Accordion.Item>


</Accordion>




</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
