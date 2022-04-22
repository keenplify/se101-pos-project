import { useRouter } from 'next/router'
import { useState } from 'react'
import {Button, Modal, ModalFooter, ModalHeader} from "react-bootstrap"
import { Verification } from "../home/verification";


export default function Transaction() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
    return (
      <>
     <button type="button" class="btn btn-primary" onClick={handleShow}>Proceed Transaction</button>
     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>

        </Modal.Header>
      <Modal.Body closeButton>
      <h5 className="text-center">  Are you sure you want to proceed?</h5>
      <Modal.Footer>
      <Verification></Verification>
                <Button variant="secondary">No</Button>
      </Modal.Footer>

          </Modal.Body>
      </Modal>
      </>
    );
  }