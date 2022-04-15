import { useRouter } from 'next/router'
import { useState } from 'react'
import {AiFillEdit} from "react-icons/ai"
import {AiOutlinePlus} from "react-icons/ai"
import styles from "../styles/edit.module.css";
import {Container,Row, Col, Form, Dropdown, Button, DropdownButton, Label, Modal} from "react-bootstrap"
export default function Edit() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return (
      <>
     <button type="button" class="btn btn-primary" onClick={handleShow}>Add Item</button>
     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Form.Label for="image" className={styles.FormLabel}><AiOutlinePlus></AiOutlinePlus></Form.Label>
            <Form.Control type="file" 
              className={styles.FormControl} 
              name="filepond"
              id="image"
              accept="image/png, image/jpeg, image/gif"
              onchange="getImage(this.value);"/>
              
              <div id="display-image"></div>
              
            </Col>
            <Col xs={12} md={8}>
        
            

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                autoFocus
              />
            </Form.Group>
            </Form>
            </Col>
          </Row>
            <Col className="py-2">
            <div className="col-md-12">
            <Form.Label>Category</Form.Label>
            <DropdownButton id="dropdown-basic-button" title="Please Select...">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          </div>
            </Col>
          <Row>
            

    

          </Row>
        </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Add Item</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  


 
  
