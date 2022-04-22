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
        aria-labelledby="contained-modal-title-vcenter"
        centered
         
          dialogClassName="modal-90w"
          
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            You are about to delete an employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
            This will delete an employee permanently and  you won't be able to see them again.
            </p>
           
          </Modal.Body>
          <Modal.Footer>
          <button type="button" class="btn btn-sm btn-danger " onClick={() => setShow(true)}>Delete</button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }
  
