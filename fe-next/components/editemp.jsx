import { useRouter } from 'next/router'
import { useState } from 'react'
import {AiFillEdit} from "react-icons/ai"
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"
export default function Editemp() {
    const [show, setShow] = useState(false);
  
    return (
      <>
     <button type="button" class="btn btn-sm btn-success" onClick={() => setShow(true)}><AiFillEdit></AiFillEdit></button>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Edit Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
             Editeros
            </p>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
