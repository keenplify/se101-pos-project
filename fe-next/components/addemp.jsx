import { useRouter } from 'next/router'
import { useState } from 'react'
import {AiFillEdit} from "react-icons/ai"
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"
export default function Addemp() {
    const [show, setShow] = useState(false);
  
    return (
      <>
      <Button variant="primary" onClick={() => setShow(true)}>Add Employee</Button>{' '}
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              New Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              haha
            </p>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
