import { useRouter } from 'next/router'
import { useState } from 'react'
import {MdDelete} from "react-icons/md"
import {Container,Row, Col, Form, FormControl, Button, InputGroup, Table, Modal} from "react-bootstrap"
export default function Deleteemp() {
    const [show, setShow] = useState(false);
  
    return (
      <>
    <button type="button" class="btn btn-sm btn-danger " onClick={() => setShow(true)}><MdDelete></MdDelete></button>
        <Modal
       
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
            You are about to delete an employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
            This will delete an employee permanently and  you won't be able to see them again.
            </p>
           
          </Modal.Body>
          <Modal.Footer>
          <button type="button" class="btn btn-sm btn-danger " onClick={() => setShow(true)}><MdDelete></MdDelete></button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }
  
